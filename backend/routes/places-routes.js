const express = require("express")

const router = express.Router();

router.get("/places", (req,res, next) => {
    console.log("Request sent to places!")
    res.json({message: "WORKS!"})
})

module.exports = router;