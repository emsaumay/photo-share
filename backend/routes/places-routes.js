const express = require("express")
const router = express.Router();

const UserData = require("../DUMMY/UserData")

router.get("/", (req,res, next) => {
    console.log("Request sent to places!")
    res.json({message: "WORKS!"})
})

router.get("/user/:uid", (req, res, next) => {
    const place = UserData[req.params.uid - 1]
    res.json({place})
})

router.get("/:pid", (req, res, next) => {
    const place = UserData[0].places[req.params.pid - 1]
    res.json({place})
})

module.exports = router;