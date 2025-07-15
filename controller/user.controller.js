import { verifyToken } from '../middleware/verify.token.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';


export const createUser = async (req, res = response) => {
    try {
        const { id, username, email, password, role, lastLogin, createdAt, updatedAt } = req.body;
        if(
        id == "" ||
        username == "" ||
        email == "" ||
        password == "" ||
        role == "" ||
        lastLogin == "" ||
        createdAt == "" ||
        updatedAt == ""
        ) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const alredyExist = await User.findOne({email: email});
            if(alredyExist) {
                return res.status(400).json({
                    message: "User already exist"
                })
            }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            id,
            username,
            email,
            password: hashedPassword,
            role,
            lastLogin,
            createdAt,
            updatedAt
        });

        await newUser.save();

        const userResponse = newUser.toObject();
        
        res.status(201).json({
            message: "User created successfully",
            
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message

        })
    }
};

export const getAllUsers = async (req, res = response) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

export const getUserById = async (req, res = response) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            message: "User fetched successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

export const updateUsers = async(req, res = response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

export const deleteUsers = async(req, res = response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};