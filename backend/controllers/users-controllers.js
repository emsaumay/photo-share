const UserData = require("../DUMMY/UserData")
const HttpError = require("../models/httpError")
const {validationResult} = require("express-validator")

const { v4: uuidv4 } = require('uuid');

const getUsers = (req, res, next) => {

    // if(!place){
    //     return next(new HttpError("Could not find the place.", 404))
    // }
    
    res.status(200).json({UserData})
}

const signUp = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("Input not correct. Checkk again", 422))
    }

    const { name, password, email } = req.body

    if (UserData.find(x => x.email === email)) {
        return next(new HttpError("Email already exists", 422))
    }

    const newUser = { id: uuidv4(), name, password, email }

    UserData.push(newUser);

    res.status(201).json({newUser})
}

const login = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("Input not correct. Checkk again", 422))
    }
    
    const { password, email } = req.body

    const IdentifiedUser = UserData.find(x => x.email === email)

    if(!IdentifiedUser || IdentifiedUser.password !== password){
        return next(new HttpError("Incorrect credentials entered...", 401))
    }

    res.json("Logged in!")
}

exports.getUsers = getUsers
exports.signUp = signUp
exports.login = login 