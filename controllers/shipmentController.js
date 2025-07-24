const catchAsync = require('../utils/catchAsync');
const Shipment = require('./../models/Shipment');
const ShipmentHistory = require('./../models/ShipmentHistory')
const AppError = require('./../utils/appError')

exports.createShipment = catchAsync(async(req, res, next)=>{
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
})
exports.getAllShipments = catchAsync(async(req, res, next)=>{
    const shipments = await Shipment.find();

    res.status(200).json({
        status:"success",
        result:shipments.length,
        data:{
            shipments
        }
    });
})


exports.getShipment = catchAsync(async(req, res, next)=>{
    const shipment = await Shipment.findById(req.params.id);
     if (!shipment) return next(new AppError('No shipment was found with that id', '', 404));
    res.status(200).json({
        status:"success",
        data:{
            shipment
        }
    });
})

exports.updateShipment = catchAsync(async(req, res, next)=>{
    const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, {
        runValidators:true,
        new:true
    });
     if (!shipment) return next(new AppError('No shipment was found with that id', '', 404));
    res.status(200).json({
        status:"success",
        data:{
            shipment
        }
    });
})

exports.trackShipment = catchAsync(async(req, res, next)=>{
    const shipment = await Shipment.findOne({tracking_num: req.params.tracking_num}).populate('histories');
    if (!shipment) return next(new AppError('No shipment was found with that tracking code', '', 404));
    new AppError
    res.status(200).json({
        status:"success",
        data:{
            shipment
        }
    });
})

exports.updateShipmentHistory = catchAsync(async(req, res, next)=>{
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return next(new AppError('No shipment was found with that id', '', 404));

    req.body.shipmentId = req.params.id;
    const history = await ShipmentHistory.create(req.body)
    res.status(200).json({
        status:"success",
        data:{
            history
        }
    });

})
