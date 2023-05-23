const express = require("express")
const bodyparser = require("body-parser")

const places = require("./routes/places-routes")

const app = express();

app.get("/", (req,res) => {
    res.send("Hello!")
})

app.use(places)

app.listen(5000)