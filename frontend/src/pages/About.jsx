import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p className="text-blue-400">ABOUT <span className="text-blue-700 font-semibold ">US</span></p>
        </div>
        <div className="my-10 flex flex-col md:flex-row gap-12">
          <img src={assets.about_image} alt="" className="w-full md:max-w-80 " />
          <div className="flex flex-col justify-center items-start gap-6 md:w-2/4 text-sm text-gray-600">
            <p className="">Our platform is designed to make healthcare access simple and convenient for everyone. We help patients connect with trusted and experienced doctors through an easy online appointment booking system.</p>
            <p className="">With our smart scheduling system, users can quickly find the right specialist, book appointments, and manage their healthcare journey anytime and anywhere.</p>
            <b className="text-blue-500 text-xl">Our <span className="text-xl text-blue-800">Vision</span></b>
            <p className="">We aim to improve healthcare accessibility by providing a seamless digital experience for booking doctor appointments. Our mission is to save patients’ time while ensuring reliable and efficient medical consultation services.</p>
          
        </div>
      </div>

      <div className="text-xl my-4">
        <p className="text-blue-500">WHY <span className="text-blue-800 font-semibold"> CHOOSE US</span></p>

      </div>
      <div className="flex flex-col md:flex-row mb-20 gap-5  ">
         <div className="border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-500 text-gray-600 cursor-pointer rounded-md">
          <b className="">Efficiency:</b>
          <p className="">Quick and streamlined appointment booking that saves time for both patients and doctors.</p>
         </div>

         <div className="border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-500 text-gray-600 cursor-pointer rounded-md">
          <b className="">Convenience:</b>
          <p className="">Book doctor appointments anytime and anywhere with an easy-to-use online platform.</p>
         </div>

         <div className="border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-500 text-gray-600 cursor-pointer rounded-md">
          <b className="">Personalization:</b>
          <p className="">Get healthcare recommendations and appointment options tailored to your needs.</p>
         </div>


      </div>
    </div>
  )
}

export default About