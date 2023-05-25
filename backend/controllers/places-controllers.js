const UserData = require("../DUMMY/UserData")
const HttpError = require("../models/httpError")
const {validationResult} = require("express-validator")
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
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("Input not correct. Checkk again", 422))
    }

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

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("Input not correct. Checkk again", 422))
    }

    const id = parseInt(req.params.pid)
    const {name, image, caption} = req.body

    const oldPlaceIndex = UserData[0].places.findIndex(x => x.id == id)

    const updatedPlace = {
        ...UserData[0].places[oldPlaceIndex],
        id,
        name,
        image,
        caption
    }
    UserData[0].places[oldPlaceIndex] = updatedPlace

    res.status(201).json({place: updatedPlace})
}

const deletePlace = (req, res, next) => {
    const id = req.params.pid

    const PlaceIndex = UserData[0].places.findIndex(x => x.id == id)

    if (PlaceIndex === -1) {
        return next(new HttpError("Place requested to delete doesn't exist.", 422))
    }

    console.log(PlaceIndex)
    const newArr = UserData[0].places.filter(x => x.id != id)
    // console.log(newArr)
    UserData[0].places = newArr

    res.status(201).json({"message": "Removed"})
}

exports.getUserPlacesbyId = getUserPlacesbyId
exports.getPlacebyId = getPlacebyId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace