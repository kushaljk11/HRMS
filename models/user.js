import mongoose from "mongoose";

const UserSchema = new mongoose.Schema (
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "employee", "eanager"],
            required: true
        },
        lastLogin: {
            type: Date,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    },
    {
    timestamps: true
    }   
);

export const User = mongoose.model('User', UserSchema);