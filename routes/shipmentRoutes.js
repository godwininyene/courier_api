const express = require("express");
const shipmentController = require('./../controllers/shipmentController');
const authController = require('./../controllers/authController')

const router = express.Router();

router.get('/track/:tracking_num', shipmentController.trackShipment);

//Protect All Routes Below:
router.use(authController.protect, authController.restrictTo('admin'))

router.route('/')
    .post(shipmentController.createShipment)
    .get(shipmentController.getAllShipments)

router.route('/:id')
    .get(shipmentController.getShipment)
    .patch(shipmentController.updateShipment)
    .delete(shipmentController.updateShipment)
router.patch('/history/:id', shipmentController.updateShipmentHistory)

module.exports = router;