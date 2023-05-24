const express = require("express")
const bodyparser = require("body-parser")

const places = require("./routes/places-routes")

const app = express();

app.get("/", (req,res) => {
    res.send("Hello!")
})

app.use("/api/places",places)

app.use((error, req,res,next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500).json({message: error.message || "Something went wrong :("})
})

app.listen(5000)