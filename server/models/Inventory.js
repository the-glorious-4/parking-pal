const { Schema,model} = require('mongoose');
// const ParkingLocation = require('./ParkingLoacations');
const InventorySchema = new Schema({
    
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
      }

});

const Inventory = model('Inventory', InventorySchema);

module.exports = Inventory;
