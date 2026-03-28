import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appoinment = () => {
 const {docId} = useParams()

 const {doctors, CurrencySymbol, backendUrl,token, getDoctorsData}= useContext(AppContext)
const dayOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

const navigate = useNavigate()
 const [docInfo, setDocInfo]=  useState(null)
 const [docSlots,setDocSlots]= useState([])
 const [slotIndex,setSlotIndex]=useState(0)
 const [slotTime, setSlotTime]=useState('')

 const fetchDocInfo = async ()=>{
  const doctor = doctors.find(doc => doc._id === docId)
     setDocInfo(doctor)
 
}

const getAvailableSlot = async ()=>{

  if(!docInfo) return  
setDocSlots([])

//get current date

let today = new Date()
for(let i=0; i<7; i++){
  //geting data with index

  let currentdate = new Date(today)
  currentdate.setDate(today.getDate()+i)

  // set end time of the date

  let endTime = new Date()
  endTime.setDate((today.getDate()+i))
  endTime.setHours(21,0,0,0)

  //setting hours

  if(today.getDate()===currentdate.getDate()){
    currentdate.setHours(currentdate.getHours() >= 10 ? currentdate.getHours()+1 : 10)
    currentdate.setMinutes(currentdate.getMinutes()>30 ? 30:0)

  }else{
    currentdate.setHours(10)
    currentdate.setMinutes(0)
  }

  let timeSlots = []
  while (currentdate < endTime) {
    let formatedTime = currentdate.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'})
    
    let day = currentdate.getDate()
    let month = currentdate.getMonth()+1
    let year = currentdate.getFullYear()

    const slotDate =  day + "_" + month + "_" + year
    const slotTime = formatedTime

    const isSlotAvailable =  docInfo?.slots_booked?.[slotDate]?.includes(slotTime) ? false : true
    
    if (isSlotAvailable){

      //add slot to array
     timeSlots.push ({
      datetime: new Date(currentdate),
      time: formatedTime,
     })
     
    }
    
     // Increment time by 30 minutes
     currentdate.setMinutes(currentdate.getMinutes() + 30)
  }
  setDocSlots(prev => ([...prev, timeSlots]))
}

}

const bookAppointment =async()=>{

  if(!token){
    toast.warn('Login to book appointment')
    return navigate('/login')
  }
  if(!slotTime){
    toast.warn("Please select a time slot")
    return
  }

  try {

    const date = docSlots[slotIndex]?.[0]?.datetime

    if(!date){
      toast.error("Please select a valid slot")
      return
    }

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year
    
    const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId, slotDate, slotTime},{headers:{token}})
    
    if(data.success){
     toast.success(data.message)
     getDoctorsData()
     navigate('/my-appointments')
    } else{
      toast.error(data.message)
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

useEffect(()=>{
  fetchDocInfo()
},[doctors, docId])

useEffect(()=>{
  getAvailableSlot()
},[docInfo])

useEffect(()=>{
  console.log(docSlots)
},[docSlots])


  return docInfo && (
    <div>
      {/* ----Doctor Detail---- */}
      <div className="flex flex-col  sm:flex-row gap-4 ">
        <div className="">
         <img src={docInfo.image} alt="" className="bg-primary w-full sm:max-w-72 rounded-lg" />
        </div>
        <div className="flex-1 border border-gray-400 roundede-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0 ">
          {/* ----- Doc Info : name, degree, experience----- */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{docInfo.name} 
            <img src={assets.verified_icon} alt="" className="w-5" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p className="">{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            {/* -------- Dector About ------- */}
            <div className="">
              <p className="flex items-center ga text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="" className="" /></p>
               <p className="text-sm text-gray-500 max-w-175 mt-1">{docInfo.about}</p>
            </div>

            <p className="text-gray-500 font-medium mt-4">Appointment Fee : <span className="text-gray-800">{CurrencySymbol} {Number(docInfo.fees)*10}</span> </p>

        </div>

      </div>
      {/* -------booking Slots------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 ">
        <p className="">Booking SLots</p>
        <div className="flex items-center gap-4 mt-4 w-full overflow-x-scroll">
          {docSlots.length && docSlots.map((item,index)=>(
            <div onClick={()=> setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white':'border border-gray-400'} `}>
              <p className="">{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
              <p className="">{item[0] && item[0].datetime.getDate()}</p>

            </div>
          ))}
        </div>
        <div className="flex items-center ">
          {docSlots.length && docSlots[slotIndex].map((item, index)=>(
            <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime?'bg-primary text-white':'text-gray-400 border border-gray-400'}`}>
              {item.time.toLowerCase()}
            </p>
          ))
          }
        </div>
        <button onClick={bookAppointment} className="bg-primary text-white text-sm py-3 px-14 rounded-full my-6 font-light">Book an Appointment</button>
      </div>
      {/* -- Listing related Doctors ---- */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appoinment