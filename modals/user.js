import mongoose from "mongoose";
import {Schema} from "mongoose";

const user=new Schema({
    name:String,
    email:String,
    password:String,
    pin:String,
    number:Number,
    address:String,
    pan_card:String
});

export default mongoose.model("User",user);