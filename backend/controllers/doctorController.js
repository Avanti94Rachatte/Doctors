import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailablity = async (req, res)=>{

    try {
        
        const {doctorId} =req.body
        const docData = await doctorModel.findById(doctorId)
        await doctorModel.findByIdAndUpdate(doctorId,{available: !docData.available})
        res.json({success:true,message:'Availability Change'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

 const doctorList = async(req, res) =>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true, doctors})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
     
    }
 }

//  API for doctors login

const loginDoctor = async (req, res)=>{

    try {

        const {email, password} = req.body
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
          return  res.json({success:false,message:'Invalid creadentials'})
        }

        const isMatch = await bcrypt.compare(password,  doctor.password)

        if(isMatch){
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:'Invalid credentials'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    
    }
}

// API to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
    try {
  
      const doctorId = req.docId  // ✅ FIXED
  
      const appointments = await appointmentModel.find({ doctorId })
  
      res.json({ success: true, appointments })
  
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  }

//   API to mark appointment completed for doctor panel

const appointmentComplete = async (req, res) => {
    try {
  
      const doctorId = req.docId
      const { appointmentId } = req.body
  
      const appointmentData = await appointmentModel.findById(appointmentId) // ✅ FIX
  
      if (appointmentData && appointmentData.doctorId.toString() === doctorId) {
  
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
  
        return res.json({ success: true, message: 'Appointment Completed' })
  
      } else {
        return res.json({ success: false, message: 'Mark Failed' })
      }
  
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  }

// API to cencle appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {
  
      const doctorId = req.docId
      const { appointmentId } = req.body
  
      const appointmentData = await appointmentModel.findById(appointmentId) // ✅ FIX
  
      if (appointmentData && appointmentData.doctorId.toString() === doctorId) {
  
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
  
        return res.json({ success: true, message: 'Appointment Cancelled' })
  
      } else {
        return res.json({ success: false, message: 'Cancellation Failed' })
      }
  
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  }

  // API to get Dashboard data for doctor panel

  const doctorDashboard = async (req, res) => {
    try {
  
      const docId = req.docId
  
      // ✅ FIXED FIELD NAME
      const appointments = await appointmentModel.find({ doctorId: docId })
  
      // ✅ Earnings
      let earnings = 0
      appointments.forEach((item) => {
        if (item.isCompleted && item.payment) {
          earnings += item.amount
        }
      })
  
      // ✅ Unique patients
      const patients = new Set()
      appointments.forEach((item) => {
        patients.add(item.userId.toString())
      })
  
      const dashData = {
        earnings,
        appointments: appointments.length,
        patients: patients.size,
        latestAppointments: [...appointments].reverse().slice(0, 5) // ✅ FIXED
      }
  
      res.json({ success: true, dashData })
  
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  }

  // API to get doctors profile for doctor panel

  const doctorProfile = async (req,res)=>{
    try {
       const docId = req.docId
      // const {docId} = req-body

      const profileData = await doctorModel.findById(docId).select('-password')

      res.json({success:true,profileData})
      
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   
    }
  }

  // API to update doctor Profile data from Doctor Panel

  const updateDoctorProfile = async (req,res)=>{
    try {
       const docId = req.docId

      const { fees,address,available} = req.body

      await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

      res.json({success:true,message:'profile updated'})
      
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   
    }
  }

export {changeAvailablity,updateDoctorProfile ,appointmentCancel,doctorProfile, appointmentComplete, doctorList, loginDoctor, appointmentsDoctor, doctorDashboard}