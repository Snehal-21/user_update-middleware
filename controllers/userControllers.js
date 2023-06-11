import User from '../modals/user.js';
import encrypt from "encryptjs";
export const register = async (req, res) => {
    try {
        const { name, email, password, pin, number, address, pan_card } = req.body;
        const response = await User.find({ email }).exec();
        if (response.length) return res.send("User already exist.")

        var secretPass = "pass";
        var cipherpass = encrypt.encrypt(password, secretPass, 256);

        var secretpin = "pin";
        var cipherpin = encrypt.encrypt(pin, secretpin, 256);

        const user = new User({
            name,
            email,
            password: cipherpass,
            pin: cipherpin,
            number,
            address,
            pan_card
        });
        await user.save();
        return res.send("Registration successfully.")
    } catch (error) {
        return res.send(error);
    }
}

export const changeNumber = async (req, res) => {
    try {
        const { email, number } = req.body;
        if (!email) return res.send("email is required!");
        if (!number) return res.send("number is required.")
        const response = await User.find({ email }).exec();
        console.log(response)
        if (!response.length) return res.send("User not find.")
        const update = await User.findOneAndUpdate({ email }, { number });
        await update.save();
        return res.send("Number updated");
    } catch (error) {
        return res.send(error);
    }

}

export const changepan=async(req,res)=>{
    try{
        const {email,pan_card}=req.body;
        const update=await User.findOneAndUpdate({email},{pan_card});
        await update.save();
        return res.send("PAN card updated")
    }catch(error){
        return res.send(error);
    }
}