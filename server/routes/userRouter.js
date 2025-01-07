import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import { request_leave,getLeaves } from '../controllers/userController.js';

const router = express.Router();

router.get("/:id",authMiddleware,getLeaves)
router.post("/reqLeave",authMiddleware,request_leave)


export default router