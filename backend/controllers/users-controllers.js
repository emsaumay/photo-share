const UserData = require("../DUMMY/UserData")
const HttpError = require("../models/httpError")
const {validationResult} = require("express-validator")

const { v4: uuidv4 } = require('uuid');
const user = require("../models/user");

const getUsers = (req, res, next) => {

    // if(!place){
    //     return next(new HttpError("Could not find the place.", 404))
    // }
    
    res.status(200).json({UserData})
}

const signUp = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("Input not correct. Checkk again", 422))
    }

    const { name, password, email, places } = req.body

    let existingUser

    try{
        existingUser = await user.findOne({email: email})
    }
    catch{
        return next(new HttpError("Signing up Failed", 500))
    }

    if (existingUser) {
        return next(new HttpError("Email already exists", 422))
    }

    const NewUser = new user({ 
        name,
        email,
        password,
        image: "https://media.istockphoto.com/id/1200677760/photo/portrait-of-handsome-smiling-young-man-with-crossed-arms.jpg?b=1&s=612x612&w=0&k=20&c=t7Z7NBXf5t7jWqoFxsH7B3bgrO3_BznOOhqEXWywjOc=",
        places
    })

    // UserData.push(newUser);

    try{
        await NewUser.save()
    }
    catch(err){
        console.log(err)
        return next(new HttpError("Creating a new user failed, please try again", 500))
    }

    res.status(201).json({user: NewUser.toObject({getters: true})})
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