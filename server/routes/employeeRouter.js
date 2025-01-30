import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { deleteEmploye, employeeAdd,getEmployeeDetail,getEmployees,upload,getAdmins,getEmployeeId ,getprojectemployee, addProject, fetchProjects, completeProject} from '../controllers/employeeController.js';

const router=express.Router()

router.post("/add",authMiddleware,employeeAdd)
router.get("/getEmployees",authMiddleware,getEmployees)
router.get("/getadmins",authMiddleware,getAdmins)
router.get("/getprojects",authMiddleware,fetchProjects)
router.get("/:id",authMiddleware,getEmployeeDetail)

router.delete("/:id",authMiddleware,deleteEmploye)
router.get("/getEmId/:id",authMiddleware,getEmployeeId)
router.post("/getprojectemployee",authMiddleware,getprojectemployee)
router.post("/addproject",authMiddleware,addProject)
router.put("/completeproject",authMiddleware,completeProject)



export default router;