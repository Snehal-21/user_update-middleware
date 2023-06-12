import encrypt from "encryptjs";
import User from '../modals/user.js';
export const checks=(req,res,next)=>{
    try{
        const { name,email,password,pin,number,address,pan_card}=req.body;
        if(!name) return res.send("Name is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.")
        if(!pin) return res.send("Pin is required!");
        if(!number) return res.send("Number is required.");
        if(!address) return res.send("Address is required.");
        if(!pan_card) return res.send("PAN number is required.");
        next();
    }catch(error){
        return res.send(error);
    }
}

export const pin=async(req,res,next)=>{
    try{
    const {_id,pin}=req.body;
    if(!_id) return res.send("Id is required");
    if(!pin) return res.send("Pin is required in middleware");

    const response=await User.find({_id}).exec();
   
    if(!response.length) return res.send("User not found.");
    var scretkey="pin";
    var decipher=encrypt.decrypt(response[0].pin,scretkey,256);
   
    if(decipher==pin){
        next();
    }else{
        return res.send("Incorrect pin in middleware");
    }
    }catch(error){
        return res.send(error);
    }
}