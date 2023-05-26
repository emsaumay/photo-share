const {mongoose} = require("mongoose")

const Schema = mongoose.Schema

const placeSchema = new Schema({
   name: {
    type: String,
    required: true
   },
   caption: {
    type: String,
    required: true
   },
   image:{
    type: String,
    required: true
   },
   creator: {
    type: String,
    required: true
   }
})

module.exports = mongoose.model('Place');