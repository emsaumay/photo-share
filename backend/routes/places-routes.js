const express = require("express")
const {check} = require("express-validator")
const router = express.Router();

const placesController = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");

router.get("/user/:uid", placesController.getUserPlacesbyId)

router.get("/:pid", placesController.getPlacebyId)

router.post("/",fileUpload.single('image'),[check('name').not().isEmpty(), check('caption').not().isEmpty()], placesController.createPlace)

router.patch("/:pid",[check('name').not().isEmpty(), check('caption').not().isEmpty()], placesController.updatePlace)

router.delete("/:pid", placesController.deletePlace)

module.exports = router;