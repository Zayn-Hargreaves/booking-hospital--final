import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpImg from "../assets/images/signup.gif"
import uploadImageToCloudinary from "../utils/uploadCloudinary.js";
import {toast} from 'react-toastify'
import HashLoader from "react-spinners/HashLoader.js"
const Signup = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photo: selectedFile,
        gender: '',
        role: 'patient'
    })
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const data = await uploadImageToCloudinary(file)
        setPreviewURL(data.url)
        setSelectedFile(data.url)
        setFormData({ ...formData, photo:data.url})
    }
    
    const submitHandler = async (event) =>{
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/v1/auth/register`,{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            console.log(res)
            const{message} = await res.json()
            if(!res.ok){
                throw new Error(message)
            }
            console.log("loi o day")
            setLoading(false)
            toast.success(message)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }
    return <section className="px-5 xl:px-0">
        <div className="max-w-[1170px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* img box */}
                <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                    <figure className="rounded-l-lg">
                        <img src={SignUpImg} alt="" className="w-full round-l-lg" />
                    </figure>
                </div>

                {/*  signup form*/}
                <div className=" rounded-l-lg lg:pl-16 py-10">
                    <h3 className="text-headingColor text-[22px] leading-9 font-bold md-10">
                        Tạo <span className="text-primaryColor">Tài khoản</span>
                    </h3>
                    <form onSubmit={submitHandler}>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="name"
                                placeholder="Hãy điền tên của bạn"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                              placeholder:text-textColor rounded-md cursor-pointer"
                                required />
                        </div>
                        <div className="mb-5">
                            <input
                                type="email"
                                name="email"
                                placeholder="Hãy điền email của bạn"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                              placeholder:text-textColor rounded-md cursor-pointer"
                                required />
                        </div>
                        <div className="mb-5">
                            <input
                                type="password"
                                name="password"
                                placeholder="Hãy điền mật khẩu của bạn"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                              placeholder:text-textColor rounded-md cursor-pointer"
                                required />
                        </div>
                        <div className="mb-5 flex items-center justify-between">
                            <label htmlFor="" className="text-headingColor font-bold text-[16px] leading-7">
                                Bạn là:
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                                    <option value="patient">Bệnh nhân</option>
                                    <option value="doctor">Bác sĩ</option>
                                </select>
                            </label>
                            <label htmlFor="" className="text-headingColor font-bold text-[16px] leading-7">
                                Giới tính:
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                                    <option value="" >------Chọn-----</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                </select>
                            </label>
                        </div>
                        <div className="mb-5 flex items-center gap-3">
                            {selectedFile && (
                                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                                    <img src={previewURL} alt="" className="w-full rounded-full" />
                                </figure>
                            )}

                            <div className="relative w-[130px] h-[50px]">
                                <input className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer rounded-full" type="file" name="photo" onChange={handleFileInputChange}
                                    id="customFile" accept=".jpg, .png" />
                                <label className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer" htmlFor="customFile">Upload ảnh</label>
                            </div>
                        </div>
                        <div className="mt-7">
                            <button disabled={loading && true} type="submit" className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                                {loading ? (<HashLoader size={35} color="#ffffff" />) : ('Đăng ký')}
                            </button>
                        </div>
                    </form>
                    <p className="mt-5 text-textColor text-center">
                        Bạn có tài khoản chưa ? <Link to="/login" className="text-primaryColor font-medium ml-1">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    </section>
}
export default Signup