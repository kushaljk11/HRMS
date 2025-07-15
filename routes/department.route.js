import express from 'express';
import { createDepartment, getAllDepartments,getDepartmentById,updateDepartment,deleteDepartment } from '../controller/departmentcontroller.js';
import { verifyToken, authorizationRoles } from '../middleware/verify.token.js';
const router = express.Router();

router.post('/department', verifyToken, authorizationRoles('Admin'), createDepartment);
router.get('/departments', verifyToken, authorizationRoles('Admin','Manager'), getAllDepartments);
router.get('/department/:id', verifyToken, authorizationRoles('Admin','Manager'), getDepartmentById);
router.put('/department/:id', verifyToken, authorizationRoles('Admin'), updateDepartment);
router.delete('/department/:id', verifyToken, authorizationRoles('Admin'), deleteDepartment);

export default router;