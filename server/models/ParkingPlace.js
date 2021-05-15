const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  apt: String,
  street: String,
  city: String,
  state: {
    type: String,
    uppercase: true,
    required: true,
  },
  zip: Number,
});

const parkingPlaceSchema = new Schema(
  {
    address: addressSchema,
    isCoveredParking: Boolean,
    capacity: Number,
    price: Number,
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inventory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Inventory",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

parkingPlaceSchema.virtual("inventoryCount").get(function () {
  return this.inventory.length;s
});

const ParkingPlace = model("ParkingPlace", parkingPlaceSchema);

module.exports = ParkingPlace;
