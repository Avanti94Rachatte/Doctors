import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppoinments from './pages/MyAppoinments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Receipt from './pages/Receipt';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-appointments' element={<MyAppoinments/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/appointments/:docId' element={<Appointment/>} />
        <Route path="/receipt/:appointmentId" element={<Receipt />} />
      </Routes>

     <Footer/>


    </div>
  )
}

export default App