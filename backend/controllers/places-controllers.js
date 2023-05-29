const HttpError = require("../models/httpError")
const Place = require("../models/place")
const User = require("../models/user")

const {validationResult} = require("express-validator")
const mongoose  = require("mongoose")

const getPlacebyId = async (req, res, next) => {
    const placeId = req.params.pid
    let place

    try{
        place = await Place.findById(placeId)
    }
    catch{
        return next(new HttpError("Something went wrong...", 500))
    }

    if(!place){
        return next(new HttpError("Could not find the place.", 404))
    }

    res.json({place: place.toObject( {getters: true} )})
}

const getUserPlacesbyId = async (req, res, next) => {
    const userId = req.params.uid

    let user

    try{
        user = await Place.find({creator: userId})
    }
    catch{
        return next(new HttpError("Something went wrong...", 500))
    }

    if(!user){
        return next(new HttpError("Could not find the user.", 404))
    }

    res.json({user})
}

const createPlace = async (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("Input not correct. Checkk again", 422))
    }

    const {name, caption, creator} = req.body
    const NewPlace = new Place({
        name,
        caption,
        image: "",
        creator
    })

    // UserData[0].places.push(NewPlace)
    let user;

    try{
        user = await User.findById(creator)
    }catch{
        return next(new HttpError("Creating a new place failed, please try again", 500))
    }

    if (!user) {
        return next(new HttpError("Could not find user for provided id", 404))
    }

    console.log(user)

    try{
        const session = await mongoose.startSession()
        session.startTransaction(); 
        await NewPlace.save({ session: session})
        user.places.push(NewPlace)
        await user.save({session: session})
        await session.commitTransaction()
    }
    catch(err){
        console.log(err)
        return next(new HttpError("Creating a new place failed, please try again", 500))
    }

    res.status(201).json({place: NewPlace})
}

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("Input not correct. Checkk again", 422))
    }

    const placeId = req.params.pid
    const {name, image, caption} = req.body

    // const oldPlaceIndex = UserData[0].places.findIndex(x => x.id == id)

    let place;
    try{
        place = await Place.findById(placeId)
    }
    catch{
        return next(new HttpError("Could not find the place.", 404))
    }

    place.name = name
    place.caption = caption

    try{
        place.save()
    }catch{
        return next(new HttpError("Something went wrong...", 500))
    }

    res.status(201).json({place: place.toObject({ getters: true})})
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid
    // const PlaceIndex = UserData[0].places.findIndex(x => x.id == id)

    // if (PlaceIndex === -1) {
    //     return next(new HttpError("Place requested to delete doesn't exist.", 422))
    // }
    let place
    try{
        place = await Place.deleteOne({_id : placeId})
    }
    catch{
        return next(new HttpError("No such place exists", 500))
    }
    // try{
    //     await place.remove()
    // }
    // catch(err){
    //     console.log(err)
    //     return next(new HttpError("Deleting the place failed", 500))
    // }
    // console.log(PlaceIndex)
    // const newArr = UserData[0].places.filter(x => x.id != id)
    // console.log(newArr)
    // UserData[0].places = newArr

    res.status(200).json({"message": "Removed"})
}

exports.getUserPlacesbyId = getUserPlacesbyId
exports.getPlacebyId = getPlacebyId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace