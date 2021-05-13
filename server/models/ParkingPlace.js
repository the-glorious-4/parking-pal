const { Schema,model} = require('mongoose');

const AddressSchema = new Schema({
    apt:String,
    street: String,
    city: String,
    state: {
        type: String,
        uppercase: true,
        required: true
    },
    zip: Number,
})

const ParkingPlaceSchema = new Schema({
    address:AddressSchema,
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
