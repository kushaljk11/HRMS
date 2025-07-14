import express from 'express';
import router from './routes/user.route.js';
import connectDB from './config/database.js';


const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/api', router);


app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});