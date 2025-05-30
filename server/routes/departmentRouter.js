import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment, deleteDepartment, editDepartment, getDapartmentId, getDepartments } from '../controllers/departmentController.js'

const router=express.Router()

router.post("/add",authMiddleware,addDepartment)
router.get("/",authMiddleware,getDepartments)
router.get("/:id",authMiddleware,getDapartmentId)
router.put("/edit",authMiddleware,editDepartment)
router.delete("/:id",authMiddleware,deleteDepartment)

export default router