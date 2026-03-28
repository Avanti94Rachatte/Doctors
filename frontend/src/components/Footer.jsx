import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
           <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            {/* Left Section */}
            <div className="">
              <img src={assets.logo} alt="" className="mb-5 w-40" />
              <div className="w-full md:w-2/3 text-gray-600 leading-6">Your health is our priority.
                <p className="">Helping you connect with trusted doctors anytime, anywhere.</p>
                    Book appointments easily and manage your health with confidence.</div>
            </div>


            {/* Center Section */}
            <div className="">
                 <p className="text-xl font-medium mb-5">COMPANY</p>
                 <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="">Home</li>
                    <li className="">About us</li>
                    <li className="">Contact us</li>
                    <li className="">Privacy Policy</li>
                 </ul>
            </div>


            {/* Right Section */}
            <div className="">
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                <li className="">+223 234234234</li>
                <li className="">hellodoctor@gmail.com</li>
                </ul>
                
            </div>
           </div>
          
            {/* Copyright Text */}
            <div className="">
            <hr className="" />
            <p className="py-5 text-sm text-center">Copyright 2026@ Prescripto - Avanti </p>
           </div>
           
    </div>
  )
}

export default Footer