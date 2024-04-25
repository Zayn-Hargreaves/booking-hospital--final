import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import {toast} from 'react-toastify'
import HashLoader from "react-spinners/HashLoader.js"
import {token} from "../../config.js"
const Profiles = ({user}) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photo: null,
        gender: '',
        bloodType:'',
    })
    const navigate = useNavigate();
    useEffect(()=>{
        setFormData({name:user.name, email:user.email, password:user.password,photo:user.photo, gender:user.gender, bloodType:user.bloodType })
    },[user])
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const data = await uploadImageToCloudinary(file)
        setSelectedFile(data.url)
        setFormData({ ...formData, photo:data.url})
    }
    
    const submitHandler = async (event) =>{
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`https://booking-hospital-final.onrender.com/api/v1/users/${user._id}`,{
                method:'put',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify(formData)
            })
            console.log(res)
            const{message} = await res.json()
            if(!res.ok){
                throw new Error(message)
            }
            setLoading(false)
            toast.success(message)
            navigate('/users/profile/me')
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }
    return (
        <div className="mt-10">
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
                        />
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        name="bloodType"
                        placeholder="Hãy điền nhóm máu của bạn"
                        value={formData.bloodType}
                        onChange={handleInputChange}
                        className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                              placeholder:text-textColor rounded-md cursor-pointer"
                        required />
                </div>
                <div className="mb-5 flex items-center justify-between">

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
                    {formData.photo && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img src={formData.photo} alt="" className="w-full rounded-full" />
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
                        {loading ? (<HashLoader size={25} color="#ffffff" />) : ('Cập nhật')}
                    </button>
                </div>
            </form>
            <p className="mt-5 text-textColor text-center">
                Bạn có tài khoản chưa ? <Link to="/login" className="text-primaryColor font-medium ml-1">Đăng nhập</Link>
            </p>
        </div>
    )
}
export default Profiles;