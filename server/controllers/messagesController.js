import messageModel from "../models/messageModel.js";

export const addMessage = async (req, res, next) => {
    try{
        const {from,to,message} = req.body;
        const data = await messageModel.create(
            {
                message: { text: message },
                users: [from, to],
                sender: from,
            }
        );

        if(data) {
            return res.json({message: "message added successfully"});
        } else {
            return res.json({message: "Failed added message"});
        }
    } catch (error) {
        next(error);
    }

};

export const getAllMessage = async (req, res, next) => {
    try{
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            }
        }).sort({updatedAt: 1});

        const mesList = messages.map((msg) => {
            return {
                fromSelf: msg.sender.equals(from),
                message: msg.message.text,
            };
        });

        return res.json({ messages: mesList });
    } catch (error) {
        next(error);
    }

};