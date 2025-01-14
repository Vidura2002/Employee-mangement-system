import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { deleteEmploye, employeeAdd,getEmployeeDetail,getEmployees,upload,getAdmins,getEmployeeId } from '../controllers/employeeController.js';

const router=express.Router()

router.post("/add",authMiddleware,employeeAdd)
router.get("/getEmployees",authMiddleware,getEmployees)
router.get("/getadmins",authMiddleware,getAdmins)
router.get("/:id",authMiddleware,getEmployeeDetail)
router.delete("/:id",authMiddleware,deleteEmploye)
router.get("/getEmId/:id",authMiddleware,getEmployeeId)


export default router;