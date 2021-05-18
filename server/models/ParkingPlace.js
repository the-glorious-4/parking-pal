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
    latLng: [String],
    isCoveredParking: Boolean,
    capacity: Number,
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
    ]
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

const ParkingPlace = model("ParkingPlace", parkingPlaceSchema);

module.exports = ParkingPlace;
