import React from 'react'
import {assets} from '../assets/assets_admin/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [state,setState]= useState('Admin')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

const {setAToken, backendUrl}=useContext(AdminContext)
const {dToken, setDToken} = useContext(DoctorContext)


const onSubmitHandler = async(event)=>{
   event.preventDefault()
   try {
      if(state === 'Admin'){
        const {data}=await axios.post(backendUrl + '/api/admin/login',{email,password})
        if(data.success){
            localStorage.setItem('aToken', data.token)
            setAToken(data.token)
        }else{
            toast.error(data.message)
          }   
      } else{
       const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})

       if(data.success){
        localStorage.setItem('dToken', data.token)
        setDToken(data.token)
        console.log(data.token)
    }else{
        toast.error(data.message)
      }

      }
   } catch (error) {
    
   }
}

  return (
    <form onSubmit={onSubmitHandler} action="" className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:w96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
            <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span> Login</p>
            <div className="w-full">
                <p className="">Email:</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="border border-[#DADADA] rounded w-full p-2 mt-1" required/>
            </div>

            <div className="w-full">
                <p className="">Password:</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" className="border border-[#DADADA] rounded w-full p-2 mt-1" required/>
            </div>
            <button className="bg-primary text-white w-f py-2 rounded-md text-base w-full" >Login</button>
            
            {
                state === 'Admin'
                ? <p className="">Doctor Login? <span onClick={()=>setState('Doctor')} className="text-primary underline cursor-pointer">Click here</span></p>
                : <p className="">Admin Login? <span onClick={()=>setState('Admin')} className="text-primary underline cursor-pointer">Click here</span></p>
            }
         
        </div>
    </form>
  )
}

export default Login