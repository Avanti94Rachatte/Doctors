
import express from 'express'
import { registerUser,loginUser,getProfile,updateProfile, bookAppointment, listAppointment, cancleAppointment,payAppointment } from '../controllers/useController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'



const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment', authUser,bookAppointment)
userRouter.get('/appointments',authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser,cancleAppointment)
userRouter.post('/pay-appointment', authUser,payAppointment)

export default userRouter