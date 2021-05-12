const { Schema,model} = require('mongoose');
// const ParkingLocation = require('./ParkingLoacations');
const ReservationSchema = new Schema({
    
    startDate : {
        type:Date,
    },
    endDate : {
        type:Date,
    },
    ParkingLocation : {
        type: Schema.Types.ObjectId,
        ref: 'ParkingLoacations',
        required: true
    },
    consumer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stripeTransaction :{
        type: Schema.Types.ObjectId
    }


});

const Reservation = model('Reservation', ReservationSchema);

module.exports = Reservation;
