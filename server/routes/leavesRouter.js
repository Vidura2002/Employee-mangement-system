import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import { approve, reject } from '../controllers/leavesController.js';

const router = express.Router();

router.put("/:id",authMiddleware,approve)
router.put("/reject/:id",authMiddleware,reject)

export default router;