import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/monodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import { loginAdmin } from './controllers/adminController.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'

// app config

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

//middlewatrs

app.use(express.json())

app.use(cors())

// api endpoint
app.use('/api/admin',adminRouter)

//   http://localhost:4000/api/admin/add-doctor

app.use('/api/doctor',doctorRouter)
//  http://localhost:4000/api/doctor

app.use('/api/user',userRouter)
//  http://localhost:4000/api/user/register



app.use('/login',loginAdmin)
//   http://localhost:4000/api/admin/login



app.get('/',(req,res)=>{
    res.send('API Working ')
})

app.listen(port, ()=> console.log("Server started",port))