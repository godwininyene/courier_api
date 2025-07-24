const mongoose = require('mongoose');
const shipmentHistorySchema = new mongoose.Schema({
    shipmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shipment",
        required:[true, 'Shipment history must belong to a shipment']
        
    },
    location:{
        type:String,
        required:[true, 'Please provide location']
    },
    date:{
        type:Date,
       default:Date.now()
    },
    time:{
        type:String,
        default: () => {
            const now = new Date();
            return now.toTimeString().split(' ')[0]; // "H:i:s" format
        }
    },
    status:{
        type:String,
        required:[true, 'Please provide status']
    },
    remark:String
})

const ShipmentHistory = mongoose.model('ShipmentHistory', shipmentHistorySchema);
module.exports = ShipmentHistory;