import { Router } from "express";
import { login, myOrganiz, register } from "../routes/users";
import verifyUser from "../middlewares/verifyUser";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/myOrganiz", verifyUser, myOrganiz);

// router.get('/profile', verifyUser, profile)

export default router;
