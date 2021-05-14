const { Schema,model} = require('mongoose');

const ReservationSchema = new Schema({
    
    startDate : {
        type:Date,
    },
    endDate : {
        type:Date,
    },
    parkingPlace : {
        type: Schema.Types.ObjectId,
        ref: 'ParkingPlace',
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
