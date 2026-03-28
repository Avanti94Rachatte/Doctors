import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"

const Receipt = () => {

  const { appointmentId } = useParams()
  const navigate = useNavigate()

  const { backendUrl, token } = useContext(AppContext)

  const [appointment,setAppointment] = useState(null)

  const getReceipt = async () => {

    try {

      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        { headers:{ token } }
      )

      if(data.success){

        const found = data.appointments.find(
          item => item._id === appointmentId
        )

        setAppointment(found)

      }

    } catch (error) {
      console.log(error)
    }

  }

  // Confirm payment
  const confirmPayment = async () => {

    try {

      const { data } = await axios.post(
        backendUrl + "/api/user/pay-appointment",
        { appointmentId },
        { headers:{ token } }
      )

      if(data.success){

        toast.success("Payment Successful")

        navigate("/my-appointments")

      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    getReceipt()
  },[])

  if(!appointment){
    return <p className="text-center mt-20">Loading receipt...</p>
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">

        <h2 className="text-2xl font-bold text-center mb-4">
          Appointment Receipt
        </h2>

        <div className="border-b pb-4">

          <p><strong>Patient :</strong> {appointment.userData?.name}</p>

          <p><strong>Doctor :</strong> {appointment.doctorData?.name}</p>

          <p><strong>Speciality :</strong> {appointment.doctorData?.speciality}</p>

          <p><strong>Date :</strong> {appointment.slotDate}</p>

          <p><strong>Time :</strong> {appointment.slotTime}</p>

        </div>

        <div className="mt-4 flex justify-between text-lg">

          <span className="font-semibold">Consultation Fee</span>

          <span className="text-green-600 font-bold">
            ₹{appointment.amount}
          </span>

        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">

          <button
            onClick={()=>window.print()}
            className="flex-1 py-2 bg-blue-600 text-white rounded"
          >
            Print Receipt
          </button>

          <button
            onClick={confirmPayment}
            className="flex-1 py-2 bg-green-600 text-white rounded"
          >
            Confirm Payment
          </button>

        </div>

      </div>

    </div>

  )
}

export default Receipt