import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { deleteEmploye, employeeAdd,getEmployeeDetail,getEmployees,upload } from '../controllers/employeeController.js';

const router=express.Router()

router.post("/add",authMiddleware,employeeAdd)
router.get("/getEmployees",authMiddleware,getEmployees)
router.get("/:id",authMiddleware,getEmployeeDetail)
router.delete("/:id",authMiddleware,deleteEmploye)

export default router;