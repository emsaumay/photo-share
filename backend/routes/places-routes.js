const express = require("express")
const router = express.Router();

const HttpError = require("../models/httpError")
const UserData = require("../DUMMY/UserData")

router.get("/", (req,res, next) => {
    console.log("Request sent to places!")
    res.json({message: "WORKS!"})
})

router.get("/user/:uid", (req, res, next) => {
    const user = UserData[req.params.uid - 1]

    if(!user){
         
        return next(new HttpError("Could not find the user.", 404))
    }

    res.json({user})
})

router.get("/:pid", (req, res, next) => {
    const place = UserData[0].places[req.params.pid - 1]

    if(!place){
        return next(new HttpError("Could not find the place.", 404))
    }

    res.json({place})
})

module.exports = router;