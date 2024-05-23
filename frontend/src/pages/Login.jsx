import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { authContext } from "../context/AuthContext.jsx"
import HashLoader from "react-spinners/HashLoader.js"
import LoginImg from "../assets/images/LoginImg.jpg"
const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(authContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message)
            }
            dispatch(
                {
                    type: "LOGIN_SUCCESS",
                    payload: {
                        user: result.data,
                        token: result.token,
                        role: result.role,
                    },
                }
            )
            console.log(result, "login data")
            setLoading(false)
            toast.success(result.message)
            navigate('/home')
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }
    return (
        <div className="w-full h-screen flex items-start">
            <div className="relative w-1/2 h-full flex flex-col">
                <div className="absolute top-[20%] left-[10%] flex flex-col">
                    <h1 className=" text-4xl text-irisBlueColor font-bold my-4">Turn your Ideals into reality</h1>
                </div>
                <img src={LoginImg} className="w-full h-full object-cover " />
            </div>
            <div className=" w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center ">
                <h1 className=" text-xl text-[#060606] font-semibold mr-auto">Booking Hospital</h1>
                <div className="w-full flex flex-col max-w-[550px]">
                    <div className="w-full flex flex-col mb-10">
                        <h3 className=" text-3xl font-semibold mb-4">Đăng Nhập</h3>
                        <p className="text-base mb-2">Hãy nhập thông tin của bạn để đăng nhập</p>
                    </div>
                    <form className="py-4 md:py-0" onSubmit={submitHandler}>
                        <div className="mb-5">
                            <input
                                type="email"
                                name="email"
                                placeholder="Hãy điền email của bạn"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                    placeholder:text-textColor rounded-md cursor-pointer"
                                required />
                        </div>
                        <div className="mb-5">
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                    placeholder:text-textColor cursor-pointer"
                                required />
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <div className="w-full flex items-center">
                                <input type="checkbox" className="w-4 h-4 mr-2" />
                                <p className=" text-sm">Remember me</p>
                            </div>
                            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Quên mật khẩu?</p>
                        </div>

                        <div className="mt-7">
                            <button type="submit" className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                                {loading ? (<HashLoader size={25} color="#ffffff" />) : ('Đăng nhập')}
                            </button>
                        </div>
                        <div className="mt-7">

                        </div>
                        <p className="mt-5 text-textColor text-center">
                            Bạn có tài khoản chưa ? <Link to="/register" className="text-primaryColor font-medium ml-1">Đăng ký</Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login