const { Schema, model } = require("mongoose");

const inventorySchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  parkingPlace: {
    type: Schema.Types.ObjectId,
    ref: "ParkingPlace",
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },

  reservation: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
  },
});

const Inventory = model("Inventory", inventorySchema);

module.exports = Inventory;
