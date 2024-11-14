import { Router } from "express";
import { allOrganizName, sid } from "../routes/all";

const router = Router()

router.post('/sid', sid);


router.get('/allOrganizName', allOrganizName)




export default router