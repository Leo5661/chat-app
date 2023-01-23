import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
    try{
        console.log(req.body);
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
        return res.json({ status: true, userCopy });
    } catch (error) {
        next(error);
    }

};