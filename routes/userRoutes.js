import express from "express";
import { checks, pin } from "../middlewares/authmiddlewares.js";
import { changeNumber, changepan, register } from "../controllers/userControllers.js";
const router=express.Router();

router.post('/register',checks,register);
router.post('/changeNumber',pin,changeNumber);
router.post('/changepan',pin,changepan);
export default router;