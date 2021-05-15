const { AuthenticationError } = require("apollo-server-express");
const { User, ParkingPlace, Inventory, Reservation } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        // const user = await User.findById(context.user._id).populate({
        //   path: "User",
        //   populate: {
        //     path: "inventories",
        //     model: "ParkingPlace",
        //     populate: {
        //       path: "inventories",
        //       model: "Inventory",
        //     },
        //   },
        // });
        const user = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("inventories");
        // .populate("inventories");

        return user;
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

    addParkingPlace: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        // const parkingLoation = await ParkingPlace.create({provider:context.user._id} , args);
        // if(parkingLoation.length>0){
        //   return await Inventory.create(parkingLoation._id,args.startDate ,args.endDate );
        // }
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
