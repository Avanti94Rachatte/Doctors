import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppoinments = () => {
  const { backendUrl, token ,getDoctorsData} = useContext(AppContext)
  
  const [appointments, setAppointments] = useState([])
  const months =["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","sep","Oct","Nov","Dec"]
  const navigate = useNavigate()
  const slotDateFormat = (slotDate)=>{

    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2] 
  }

  // Fetch user appointments
  const getUserAppointments = async () => {
    if (!token) return

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      })

      if (data.success) {
        // Reverse to show latest first
        setAppointments(data.appointments.reverse())
        console.log('Appointments:', data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) =>{

    try {

      const {data}= await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  // Go to receipt page
  const payAppointment = (appointmentId) => {

    navigate(`/receipt/${appointmentId}`)

  }

  useEffect(() => {
    getUserAppointments()
  }, [token])

  return (
    <div className="mt-12">
      <p className="pb-3 font-medium text-zinc-700 border-b">My Appointments</p>

      {appointments.length === 0 && (
        <p className="text-gray-500 mt-4">No appointments booked yet.</p>
      )}

      <div className="mt-4">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b items-center"
          >
            <div className="w-32 bg-indigo-50 rounded-lg overflow-hidden">
              <img onClick={()=>navigate(`/appointments/${item.doctorData._id}`)}
                src={item.doctorData?.image}
                alt={item.doctorData?.name}
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.doctorData?.name}
              </p>
              <p>{item.doctorData?.speciality}</p>

              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.doctorData?.address?.line1}</p>
              <p className="text-xs">{item.doctorData?.address?.line2}</p>

              <p className="text-xs mt-1">
                Date & Time:{' '}
                <span className="text-sm text-neutral-700 font-medium">
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 justify-end">

              {/* Pay button */}
              {!item.cancelled && !item.payment && !item.isCompleted &&
                <button
                  onClick={()=>payAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition"
                >
                  Pay Online
                </button>
              }

              {/* Paid */}
              {item.payment && !item.cancelled && !item.isCompleted && 
                <button
                  className="sm:min-w-48 py-2 border border-green-500 text-green-600 rounded"
                >
                  Booked
                </button>
              }

              {/* Cancel */}
              {!item.cancelled && !item.isCompleted &&
                <button
                  onClick={()=>cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition"
                >
                  Cancel Appointment
                </button>
              }

              {/* Cancelled */}
              
              {
                item.cancelled && !item.isCompleted &&<button className="sm:min-w-48 py-2 border border-red-500 text-red-500">Appointment Cancelled</button>
              }
              {
                item.isCompleted && <button className="sm:min-w-48 py-2 border"></button>
              }
                
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppoinments