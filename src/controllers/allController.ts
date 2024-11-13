import { Router } from "express";
import { sid } from "../routes/all";

const router = Router()

router.post('/sid', sid)




export default router