import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className=''>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p className="text-blue-400">CONTACT <span className="text-blue-700 font-semibold ">US</span></p>
      
      </div>
       <div className="my-10 flex flex-col justify-center items-center md:flex-row gap-20 mb-28 text-sm ">
               
               <img src={assets.contact_image} alt="" className="w-100 sm:w-80 " />
            
               <div className="flex flex-col justify-center items-start gap-6 md:w-2/4 text-sm text-gray-600">
                <p className="text-blue-600 text-lg font-semibold">OUR <span className="font-bold text-lg text-blue-800">OFFICE</span></p>
               <p className="text-gray-500">HealthCare Connect Pvt. Ltd. <br /> 2nd Floor, Sunrise Business Park, <br />MG Road, Aurangabad, Maharashtra – 431001, India</p>
               <p className="text-gray-500">Tel: (+91) 98765 43210 <br />Email: hellodoctor@gmail.com </p>
               <p className="">Need help or have any concerns?<br /> Contact us anytime for support and healthcare assistance.</p>
               <p className="font-semibold text-lg text-blue-600">Careers at <span className="font-bold text-lg text-blue-800">PRESCRIPTO</span> </p>
               <p className="text-gray-500">Learn more about our teams and job openings.</p>
               <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer rounded-md">Explore Jobs</button>
             </div>
           </div>

    
    </div>
  )
}

export default Contact