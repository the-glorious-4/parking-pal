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

        const updatedParkingPlace = await ParkingPlace.findByIdAndUpdate(
          { _id: parkingPlaceId },
          { $push: { inventory: inventory._id } }
          // { new: true }
        );
        return inventory;
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
