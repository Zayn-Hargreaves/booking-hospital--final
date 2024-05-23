import React, { useEffect, useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js"
import { token } from "../../config.js"
import { toast } from "react-toastify"
const Profile = ({ doctorData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: "",
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [
            {},
        ],
        experiences: [{}],
        timeSlots: [{}],
        about: '',
        photo: null
    })
    useEffect(() => {
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender:doctorData?.gender,
            specialization: doctorData?.specialization,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualifications ,
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo
        })
    }, [])
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const data = await uploadImageToCloudinary(file);
            setFormData({ ...formData, photo: data.url });
            console.log(data);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const addItem = (key, item) => {
        setFormData((prevFormData) => ({ ...prevFormData, [key]: [...prevFormData[key], item] }));
    };

    const handleReusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            const updatedItems = [...prevFormData[key]];
            updatedItems[index][name] = value;
            return {
                ...prevFormData,
                [key]: updatedItems,
            };
        });
    };

    const deleteItem = (key, index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: prevFormData[key].filter((_, i) => i !== index),
        }));
    };
    const updateProfileHandler = async (e) => {
        e.preventDefault();
        // Logic to update profile
        try {
            const res = await fetch(`http://localhost:5000/api/v1/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            const result = await res.json()

            if (!res.ok) {
                throw Error(result.message)
            }
            toast.success(result.message)
        } catch (error) {
            toast.error(error.message)
        }
    };
    const addQualification = (e) => {
        e.preventDefault();
        addItem("qualifications", {
            startingDate: "",
            endingDate: "",
            degree: "",
            university: "",
        });
    };

    const handleQualificationChange = (event, index) => {
        handleReusableInputChangeFunc("qualifications", index, event);
    };

    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem("qualifications", index);
    };

    const addExperience = (e) => {
        e.preventDefault();
        addItem('experiences', { day: "", startingTime: "", endingTime: "" })
    };


    const handleExperienceChange = (event, index) => {
        handleReusableInputChangeFunc("experiences", index, event);
    };

    const deleteExperience = (e, index) => {
        e.preventDefault();
        deleteItem("experiences", index);
    };
    const addTimeSlot = (e) => {
        e.preventDefault();
        addItem("timeSlots", { day: "", startingTime: "", endingTime: "" });
    };


    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChangeFunc("timeSlots", index, event);
    };

    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItem("timeSlots", index);
    };
    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Thông tin cá nhân
            </h2>
            <form>
                <div className="mb-5">
                    <p className="form__lable">Tên:</p>
                    <input type="text" name="name" value={formData.name} placeholder="Họ và tên" className="form__input" onChange={handleInputChange} />
                </div>
                <div className="mb-5">
                    <p className="form__lable">Email:</p>
                    <input type="text" name="email" value={formData.email} placeholder="Email" className="form__input" onChange={handleInputChange} readOnly aria- disabled="true" />
                </div>
                <div className="mb-5">
                    <p className="form__lable">Số điện thoại:</p>
                    <input type="text" name="phone" value={formData.phone} placeholder="Số điện thoại" className="form__input" onChange={handleInputChange} />
                </div>
                <div className="mb-5">
                    <p className="form__lable">Bio:</p>
                    <input type="text" name="bio" value={formData.bio} placeholder="Bio" className="form__input" maxLength={100} onChange={handleInputChange} />
                </div>
                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]" >
                        <div>
                            <p className="form__lable">Giới tính:</p>
                            <select name="gender" value={formData.gender} className="form__input py-3.5" onChange={handleInputChange}>
                                <option value="">---------------Chọn---------------</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__lable">Chuyên khoa:</p>
                            <select name="specialization" value={formData.specialization} className="form__input py-3.5" onChange={handleInputChange}>
                                <option value="">---------------Chọn---------------</option>
                                <option value="Bác sĩ phẫu thuật">Bác sĩ phẫu thuật</option>
                                <option value="Bác sĩ thần kinh học">Bác sĩ thần kinh học</option>
                                <option value="Bác sĩ da liễu">Bác sĩ da liễu</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__lable">giá:</p>
                            <input type="number" name="ticketPrice" value={formData.ticketPrice} placeholder="1.000.000 VND" className="form__input" onChange={handleInputChange} />
                        </div>
                        <div className="mb-5">

                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <p className="form__label">Chứng chỉ/Bằng cấp:</p>
                    {formData.qualifications.map((item, index) => (<div key={index}>
                        <div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form__lable">Ngày bắt đâu:</p>
                                    <input type="date" name="startingDate" value={item.startingDate} className="form__input" onChange={e => handleQualificationChange(e, index)} />
                                </div>
                                <div>
                                    <p className="form__lable">Ngày kết thúc:</p>
                                    <input type="date" name="endingDate" value={item.endingDate} className="form__input" onChange={e => handleQualificationChange(e, index)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__lable">Chứng chỉ:</p>
                                    <input type="text" name="degree" value={item.degree} className="form__input" onChange={e => handleQualificationChange(e, index)} />
                                </div>
                                <div>
                                    <p className="form__lable">Trường:</p>
                                    <input type="text" name="university" value={item.university} className="form__input" onChange={e => handleQualificationChange(e, index)} />
                                </div>
                            </div>
                            <button onClick={(e) => deleteQualification(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"><AiOutlineDelete /></button>
                        </div>
                    </div>))}
                    <button onClick={addQualification} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Thêm chứng chỉ</button>
                </div>
                <div className="mb-5">
                    <p className="form__label">Kinh nghiệm:</p>
                    {formData.experiences.map((item, index) => (<div key={index}>
                        <div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form__lable">Ngày bắt đâu:</p>
                                    <input type="date" name="startingDate" value={item.startingDate} className="form__input" onChange={e => handleExperienceChange(e, index)} />
                                </div>
                                <div>
                                    <p className="form__lable">Ngày kết thúc:</p>
                                    <input type="date" name="endingDate" value={item.endingDate} className="form__input" onChange={e => handleExperienceChange(e, index)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__lable">Chức vụ:</p>
                                    <input type="text" name="position" value={item.position} className="form__input" onChange={e => handleExperienceChange(e, index)} />
                                </div>
                                <div>
                                    <p className="form__lable">Bệnh viện:</p>
                                    <input type="text" name="hospital" value={item.hospital} className="form__input" onChange={e => handleExperienceChange(e, index)} />
                                </div>
                            </div>
                            <button onClick={e => deleteExperience(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"><AiOutlineDelete /></button>
                        </div>
                    </div>))}
                    <button onClick={addExperience} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Thêm nơi làm việc</button>
                </div>
                <div className="mb-5">
                    <p className="form__label">Ca làm việc:</p>
                    {formData.timeSlots.map((item, index) => (<div key={index}>
                        <div>
                            <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                <div>
                                    <p className="form__lable">Ngày:</p>
                                    <select name="day" value={item.day} className="form__input py-3.5" onChange={e => handleTimeSlotChange(e, index)}>
                                        <option value="">----Chọn----</option>
                                        <option value="saturday">Thứ bảy</option>
                                        <option value="sunday">Chủ nhật</option>
                                        <option value="monday">Thứ hai</option>
                                        <option value="tuesday">Thứ ba</option>
                                        <option value="wenesday">Thứ tư</option>
                                        <option value="thurday">Thứ năm</option>
                                        <option value="friday">Thứ sáu</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="form__lable">Giờ bắt đầu:</p>
                                    <input type="time" name="startingTime" value={item.startingTime} className="form__input" onChange={e => handleTimeSlotChange(e, index)} />
                                </div>
                                <div>
                                    <p className="form__lable">Giờ kết thúc:</p>
                                    <input type="time" name="endingTime" value={item.endingTime} className="form__input" onChange={e => handleTimeSlotChange(e, index)} />
                                </div>
                                <div className="flex item-center">
                                    <button onClick={e => deleteTimeSlot(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 mb-[30px] cursor-pointer"><AiOutlineDelete /></button>
                                </div>
                            </div>
                        </div>
                    </div>))}
                    <button onClick={addTimeSlot} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Thêm ca làm việc</button>
                </div>
                <div className="mb-5">
                    <p className="form__label">About</p>
                    <textarea name="about" rows={5} value={formData.about} placeholder="viết gì đó về bạn" onChange={handleInputChange} className="form__input"></textarea>
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
                    <button className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 round-l" type="submit" onClick={updateProfileHandler}>Cập nhật thông tin</button>
                </div>
            </form>
        </div>
    )
}
export default Profile