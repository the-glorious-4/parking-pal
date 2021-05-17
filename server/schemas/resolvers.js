const { AuthenticationError } = require("apollo-server-express");
const { User, ParkingPlace, Inventory, Reservation } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userdata = await User.findById({ _id: context.user._id })
          .select("-__v -password")
          .populate({
            path: "parkingPlace",
            model: "ParkingPlace",
            populate: {
              path: "inventory",
              model: "Inventory",
              match: { "isAvailable" : true}
            },
          });

        return userdata;
      }

      throw new AuthenticationError("Not logged in");
    },


    getAllParking : async( parent , args) => {
      const { city , startDate} = args;
      const parkingPlacesInv = await Inventory.find({"startDate":startDate,"isAvailable":true})
      .populate({ 
                path: "parkingPlace",
                model: "ParkingPlace",
                match: { "city" : city}});

      return parkingPlacesInv;
    },
  //User passing Inventory ID
    getParkingByInventoryId : async( parent , {_id }) => {
      // const { _id } = args;
      const parkingPlacesInv = await Inventory.findById({ _id })
          .populate({
              path:"parkingPlace",
              model:ParkingPlace});

      return parkingPlacesInv;
    },
  
    //Get User's History - User's all Inventory and User's all reservation if he has 
    getUsersHistory: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({ 
            path: "parkingPlace",
            model: "ParkingPlace",
            populate: {
              path: "inventory",
              model: "Inventory"
            }
         })
         .populate({ 
          path: "parkingPlace",
          model: "ParkingPlace",
          populate: {
            path: "reservation",
            model: "Researvation",
            match: { "consumer" : context.user._id }
          }
       })
       
        return userData;
      }
    
      throw new AuthenticationError("No logged in user found");
    },

 // //Assuming ParkingById returns ParkingplaceID
    // getAllInventoryByParkingId : async( parent , args) => {
    //   const { parkingPlace , startDate} = args;
    //   const parkingPlacesInv = await Inventory.find({"startDate":startDate,"isAvailable":true,"parkingPlace" : parkingPlace})
    //   .populate({ 
    //             path: "parkingPlace",
    //             model: "ParkingPlace"});

    //   return parkingPlacesInv;
    // },

   
    // //Get all reservations for given Provider
    // getActiveReservation: async (parent, {searchDate}, context) => {
    //   if (context.user) {
    //     const reservedParkingPlaces = await Reservation.find({ startDate :{ $gt: searchDate}})
    //       .populate({ 
    //         path: "parkingplace",
    //         match: { "provider" : context.user._id}
    //      })
    //     return reservedParkingPlaces
    //   }
    
    //   throw new AuthenticationError("No logged in user found");
    // },
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
