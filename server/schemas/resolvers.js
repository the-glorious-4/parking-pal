const { AuthenticationError } = require("apollo-server-express");
const { User, ParkingPlace, Inventory, Reservation } = require("../models");
const { signToken } = require("../utils/auth");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { sendEmail, EmailTemplate } = require("../utils/mailer");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userdata = await User.findById({ _id: context.user._id })
          .select("-__v -password")
          .populate({
            path: "parkingPlace",
            model: "ParkingPlace",
            populate: {
              path: "inventory",
              model: "Inventory",
              populate: {
                path: "reservation",
                moodel: "Reservation",
              },
            },
          });

        return userdata;
      }

      throw new AuthenticationError("Not logged in");
    },

    //Get all Inventories by StartDate and City
    getAllInventories: async (parent, args) => {
      const { city, startDate } = args;
      const parkingPlacesInv = await Inventory.find({
        startDate: startDate,
        isAvailable: true,
      }).populate({
        path: "parkingPlace",
        model: "ParkingPlace",
        match: { city: city },
      });

      return parkingPlacesInv;
    },

    //Get all Inventories by InventoryID
    getInventoryById: async (parent, { _id }) => {
      const parkingPlacesInv = await Inventory.findById({ _id }).populate({
        path: "parkingPlace",
        model: ParkingPlace,
      });

      return parkingPlacesInv;
    },

    //Get All inventory by Providers Id.
    getMyInventories: async (parent, args, context) => {
      const parkingPlacesInv = await Inventory.find().populate({
        path: "parkingPlace",
        model: "ParkingPlace",
        match: { provider: context.user._id },
      });

      return parkingPlacesInv;
    },

    //Get Consumers current and future resesrvation based on date criteria.
    getConsumerReservations: async (parent, args, context) => {
      const { startDate } = args;
      const params = startDate
        ? { startDate: { $gte: startDate }, consumer: context.user._id }
        : { consumer: context.user._id };

      if (context.user) {
        const reservedParkingPlaces = await Reservation.find(params).populate({
          path: "parkingplace",
          model: "ParkingPlace",
        });
        return reservedParkingPlaces;
      }

      throw new AuthenticationError("No logged in user found");
    },

    //Get All Reservations of users
    getMyReservations: async (parent, args, context) => {
      if (context.user) {
        const reservedParkingPlaces = await User.findById(
          context.user._id
        ).populate({
          path: "bookings",
          model: "Reservations",
        });
        return reservedParkingPlaces;
      }

      throw new AuthenticationError("No logged in user found");
    },

    inventory: async (parent, args, context) => {
      if (context.user) {
        const inventory = await Inventory.find();
        return inventory;
      }
      throw new AuthenticationError("Not logged in");
    },

    checkout: async (parent, args, context) => {
      const { price } = args;

      if (context.user) {
        const url = new URL(context.headers.referer).origin;
        console.log("URL: " + url);

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Parking Place",
                  images: ["https://i.imgur.com/UfRvNq5.jpg"],
                },
                unit_amount: price * 100,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/cancel`,
        });

        console.log("SESSION ID: " + session.id);
        return { session: session.id };
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    editUser: async (parent, args, context) => {
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        args,
        { new: true }
      );
      return user;
    },

    addParkingPlace: async (parent, args, context) => {
      if (context.user) {
        const parkingLot = await ParkingPlace.create({
          ...args,
          provider: context.user._id,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { parkingPlace: parkingLot._id } }
        );

        return parkingLot;
      }

      throw new AuthenticationError("Not logged in");
    },

    editParkingPlace: async (parent, args, context) => {
      if (context.user) {
        const { _id, parkingData } = args;
        const parkingLot = await ParkingPlace.findByIdAndUpdate(
          _id,
          parkingData,
          { new: true }
        );
        return parkingLot;
      }

      throw new AuthenticationError("Not logged in");
    },

    addInventory: async (parent, args, context) => {
      const { parkingPlace: parkingPlaceId } = args;

      if (context.user) {
        const inventory = await Inventory.create({
          ...args,
        });

        await ParkingPlace.findByIdAndUpdate(
          { _id: parkingPlaceId },
          { $push: { inventory: inventory._id } }
        );

        return inventory;
      }

      throw new AuthenticationError("Not logged in");
    },

    addReservation: async (parent, args, context) => {
      sendEmail(EmailTemplate.BOOKING_CONFIRMATION_CONSUMER, args);

      const consumer = context.user._id;
      const { inventoryId, parkingPlace, startDate, stripeSessionId } = args;

      if (context.user) {
        const reservation = await Reservation.create({
          consumer,
          inventoryId,
          parkingPlace,
          startDate,
          stripeSessionId,
        });

        await Inventory.findByIdAndUpdate(
          { _id: inventoryId },
          { isAvailable: false },
          { new: true }
        );

        // push to consumer side
        await User.findByIdAndUpdate(
          { _id: consumer },
          { $push: { bookings: reservation._id } }
        );

        return reservation;
      }
      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
