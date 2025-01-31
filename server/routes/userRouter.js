import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import { request_leave,getLeaves, myLeaves, cancelLeaves, updateProfile, getProject } from '../controllers/userController.js';

const router = express.Router();

router.get("/:id",authMiddleware,getLeaves)
router.post("/reqLeave",authMiddleware,request_leave)
router.get("/getLeaves/:id",authMiddleware,myLeaves)
router.get("/getproject/:id",authMiddleware,getProject)
router.delete("/cancelLeave/:id",authMiddleware,cancelLeaves)
router.get("/getEmployee",authMiddleware)
router.put("/updateprofile",authMiddleware,updateProfile)

export default router