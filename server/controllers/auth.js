import bcrypt from "bcrypt";
import User from '../models/User.js';
import jwt from "jsonwebtoken"

//register user
export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,

        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, password: passwordHash, friends, picturePath
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

export const login = async(req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({msg: "User not found"} );
        }

        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Wrong Password"} );
        }

        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        delete user.password;

        res.cookie('jwt', token, {
            httpOnly:true,
            maxAge: 24*60*60*1000 
        
        })      
        res.status(200).json({ token, user });
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}