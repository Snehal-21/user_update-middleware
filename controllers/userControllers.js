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
        const { _id, number } = req.body;
        if (!_id) return res.send("email is required!");
        if (!number) return res.send("number is required.")
        const response = await User.find({ _id }).exec();
        console.log(response)
        if (!response.length) return res.send("User not find.")
        const update = await User.findOneAndUpdate({ _id }, { number }).exec();
        await update.save();
        return res.send("Number updated");
    } catch (error) {
        return res.send(error);
    }

}

export const changepan = async (req, res) => {
    try {
        const { _id, pan_card } = req.body;
        if (!pan_card) return res.send("PAN crd is required.");
        const user = await User.find({ _id }).exec();
        const update = await User.findOneAndUpdate({ _id }, { pan_card }).exec();
        await update.save();
        return res.send("PAN card updated")
    } catch (error) {
        return res.send(error);
    }
}

export const changeaddress = async (req, res) => {
    try {
        const { _id, address } = req.body;
        if (!_id) return res.send("ID is required.");
        if (!address) return res.send("Address is required.")
        const update = await User.findOneAndUpdate({ _id }, { address }).exec();
        await update.save();
        return res.send("Address is updated.")
    } catch (error) {
        return res.send(error)
    }
}

export const changename = async (req, res) => {
    try {
        const { _id, name } = req.body;
        if (!_id) return res.send("ID is required.");
        if (!name) return res.send("Name is required.");
        const update = await User.findOneAndUpdate({ _id }, { name }).exec();
        await update.save();
        return res.send("Name is updated.")
    } catch (error) {
        return res.send(error);
    }
}

export const changepassword = async (req, res) => {
    try {
        const { _id, password } = req.body;
        if (!_id) return res.send("ID is required.");
        if (!password) return res.send("Password is required.")

        var secretkey = "pass";
        var encrypt_pass = encrypt.encrypt(password, secretkey, 256);
        const update = await User.findOneAndUpdate({ _id }, { password: encrypt_pass }).exec();
        await update.save();
        return res.send("Password is updated.")
    } catch (error) {
        return res.send(error);
    }
}