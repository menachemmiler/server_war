import { Router } from "express";
import { login, myOrganiz, register } from "../routes/users";
import verifyUser from "../middlewares/verifyUser";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/myOrganiz", verifyUser, myOrganiz);

//to send a missile i need
//tocheck if he is a terrorist or idf 
//2) i need to check if he has enough resources

// router.post('/sendMissile', verifyUser, sendMissile)

// router.get('/profile', verifyUser, profile)

export default router;
