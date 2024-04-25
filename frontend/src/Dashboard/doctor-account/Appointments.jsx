import { formateDate } from "../../utils/formateDate";
const Appointments = ({ appointments }) => {
    return (
        <table className=" w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Tên</th>
                    <th scope="col" className="px-6 py-3">Giới tính</th>
                    <th scope="col" className="px-6 py-3">Thanh toán</th>
                    <th scope="col" className="px-6 py-3">Giá tiền</th>
                    <th scope="col" className="px-6 py-3">Thời gian</th>

                </tr>
            </thead>
            <tbody>
                {appointments?.map((item) => (
                    <tr key={item._id}>
                        <th scope="row" className=" flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                            <img src={item.user.photo} className="w-10 h-10 rounded-full" alt="" />
                            <div className="pl-3">
                                <div className=" text-base font-semibold">
                                    {item.user.name}
                                </div>
                                <div className=" text-nomal text-gray-500 ">
                                    {item.user.email}
                                </div>
                            </div>
                        </th>
                        <td className=" px-6 py-4 ">{item.user.gender}</td>
                        <td className=" px-6 py-4 ">{item.isPaid && (
                            <div className=" flex items-center">
                                <div className=" mr-2 h-2.5 w-2.5 rounded-full bg-green-500">Đã thanh toán</div>
                            </div>
                        )}
                        {!item.isPaid && (
                            <div className=" flex items-center">
                                <div className=" mr-2 h-2.5 w-2.5 rounded-full bg-red-500">Chưa thanh toán</div>
                            </div>
                        )}
                        </td>
                        <td className=" px-6 py-4 ">{item.ticketPrice}</td>
                        <td className=" px-6 py-4 ">{formateDate(item.createdAt)}</td>

                    </tr>))}
            </tbody>
        </table>
    )
}
export default Appointments