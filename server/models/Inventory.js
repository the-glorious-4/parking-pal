const { Schema, model } = require("mongoose");

const inventorySchema = new Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  parkingPlace: {
    type: Schema.Types.ObjectId,
    ref: "ParkingPlace",
    required: true,
  },
  reservation: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
  },
});

const Inventory = model("Inventory", inventorySchema);

module.exports = Inventory;
