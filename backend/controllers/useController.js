import validator from 'validator'
import bycrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
//  API to register user

const registerUser = async (req, res)=>{
   try {

    const {name, email, password } = req.body


    if(!name || !password || !email){
        return res.json({success:false, message:'Missing Details'})
    }

    // validating email format
    if(!validator.isEmail(email)){
       return res.json({success:false,message:"enter a valid email"}) 
    }
    //validating strong password
    if(password.length < 8){
        return res.json({success:false,message:"enter a strong email"})
    }

    // hashing user password
    const salt = await bycrypt.genSalt(10)
    const hashedPassword = await bycrypt.hash(password,salt)

    const userData = {
        name,email,
        password:hashedPassword,
    }
    const newUser = new userModel(userData)
    const user = await newUser.save()
     
    const token = jwt.sign(({id:user._id}), process.env.JWT_SECRET)
    res.json({success:true, token})

   } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
   }  
}

// API for user login

const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
 
        // validate user

        if(!user){
            return res.json({success:false, message:"User does not exist"}) 
        }

        // is user match validate password
        const isMathch = await bycrypt.compare(password,user.password)
        if(isMathch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid creadentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message}) 
    }
}

// API to get user profile date

const getProfile = async(req,res)=>{
    try {
        
        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true, userData})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// API to update user profile

const updateProfile = async(req,res)=>{
try {
    
    const userId = req.userId
    const { name ,phone, address, dob, gender}=req.body
    const imageFile = req.file

      if(!name || !phone || !dob || !gender){
          return res.json({success:false, message:"Data Missing"})
      }
        
      await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
      
      if(imageFile){
          //upload  image to cloudinary
          const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
          const imageURL = imageUpload.secure_url
          await userModel.findByIdAndUpdate(userId,{image:imageURL})

      }   
      res.json({success:true,message:"Profile update" })
} catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
}
}

// API to book appointment

const bookAppointment = async (req,res)=>{

    try {


        const userId = req.userId
       
        const {docId, slotDate, slotTime}= req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData){
            return res.json({success:false,message:'Doctor not available'})
        }
        if(!docData.available){
            return res.json({success:false,message:'Doctor not available'})
        }

        let slots_booked = docData.slots_booked || {}

        // Checking for slot availablity

        if(slots_booked[slotDate]){
             if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:'Slot not available'})
             }else{
                slots_booked[slotDate].push(slotTime)
             }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')

        // / Convert doctor data to object

      const doctorDataObj = docData.toObject()

         delete doctorDataObj.slots_booked

         const appointmentData = {
            userId: userId,
            doctorId: docId,
            slotDate: slotDate,
            slotTime: slotTime,
            userData: userData,
            doctorData: doctorDataObj,
            amount: docData.fees,
            date: Date.now()
          }

         const newAppointment = new appointmentModel(appointmentData)
         await newAppointment.save()

         // save new slot data in doctors date

         await doctorModel.findByIdAndUpdate(docId,{slots_booked})
         res.json({success:true,message:'Appointment booked'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// API to egt Appointments for frontend my-appointment page

const listAppointment = async (req, res)=>{

    try {

        const userId = req.userId;
        const appointments = await appointmentModel.find({userId})
        res.json({success : true, appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//  API cancle appointment
const cancleAppointment = async (req, res) => {
    try {
      const userId = req.userId
      const { appointmentId } = req.body
  
      // Find the appointment
      const appointment = await appointmentModel.findById(appointmentId)
      if (!appointment) return res.json({ success: false, message: "Appointment not found" })
  
      // Only the user who booked can cancel
      if (appointment.userId !== userId) {
        return res.json({ success: false, message: "Not authorized" })
      }
  
      // Get doctor info and slot
      const { doctorId, slotDate, slotTime } = appointment
  
      const doctor = await doctorModel.findById(doctorId)
      if (!doctor) return res.json({ success: false, message: "Doctor not found" })
  
      // Remove the slot from doctor slots_booked
      if (doctor.slots_booked && doctor.slots_booked[slotDate]) {

        doctor.slots_booked[slotDate] =
          doctor.slots_booked[slotDate].filter(
            (time) => time.toLowerCase() !== slotTime.toLowerCase()
          )
      
        if (doctor.slots_booked[slotDate].length === 0) {
          delete doctor.slots_booked[slotDate]
        }
      
        doctor.markModified("slots_booked")
      
        await doctor.save()
      }
  
      // Mark appointment as cancelled
      appointment.cancelled = true
      
      await appointment.save()
    res.json({ success: true, message: "Appointment cancelled and slot released" })
    }catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  }

//  API Payment function

const payAppointment = async (req, res) => {
    try {
  
      const userId = req.userId
      const { appointmentId } = req.body
  
      const appointment = await appointmentModel.findById(appointmentId)
  
      if (!appointment) {
        return res.json({ success:false, message:"Appointment not found"})
      }
  
      // security check
      if (appointment.userId.toString() !== userId) {
        return res.json({ success:false, message:"Unauthorized"})
      }
  
      // mark payment as done
      appointment.payment = true
      await appointment.save()
  
      res.json({
        success:true,
        message:"Payment successful (Dummy)"
      })
  
    } catch (error) {
      console.log(error)
      res.json({ success:false, message:error.message })
    }
  }


  

export {registerUser, loginUser , getProfile, updateProfile , bookAppointment, listAppointment, cancleAppointment, payAppointment}