import express from 'express';
import { createUser, getAllUsers, updateUsers } from '../controller/user.controller.js';
import { verifyAdmin, verifyUser } from '../middleware/verify.token.js';


const router = express.Router();

router.post('/user', createUser);
router.get('/users',verifyAdmin, getAllUsers);
router.get('/users/:id',verifyUser,  getAllUsers);
router.put('/user/:id', updateUsers);
router.delete('/deleteuser/:id', updateUsers);    

export default router;