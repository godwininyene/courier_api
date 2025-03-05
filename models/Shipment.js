const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
    // Shipper Details
    shipper_name: { 
        type: String, 
        required: [true, "Please provide shipper name"] 
    },
    shipper_phone: { 
        type: String, 
        required: [true, "Please provide shipper phone number"] 
    },
    shipper_email: { 
        type: String, 
        required: [true, "Please provide shipper email"] 
    },
    shipper_address: { 
        type: String, 
        required: [true, "Please provide shipper address"] 
    },

    // Receiver Details
    receiver_name: { 
        type: String, 
        required: [true, "Please provide receiver name"] 
    },
    receiver_phone: { 
        type: String, 
        required: [true, "Please provide receiver phone number"] 
    },
    receiver_email: { 
        type: String, 
        required: [true, "Please provide receiver email"] 
    },
    receiver_address: { 
        type: String, 
        required: [true, "Please provide receiver address"] 
    },

    // Shipment Details
    
    carrier: { 
        type: String, 
        default: 'CD&T Logistics Courier' 
    },
    carrier_ref_no: { 
        type: String, 
        default: 'CDT48634' 
    },
    tracking_num: { 
        type: String, 
        required: [true, "Please provide tracking number"] 
    },
    shipment_type: { 
        type: String, 
        required: [true, "Please provide shipment type"] 
    },
    packages: { 
        type: String, 
        required: [true, "Please provide number of packages"] 
    },
    weight: { 
        type: String, 
        required: [true, "Please provide weight"] 
    },
    product: { 
        type: String, 
        required: [true, "Please provide product details"] 
    },
    payment_mode: { 
        type: String, 
        required: [true, "Please provide payment mode"] 
    },
    departure_time: { 
        type: String, 
        required: [true, "Please provide departure time"] 
    },
    destination: { 
        type: String, 
        required: [true, "Please provide destination"] 
    },
    pickup_time: { 
        type: String, 
        required: [true, "Please provide pickup time"] 
    },
    shipment_mode: { 
        type: String, 
        required: [true, "Please provide shipment mode"] 
    },
    quantity: { 
        type: String, 
        required: [true, "Please provide quantity"] 
    },
    total_freight: { 
        type: String, 
        required: [true, "Please provide total freight cost"] 
    },
    origin: { 
        type: String, 
        required: [true, "Please provide origin"] 
    },
    pickup_date: { 
        type: String, 
        required: [true, "Please provide pickup date"] 
    },
    delivery_date: { 
        type: String, 
        required: [true, "Please provide delivery date"] 
    },
    status: { 
        type: String, 
        required: [true, "Please provide status"] 
    },
    comment: { 
        type: String, 
        default: null 
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Shipment', ShipmentSchema);
