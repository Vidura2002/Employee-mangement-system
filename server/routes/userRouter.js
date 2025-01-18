import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import { request_leave,getLeaves, myLeaves, cancelLeaves, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.get("/:id",authMiddleware,getLeaves)
router.post("/reqLeave",authMiddleware,request_leave)
router.get("/getLeaves/:id",authMiddleware,myLeaves)
router.delete("/cancelLeave/:id",authMiddleware,cancelLeaves)
router.get("/getEmployee",authMiddleware)
router.put("/updateprofile",authMiddleware,updateProfile)

export default router