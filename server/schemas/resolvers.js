const { AuthenticationError } = require("apollo-server-express");
const { User, ParkingPlace, Inventory, Reservation } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({ 
            path: "parkingplace",
            populate: {
              path: "inventory",
              model: "Inventory"
            } 
         })

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    getAllParking : async( parent , {searchDate}) => {
      const parkingPlacesInv = await Inventory.find({"startDate":searchDate},{"isAvailable":true})
          .populate("parkingPlace");

      return parkingPlacesInv;
    },

    //Assuming ParkingById returns ParkingplaceID
    getParkingById : async( parent , {searchDate,parkingPlaceID}) => {
      const parkingPlacesInv = await Inventory.find({"startDate":searchDate},{"isAvailable":true},{"parkingPlace":parkingPlaceID})
          .populate("parkingPlace");

      return parkingPlacesInv;
    },

    //User passing Inventory ID
    getParkingByInventoryId : async( parent , {_id}) => {
      const parkingPlacesInv = await Inventory.findOne({ _id })
          .populate("parkingPlace");

      return parkingPlacesInv;
    },
    
    //Get All Inventory for given Provider
    
    getAllInventory: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({ 
            path: "parkingplace",
            populate: {
              path: "inventory",
              model: "Inventory"
            } 
         })

        return userData;
      }
    
      throw new AuthenticationError("No logged in user found");
    },

    //Get all reservations for given Provider
    getActiveReservation: async (parent, {searchDate}, context) => {
      if (context.user) {
        const reservedParkingPlaces = await Reservation.find({ startDate :{ $gt: searchDate}})
          .populate({ 
            path: "parkingplace",
            match: { "provider" : context.user._id}
         })
        return reservedParkingPlaces
      }
    
      throw new AuthenticationError("No logged in user found");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
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
