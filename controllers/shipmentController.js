const Shipment = require('./../models/Shipment');

exports.createShipment = async(req, res, next)=>{
    const time = Date.now()
    const tracking_num = `CD&T-${time.toString().slice(0, 10)}-US`;
    req.body.tracking_num = tracking_num;
    const shipment = await Shipment.create(req.body);
    res.status(200).json({
        status:"success",
        data:{
            shipment
        }
    });
}
exports.getAllShipments = async(req, res, next)=>{
    const shipments = await Shipment.find();

    res.status(200).json({
        status:"success",
        result:shipments.length,
        data:{
            shipments
        }
    });
}


exports.getShipment = async(req, res, next)=>{
    const shipment = await Shipment.findById(req.params.id);
    res.status(200).json({
        status:"success",
        data:{
            shipment
        }
    });
}

exports.updateShipment = async(req, res, next)=>{
    const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, {
        runValidators:true,
        new:true
    });
    res.status(200).json({
        status:"success",
        data:{
            shipment
        }
    });
}

exports.trackShipment = async(req, res, next)=>{
    const shipment = await Shipment.findOne({tracking_num: req.params.tracking_num});
    res.status(200).json({
        status:"success",
        data:{
            shipment
        }
    });
}
