import React, { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import MyBookings from "./MyBooking";
import Profiles from "./Profiles";
import {token} from "../../config.js"
import useGetProfile from "../../hooks/useFetchData.js"
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx"
const MyAccount = () => {
    const { dispatch } = useContext(authContext)
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
    const { data: userData, loading, error } = useGetProfile(`https://booking-hospital-final.onrender.com/api/v1/users/profile/me`)
    const [tab, setTab] = useState('bookings')
    const handleDeleteAcount = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tài khoản không?");
        if (confirmDelete) {
            try {
                const response = await fetch(`https://booking-hospital-final.onrender.com/api/v1/users/${userData._id}`, {
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
        <section>
            <div className="max-w-[1170px] px5 mx-auto">
                {loading && <Loading/>}
                {error && <Error errorMess={error}/>}
                {
                    !loading && !error &&(
                        <div className="grid md:grid-cols-3 gap-10">
                            <div className="pb-[50px] px-[30px] round-md">
                                <div className="flex items-center justify-center ">
                                    <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                                        <img src={userData.photo} alt="" className="w-full h-full rounded-full" />
                                    </figure>
                                </div>
                                <div className="text-center mt-4">
                                    <h3 className="text[18px] leading-[30px] text-headingColor font-bold">
                                        {userData.name}
                                    </h3>
                                    <p className="text-textColor text-[15px] leading-6 font-medium">
                                        {userData.email}
                                    </p>
                                    <p className="text-textColor text-[15px] leading-6 font-medium">
                                        Nhóm máu:{" "}
                                        <span className="ml-2 text-headingColor text-[22px] leading-8">
                                            {userData.bloodType}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-[50px] md:mt-[100px]">
                                    <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">Đăng xuất</button>
                                    <button onClick={handleDeleteAcount} className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">Xoá tài khoản</button>
                                </div>
                            </div>
                            <div className="md:col-span-2 md:px-[30px]">
                                <div>
                                    <button onClick={() => setTab('bookings')} className={`${tab === "bookings" && "bg-primaryColor text-white font-normal"} text-[16px] p-2 mr-5 px-5 rounded-md text-headingColor font-semibold leading-7 border border-solid border-primaryColor`}>Lịch hẹn của tôi</button>
                                    <button onClick={() => setTab('settings')} className={`${tab === "settings" && "bg-primaryColor text-white font-normal"} text-[16px] p-2 mr-5 px-5 rounded-md text-headingColor font-semibold leading-7 border border-solid border-primaryColor`}>Cài đặt thông tin cá nhân</button>

                                </div>
                                {
                                    tab === "bookings" && <MyBookings />
                                }
                                {
                                    tab === "settings" && <Profiles user ={userData}   />
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
export default MyAccount;