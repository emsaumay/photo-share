const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const places = require("./routes/places-routes");
const users = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/api/places", places);
app.use("/api/users", users);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Something went wrong :(" });
});

mongoose
    .connect("mongodb+srv://Aryan:36jVUW8XUbx4WBBy@cluster0.9xb6qob.mongodb.net/places?retryWrites=true&w=majority")
    .then(() => {
        app.listen(5000);
    })
    .catch(err => { 
        console.log(err)
    });