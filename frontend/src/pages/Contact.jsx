import React from "react";
const Contact = ()=>{
    return(
        <section>
            <div className="px-4 mx-auto max-w-screen-md">
                <h2 className="heading text-center">Liên hệ chúng tôi</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text__para">
                Nếu bạn gặp vấn đề kỹ thuật hoặc muốn gửi phản hồi về một tính năng beta, có một số cách để bạn thông báo cho chúng tôi
                </p>
                <form action="#"className="space-y-8">
                    <div>
                        <label htmlFor="email" className="form__label">
                            Email của bạn
                        </label>
                        <input type="email" 
                            id="email"
                            placeholder="nguyenvana@gmail.com"
                            className="form__input mt-1 rounded-[10px]"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="form__label">
                            Vấn đề thắc mắc
                        </label>
                        <input type="text" 
                            id="subject"
                            placeholder="Hãy cho tôi biết bạn cần giúp gì"
                            className="form__input mt-1 rounded-[10px]"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="form__label">
                            Điều bạn muốn nhắn nhủ với chúng tôi
                        </label>
                        <textarea 
                            rows="6"
                            type="text" 
                            id="message"
                            placeholder="Để lại bình luận của bạn"
                            className="form__input mt-1 rounded-[10px]"
                        />
                    </div>
                    <button type="submit" className="btn rounded sm:w-fit">Đăng</button>
                </form>
            </div>
        </section>
    )
}
export default Contact