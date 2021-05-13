const { Schema,model} = require('mongoose');

const InventorySchema = new Schema({
    
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
    }

});

const Inventory = model('Inventory', InventorySchema);

module.exports = Inventory;
