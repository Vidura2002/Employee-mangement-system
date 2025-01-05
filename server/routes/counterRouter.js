import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { counter } from '../controllers/counterController.js';


const router = express.Router();

router.get("/",authMiddleware,counter);

export default router;
