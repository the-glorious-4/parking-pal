const { AuthenticationError } = require("apollo-server-express");
const { User, ParkingPlace, Inventory, Reservation } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById({ _id: context.user._id })
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

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },

    inventory: async (parent, args, context) => {
      if (context.user) {
        const inventory = await Inventory.find();
        return inventory;
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
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

        // push to user
        return inventory;
      }

      throw new AuthenticationError("Not logged in");
    },

    addReservation: async (parent, args, context) => {
      const { inventoryId } = args;
      const consumer = context.user._id;

      console.log("YULDUZ   " + consumer);
      if (context.user) {
        const updatedInventory = await Inventory.findByIdAndUpdate(
          { _id: inventoryId },
          [{ isAvailable: false }]
        );

        const parkingPlace = updatedInventory.parkingPlace;

        const reservation = await Reservation.create({
          ...args,
          consumer,
          parkingPlace,
        });

        const updatedParkingPlace = await ParkingPlace.findByIdAndUpdate(
          { _id: parkingPlace },
          { $push: { reservations: reservation._id } }
        );

        const user = await User.findByIdAndUpdate(
          { _id: consumer },
          { $push: { bookings: reservation._id } }
        );

        console.log("RESERVATION: " + reservation);
        console.log("PARKINGPLACE: " + updatedParkingPlace);
        console.log("INVENTORY: " + updatedInventory);
        console.log("USER: " + user);

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
