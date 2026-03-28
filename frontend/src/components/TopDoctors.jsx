import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 py-16 my-16 md:mx-10 text-gray-800">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through extensive list of trusted doctors.{" "}
      </p>
      <div className="w-full grid lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 grid-cols-2 gap-4 pt-5 gap-y-6 px-3sm:px-0 ">
        {doctors.slice(0,10).map((item,index) => (
          <div
            onClick={() => {navigate(`/appointments/${item._id}`);scrollTo(0,0)}}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-700"
            key={index}
            // to={`/doctors/${item.speciality}`}
          >
            <img src={item.image} alt="" className="bg-blue-50 " />
            <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center">
  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></p>
  <p>{item.available ? 'Available' : 'Not Available'}</p>
</div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm ">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0,0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
