import React from "react";
import aboutImg from "../assets/images/about.png"
import aboutCardImg from "../assets/images/about-card.png"
import { Link } from "react-router-dom";
const About = () =>{
    return <section>
        <div className="container">
            <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                <div className=" relative w-3/4 lg:-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                    <img src={aboutImg} alt="anh" />
                    <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                        <img src={aboutCardImg} alt="anh" />
                    </div>
                </div>
                <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                    <h2 className="heading">Tự hào là một trong những đơn vị hàng đầu của quốc gia.</h2>
                    <p className="text__para">
                    Trong suốt 30 năm liên tiếp, Bộ y tế đã công nhận chúng tôi là một trong những bệnh viện công tốt nhất tại Hà Nội.
                    </p>
                    <p className="text__para mt-[30px]">Sự xuất sắc là mục tiêu mà chúng tôi luôn cố gắng đạt được từng ngày, chăm sóc cho bệnh nhân của chúng tôi - không nhìn lại những thành tựu đã đạt được, mà hướng tới những gì chúng tôi có thể làm vào ngày mai. Cung cấp chăm sóc tốt nhất có thể.</p>
                    <Link to="/">
                        <button className="btn">Tìm hiểu thêm</button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
}
export default About;