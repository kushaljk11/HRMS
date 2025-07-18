import express from 'express';
import { createUser, getAllUsers,getUserById, updateUsers, deleteUsers } from '../controller/user.controller.js';



const router = express.Router();

router.post('/user', createUser);
router.get('/users',getAllUsers);
router.get('/users/:id',getUserById);
router.put('/user/:id', updateUsers);
router.delete('/deleteuser/:id', deleteUsers);    

export default router;