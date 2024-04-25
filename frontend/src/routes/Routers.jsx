import React from "react";
import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import SignUp from "../pages/Signup"
import Doctors from "../components/Doctors/Doctors"
import DoctorDetails from "../components/Doctors/DoctorDetails";
import {Routes, Route} from "react-router-dom"
import Services from "../pages/Services";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRouter from "./ProtectedRouter";
import CheckoutSuccess from "../components/Doctors/CheckoutSuccess";
const Routers =() =>{
    return <Routes>
        <Route path="/" element={<Home/>}>Trang chủ</Route>
        <Route path="/home" element={<Home/>}>Trang chủ</Route>
        <Route path="/doctors" element={<Doctors/>}>Bác sĩ</Route>
        <Route path='/doctors/:id' element={<DoctorDetails/>}>Thông tin bác sĩ</Route>
        <Route path="/login" element={<Login/>}>Đăng nhập</Route>
        <Route path="/register" element={<SignUp/>}>Đăng ký</Route>
        <Route path="/contact" element={<Contact/>}>Liên hệ</Route>
        <Route path="/services" element={<Services/>}>Các dịch vụ</Route>
        <Route path="/checkout-success" element={<CheckoutSuccess/>}></Route>
        <Route path="/users/profile/me" element={<ProtectedRouter allowRoles={['patient']}><MyAccount/></ProtectedRouter>}>Tài khoản của tôi</Route>
        <Route path="/doctors/profile/me" element={<ProtectedRouter allowRoles={['doctor']}><Dashboard/></ProtectedRouter>}>Tài khoản của tôi</Route>
    
    </Routes>
}
export default Routers;