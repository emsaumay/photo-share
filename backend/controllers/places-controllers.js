const UserData = require("../DUMMY/UserData")
const HttpError = require("../models/httpError")
const { v4: uuidv4 } = require('uuid');

const getPlacebyId = (req, res, next) => {
    const place = UserData[0].places[req.params.pid - 1]

    if(!place){
        return next(new HttpError("Could not find the place.", 404))
    }

    res.json({place})
}

const getUserPlacesbyId = (req, res, next) => {
    const user = UserData[req.params.uid - 1].places

    if(!user){
        return next(new HttpError("Could not find the user.", 404))
    }

    res.json({user})
}

const createPlace = (req,res,next) => {
    const {name, image, caption} = req.body
    const NewPlace = {
        id: uuidv4(),
        name,
        image,
        caption
    }

    UserData[0].places.push(NewPlace)

    res.status(201).json({place: NewPlace})
}

exports.getUserPlacesbyId = getUserPlacesbyId
exports.getPlacebyId = getPlacebyId
exports.createPlace = createPlace