import React from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import PatientAvatar from "../../assets/images/avatar-icon.png"
import { HiStar } from "react-icons/hi"
const Testimonial = () => {
    return (
        <div className=" mt-[30px] lg:mt-[55px]">
            <Swiper modules={{ Pagination }} spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    }
                }}>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={PatientAvatar} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">Bùi Đức Cảnh</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                Tôi đã sử dụng dịch vụ y tế từ họ. Họ điều trị rất tốt và cung cấp dịch vụ y tế tốt nhất
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={PatientAvatar} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">Nghiêm Xuân Tú</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                Tôi đã sử dụng dịch vụ y tế từ họ. Họ điều trị rất tốt và cung cấp dịch vụ y tế tốt nhất
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={PatientAvatar} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">Vũ Hoàng Việt</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                Tôi đã sử dụng dịch vụ y tế từ họ. Họ điều trị rất tốt và cung cấp dịch vụ y tế tốt nhất
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={PatientAvatar} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">Mạc Hồng Quân</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                Tôi đã sử dụng dịch vụ y tế từ họ. Họ điều trị rất tốt và cung cấp dịch vụ y tế tốt nhất
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={PatientAvatar} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">Vũ Minh Tuấn</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                Tôi đã sử dụng dịch vụ y tế từ họ. Họ điều trị rất tốt và cung cấp dịch vụ y tế tốt nhất
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={PatientAvatar} alt="" />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">Lê Hồng Sơn</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                Tôi đã sử dụng dịch vụ y tế từ họ. Họ điều trị rất tốt và cung cấp dịch vụ y tế tốt nhất
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
export default Testimonial