const { Schema, model } = require("mongoose");

const reservationSchema = new Schema({
  startDate: {
    type: Date,
  },
  parkingPlace: {
    type: Schema.Types.ObjectId,
    ref: "ParkingPlace",
    required: true,
  },
  consumer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stripeTransaction: {
    type: String,
    required: true,
  },
});

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
