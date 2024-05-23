import React, { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi"
import { authContext } from "../../context/AuthContext"
import {useNavigate} from "react-router-dom"
import {token} from "../../config.js"
import Error from "../../components/Error/Error.jsx"
const Tabs = ({ tab, setTab }) => {
    const {dispatch} = useContext(authContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        navigate('/')
    }
    const handleDeleteAcount = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tài khoản không?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/users/${userData._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add authorization header if needed
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    dispatch({ type: "LOGOUT" });
                } else {
                    throw new Error('Failed to delete account');
                }

                // For demonstration purpose, dispatching logout directly
                dispatch({ type: "LOGOUT" });

            } catch (error) {
                console.error("Failed to delete account:", error);
                // Handle error appropriately, e.g., show error message
            }
        }
    };
    return (
        <div >
            <span className="lg:hidden">
                <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
            <div className=" hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
                <button onClick={() => setTab('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>Tổng quan</button>
                <button onClick={() => setTab('appointments')} className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>Lịch khám</button>
                <button onClick={() => setTab('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>Cài đặt thông tin cá nhân</button>
                <div className="mt-[100px] w-full">
                    <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">Đăng xuất</button>
                    <button onClick={handleDeleteAcount} className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">Xoá tài khoản</button>
                </div>
            </div>
        </div>
    )
}
export default Tabs