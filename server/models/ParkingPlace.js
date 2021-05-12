const { Schema,model} = require('mongoose');

const ParkingPlaceSchema = new Schema({
    apt:String,
    street: String,
    city: String,
    state: {
        type: String,
        uppercase: true,
        required: true
    },
    zip: Number,
    isCoveredParking : Boolean,
    capacity: Number,
    price: Number,
    Provider : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }

});

const ParkingPlaces = model('ParkingPlaces', ParkingPlaceSchema);

module.exports = ParkingPlaces;
