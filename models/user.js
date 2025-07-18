import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  username:{
    type: String,
    required: [true, "UserName is required!"],
    trim: true
  },
  email:{
    type: String,
    required: [true,"Email is required!"],
    unique: true,
    lowercase: true,
    
  },
  password:{
    type: String,
    required: [true, "Password is required!"],
    minlength: [8, "Password must be at least 8 characters long!"],
    unique: true,
    select: false
  },
  role:{
    type: String,
    enum: ['employee', 'admin','manager'],
    default: 'Employee',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
    
  },
  isTempPassword:{
    type: Boolean,
    default: true
  },
  tempPasswordExpiry: {
    type: Date,
    
  },
  requirePasswordReset:{
    type: Boolean,
    default: true
  },
  lastLogin:{
    type: Date,
   
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User;