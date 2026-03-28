import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const AllAppointment = () => {

  const {aToken, appointments, getAllAppointments,completeAppointment, cancelAppointment}=useContext(AdminContext)
  const {calculateAge, slotDateFormat, currency}=useContext(AppContext)

  useEffect(()=>{
    if(aToken){
      getAllAppointments()
      console.log("Calling API...");
    }
  },[aToken])

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p className="">#</p>
          <p className="">Patient</p>
          <p className="">Age</p>
          <p className="">Date & Time</p>
          <p className="">Doctor</p>
          <p className="">Fees</p>
          <p className="">Actions</p>
        </div>

        {
          appointments.map((item,index)=>(
            <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">

              <p className="max-sm:hidden">{index+1}</p>
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt="" className="w-8 rounded-full" /><p className="">{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p className="">{slotDateFormat(item.slotDate)},{item.slotTime}</p>

              <div className="flex items-center gap-2">
                <img src={item.doctorData.image} alt="" className="w-8 rounded-full bg-gray-200" /><p className="">{item.doctorData.name}</p>
              </div>
              <p className="">{currency}{item.amount}</p>
              {
                item.cancelled
                ?<p className="text-red-400 font-medium text-xs">Cancelled</p>
                :item.isCompleted
                ?<p className="text-green-500 font-medium text-xs">Completed</p>
                :<img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className="w-10 cursor-pointer" />
              //  :<div className="flex">
              //    <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className="w-10 cursor-pointer" />
              //    <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" className="w-10 cursor-pointer" />
              //  </div>

              }
         
            </div>
          ))
        }
      
      </div>
    </div>
  )
}

export default AllAppointment