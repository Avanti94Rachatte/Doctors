import React, { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'


const DoctorAppointments = () => {

  const {getAppointments, backendUrl, dToken, appointments, completeAppointment, cancelAppointment} = useContext(DoctorContext)
   const {calculateAge, slotDateFormat, currency}=useContext(AppContext)
  

  useEffect(()=>{
 
    if(dToken){
      getAppointments()
    }

  },[dToken])
  return (
    <div className="w-full max-w-6xl m-5">

         <p className="mb-3 text-lg font-medium">All Appointments</p>
         
         <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
         
          <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">

            <p className="">#</p>
            <p className="">Patient</p>
            <p className="">Payment</p>
            <p className="">Age</p>
            <p className="">Date & Time</p>
            <p className="">Fees</p>
            <p className="">Action</p>
          </div>
          {
            appointments.reverse().map((item,index)=>(
              <div key={index} className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">

              <p className="max-sm:hidden">{index+1}</p>
              
              <div className="flex items-center gap-2">
                <img src={item.userData?.image} alt="" className="w-8 rounded-full" /><p className="">{item.userData?.name}</p>
              </div>
              
              <div className="text-xs inline border border-primary px-2 rounded-full">
                  <p className="">
                    {item.payment ? 'Online': 'Cash'}
                  </p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData?.dob)}</p>
              <p className="">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p className="">{currency}{item.amount}</p>
              {
                item.cancelled
                ?<p className="text-red-400 font-medium text-xs">Cancelled</p>
                :item.isCompleted
                ? <p className="text-green-500 font-medium text-xs">Completed</p>
              //: <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className="w-10 cursor-pointer" />
                :<div className="flex">
                <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className="w-10 cursor-pointer" />
                <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" className="w-10 cursor-pointer" />
              </div>
              }
              </div>
            ))
          }
         </div>

    </div>
  )
}

export default DoctorAppointments