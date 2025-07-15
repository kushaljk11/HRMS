import express from 'express';
import { createLeaveRequest, getAllLeaveRequests, approveLeaveRequest,getLeaveRequestById} from '../controller/leaverequest.controller.js';
import { verifyToken, authorizationRoles } from '../middleware/verify.token.js';

const router = express.Router();

router.post('/', verifyToken, authorizationRoles('Employee'), createLeaveRequest);
router.get('/', verifyToken, authorizationRoles('Admin'), getAllLeaveRequests);
router.get('/:id', verifyToken, authorizationRoles('Employee'), getLeaveRequestById);
router.patch('/:id', verifyToken, authorizationRoles('Admin','Manager'), approveLeaveRequest) ;

export default router;
