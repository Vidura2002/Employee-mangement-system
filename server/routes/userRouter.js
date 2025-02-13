import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import { request_leave,getLeaves, myLeaves, cancelLeaves, updateProfile, getProject, fetchNotifications, clickNotification, notificationCount, changePassword } from '../controllers/userController.js';

const router = express.Router();

router.get("/:id",authMiddleware,getLeaves)
router.post("/reqLeave",authMiddleware,request_leave)
router.get("/getLeaves/:id",authMiddleware,myLeaves)
router.get("/getproject/:id",authMiddleware,getProject)
router.get("/fetchnotifications/:id",authMiddleware,fetchNotifications)
router.get("/notificationcount/:id",authMiddleware,notificationCount)
router.delete("/cancelLeave/:id",authMiddleware,cancelLeaves)
router.get("/getEmployee",authMiddleware)
router.put("/updateprofile",authMiddleware,updateProfile)
router.put("/clicknotification",authMiddleware,clickNotification)
router.put("/changepassword",authMiddleware,changePassword)

export default router