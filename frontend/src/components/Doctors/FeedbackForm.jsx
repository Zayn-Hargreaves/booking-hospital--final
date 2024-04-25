import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { token } from "../../config";
import { toast } from "react-toastify"
import HashLoader from "react-spinners/HashLoader";
const FeedbackForm = () => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!rating || !reviewText) {
                setLoading(false);
                toast.error("Yêu cầu nhập đánh giá và nhận xét");
            }
    
            const res = await fetch(`http://localhost:5000/api/v1/doctors/${id}/reviews`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ rating, reviewText }),
            });
            console.log(res)
            const result = await res.json();
    
            if (!res.ok) {
                throw new Error(result.message);
            }
    
            setLoading(false);
            toast.success(result.message);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };
    
    return (
        <form action="">
            <div>
                <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
                    Bạn thấy trải nghiệm tổng thể như thế nào ?
                </h3>
                <div>
                    {[...Array(5).keys()].map((_, index) => {
                        index += 1
                        return (
                            <button
                                key={index}
                                type="button"
                                className={`${index <= ((rating && hover) || hover)
                                    ? "text-yellowColor"
                                    : "text-gray-400"
                                    } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                                onDoubleClick={() => {
                                    setHover(0)
                                    setRating(0)
                                }}
                            >
                                <span>
                                    <AiFillStar />
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className="mt-[30px]">
                <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
                    Hãy đưa ra nhận xét để giúp chúng tôi nâng cao chât lượng dịch vụ
                </h3>
                <textarea className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md" rows="5" placeholder="Hãy để lại ý kiến của bạn"
                    onChange={(e) => setReviewText(e.target.value)}></textarea>
                <button type="submit" onClick={handleSubmitReview} className="btn" >{loading ? <HashLoader size={25} color="#fff" /> : "Đăng tải ý kiến"}</button>
            </div>
        </form>
    )
}
export default FeedbackForm