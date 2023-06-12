import express from "express";
import { checks, pin } from "../middlewares/authmiddlewares.js";
import { changeNumber, changeaddress, changename, changepan, changepassword, register } from "../controllers/userControllers.js";
const router=express.Router();

router.post('/register',checks,register);
router.post('/changeNumber',pin,changeNumber);
router.post('/changepan',pin,changepan);
router.post('/changeaddress',pin,changeaddress);
router.post('/changename',pin,changename);
router.post('/changepassword',pin,changepassword);
export default router;