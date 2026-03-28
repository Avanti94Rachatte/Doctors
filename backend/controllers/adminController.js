import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

//API for adding doctor

const addDoctor = async(req, res)=>{
    try {
       const {name,email, password,speciality, degree, experience, about, fees, address}= req.body
       const imageFile = req.file

       //    checking for all data to add doctor
     
       if(!name || !email || !password || !speciality || !degree || !experience  || !about  || !fees  || ! address){
        return res.json({success:false,message:"Minning Details"})
       }

       /// validating email fornat

       if(!validator.isEmail(email)){
        return res.json({success:false,message:"Enter a balid Email"})
       }

       // validating stron password
       if(password.length<8){
        return res.json({success:false,message:"Please enter strong pasaword"})
       }

       // hashing doctor password
       const salt =await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)

       // upload image to cloudinary
       const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
       const imageUrl = imageUpload.secure_url

       const doctorData = {
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality, 
        degree, 
        experience, 
        about, 
        fees, 
        address:JSON.parse(address),
        date:Date.now(),
       }
      
     const newDoctor = new doctorModel(doctorData)
     await newDoctor.save()
     res.json({success:true,message:"Doctor Added"})
      
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API for admin login

const loginAdmin = async(req, res)=>{
  try {
    const {email, password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
     const token = jwt.sign(email+password,process.env.JWT_SECRET)
     res.json({success:true,token})
    }else{
        return res.json({success:false,message:"Invalid credentioal"})
       }
    
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

// API to get all doctors list for admin panel

const allDoctors = async (req, res)=>{

try {

  const doctors = await doctorModel.find({}).select('-password')
  res.json({success:true,doctors})

} catch (error) {
  console.log(error)
  res.json({success:false,message:error.message})
}
    
}

// API to get all appointments list

const appointmentsAdmin = async  (req, res) => {
  try {
    
    const appointments = await appointmentModel.find({})
    res.json({success:true,appointments})
    
  } catch (error) {
    console.log(error)
  res.json({success:false,message:error.message})
}
}

// API for appointment cancllation

const appointmentCancel = async (req, res) => {
  try {
    
    const { appointmentId } = req.body

    // Find the appointment
    const appointment = await appointmentModel.findById(appointmentId)
    if (!appointment) return res.json({ success: false, message: "Appointment not found" })

    

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

// API to get dashbord data for admin panel

const adminDashboard = async (req, res)=>{

  try {

    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors : doctors.length,
      appointments : appointments.length,
      patients : users.length,
      latestAppointments : appointments.reverse().slice(0,5)
    }
    
    res.json({success:true,dashData})

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  
  }

}

export {addDoctor , loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}