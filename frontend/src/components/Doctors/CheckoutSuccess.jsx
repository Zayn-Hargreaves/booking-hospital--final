import {Link} from "react-router-dom"
const CheckoutSuccess = () =>{
    return (
        <div className=" bg-gray-100 h-screen ">
            <div className=" bg-white p-6 md:mx-auto ">
                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className="text-green-600 w-16 h-16 mx-auto my-6" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 10L12.2581 12.4436C12.6766 12.7574 13.2662 12.6957 13.6107 12.3021L20 5" stroke="#16a34a" stroke-linecap="round"></path> <path d="M21 12C21 13.8805 20.411 15.7137 19.3156 17.2423C18.2203 18.7709 16.6736 19.9179 14.893 20.5224C13.1123 21.1268 11.187 21.1583 9.38744 20.6125C7.58792 20.0666 6.00459 18.9707 4.85982 17.4789C3.71505 15.987 3.06635 14.174 3.00482 12.2945C2.94329 10.415 3.47203 8.56344 4.51677 6.99987C5.56152 5.4363 7.06979 4.23925 8.82975 3.57685C10.5897 2.91444 12.513 2.81996 14.3294 3.30667" stroke="#16a34a" stroke-linecap="round"></path> </g></svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Thanh toán thành công!
                    </h3>
                    <p className=" text-gray-600 my-2">
                        Cảm ơn bạn đã sử dụng chức năng thanh toán online của chúng tôi
                    </p>
                    <p>Chúc bạn một ngày tốt lành</p>
                    <div className="py-10 text-center">
                        <Link to="/home" className="px-12 bg-buttonBgColor text-white font-semibold py-3">
                            Trở về trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckoutSuccess;