const { Schema, model } = require("mongoose");

const parkingPlaceSchema = new Schema(
  {
    apt: String,
    street: String,
    city: String,
    state: {
      type: String,
      uppercase: true,
      required: true,
    },
    zip: Number,
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
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservations",
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
  return this.inventory.length;
});

parkingPlaceSchema.virtual("reservationsCount").get(function () {
  return this.reservations.length;
});

const ParkingPlace = model("ParkingPlace", parkingPlaceSchema);

module.exports = ParkingPlace;
