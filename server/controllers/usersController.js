import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
    try{
        const {username , email, password } = req.body;
        const usernameCheck = await userModel.findOne({ username });
        const emailCheck = await userModel.findOne({ email });

        if(usernameCheck){
            return res.json({ message: "User already present", status: false });
        }
    
        if(emailCheck){
            return res.json({ message: "Email already used", status: false });
        }
    
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username, email, password:hashPassword
        });

        const userCopy = user.toObject();
        delete userCopy['password'];
        return res.json({ status: true, user: userCopy });
    } catch (error) {
        next(error);
    }

};

export const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });

        console.log(user);
        
        if(!user){
            return res.json({ message: "Username or password incorrect", status: false });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.json({ message: "Username or password incorrect", status: false });
        }

        const userCopy = user.toObject();
        delete userCopy['password'];
        return res.json({ status: true, user: userCopy });
    } catch (error) {
        next(error);
    }

};

export const setAvatar = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;

        const user = await userModel.findByIdAndUpdate(userId, {
            isAvatarSet: true,
            avatar:avatarImage,
        });

        return res.json({
            isSet: user.isAvatarSet, 
            image: user.avatar,
        });

    } catch (error) {
        next(error);
    }

};


// to add friend
export const addFriends = async (req, res, next) => {

}

export const getAllUsers = async(req, res, next) => {
    try {
        const users = await userModel.find({ _id: { $ne: req.params.id } }).select([
            "_id",
            "email",
            "username",
            "avatar",
        ]);

        return res.json({users: users});
    } catch (error) {
        next(error);
    }
};

