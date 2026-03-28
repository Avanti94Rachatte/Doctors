import React from 'react'
import {assets} from '../assets/assets_frontend/assets'
const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
        {/* ----left side----- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vm] md:-mb-7.5">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
                Book Appointment <br /> With Trusted Doctors
            </p>
            <div className="flex flex-col md:flex-row items-start gap-3 text-white text-light">
                <img src={assets.group_profiles} alt="" className="w-28" />
                <p className="hidden sm:block">
                    Simple browse through our extensive list of trusted doctors, <br /> select the one that suits your needs, and book an appointment with ease.
                </p>
            </div>
            <a href="#speciality" className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transitionto-all duration-700">Book appointment
                <img src={assets.arrow_icon} alt="" className="w-3" />
            </a>
        </div>
        {/* ----right side----- */}
        <div className="md:w-1/2 relative">
            <img src={assets.header_img} alt="" className="w-full md:absolute bottom-0 h-auto rounded-lg" />
            <p className=""></p>
        </div>
    </div>
  )
}

export default Header