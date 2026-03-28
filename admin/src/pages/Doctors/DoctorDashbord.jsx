import React, { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashbord = () => {

  const {dToken, getDashData,dashData, setDashData, completeAppointment,cancelAppointment} =useContext(DoctorContext)
  const {currency, slotDateFormat} = useContext(AppContext)

  useEffect(()=>{
    if(dToken){
      getDashData()
    }
  },[dToken])


  return dashData && (
    <div className='m-5'>
   
     <div className="flex flex-wrap gap-3">
     
             <div className="flex items-center gap-2 p-4 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500">
               <img src={assets.earning_icon} alt="" className="w-14" />
               <div className="">
                 <p className="text-xl font-semibold text-gray-600">{currency} {dashData.earnings}</p>
                 <p className="text-gray-400 ">Earnings</p>
               </div>
             </div>
     
             <div className="flex items-center gap-2 p-4 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500">
               <img src={assets.appointments_icon} alt="" className="w-14" />
               <div className="">
                 <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
                 <p className="text-gray-400 ">Appointments</p>
               </div>
             </div>
     
             <div className="flex items-center gap-2 p-4 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500">
               <img src={assets.patients_icon} alt="" className="w-14" />
               <div className="">
                 <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
                 <p className="text-gray-400 ">Patients</p>
               </div>
             </div>
     
           </div> 

           <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-100">
                     <img src={assets.list_icon} alt="" className="font-semibold" />
                     <p className="font-semibold">Latest Booking</p>
                   </div>

            <div className="pt-4  border border-gray-100">
                      {
                        dashData.latestAppointments.map((item,index)=>(
                          <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
                            <img src={item.doctorData.image} alt="" className="rounded-full w-10" />
            
                            <div className="flex-1 text-sm">
                              <p className="text-gray-800 font-medium">{item.doctorData.name}</p>
                              <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                            </div>
                            {
                              item.cancelled
                              ?<p className="text-red-400 font-medium text-xs">Cancelled</p>
                              : <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className="w-10 cursor-pointer" />
                            }        
                           </div>
                        ))
                      }
                    </div>       

    </div>
  )
}

export default DoctorDashbord
