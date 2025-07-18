import express from 'express'
import connectDB from './config/database.js'
import userRouter from './routes/user.route.js'
import userEmployeeRouter from './routes/employee.route.js'
import userDepartmentRouter from './routes/department.route.js'
import userLeaveRequestRouter from './routes/leaverequest.route.js'
import userAttendanceRouter from './routes/attendance.route.js';
import dotenv, { configDotenv } from 'dotenv';
import authRouter from './routes/auth.route.js'
import nodemailer from "nodemailer";

const app = express()

dotenv.config();

app.use(express.json())
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  console.log('Database is connected successfully')
}).catch(err => {
  console.error('Database connection failed!!:', err)
})


app.use('/api', userRouter)
app.use('/api', userEmployeeRouter)
app.use('/api', userDepartmentRouter)
app.use('/api', userLeaveRequestRouter)
app.use('/api', userAttendanceRouter)
app.use('/api',authRouter)

app.get("/hello", (req, res) => {
  res.send("Hello World");
})


app.post('/send-email', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'np05cp4a240142@iic.edu.np',
        pass: 'oewe mfgc hfqb qutw'
      }
    });
    
    const mailOptions = {
      from: 'np05cp4a240142@iic.edu.np',
      to: 'thaparojash703@gmail.com',
      subject: 'Test Email from Node.js',
      text: 'Rojash pojash vojash mojash lojash rojash pojash vojash mojash lojash',
      html: '<p>Hello! rojash pojash vojash mojash lojash</p>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error:', error);
      }
      console.log('Email sent:', info.response);
    });
    
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
    }
});

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
