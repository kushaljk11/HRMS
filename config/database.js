import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch(error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB()
.then(()=>{
    console.log("MongoDB connected successfully");
})
.catch((error)=>{
    console.error('MongoDB connection error:', error);
});

export default connectDB;