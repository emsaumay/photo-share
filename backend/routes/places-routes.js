const express = require("express")
const router = express.Router();

const placesController = require("../controllers/places-controllers")

router.get("/", (req,res, next) => {
    console.log("Request sent to places!")
    res.json({message: "WORKS!"})
})

router.get("/user/:uid", placesController.getUserPlacesbyId)

router.get("/:pid", placesController.getPlacebyId)

router.post("/", placesController.createPlace)

router.patch("/:pid", placesController.updatePlace)

router.delete("/:pid", placesController.deletePlace)

module.exports = router;