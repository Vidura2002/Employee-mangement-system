import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import { request_leave,getLeaves, myLeaves } from '../controllers/userController.js';

const router = express.Router();

router.get("/:id",authMiddleware,getLeaves)
router.post("/reqLeave",authMiddleware,request_leave)
router.get("/getLeaves/:id",authMiddleware,myLeaves)


export default router