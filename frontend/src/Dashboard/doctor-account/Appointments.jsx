import { useState } from 'react';
import { formateDate } from "../../utils/formateDate";
import {token} from "../../config.js"
const Appointments = ({ appointments }) => {
    const [appointmentList, setAppointmentList] = useState(appointments);

    const updateStatus = async (id, newStatus, newIsPaid) => {
        
        try {
            const response = await fetch(`http://localhost:5000/api/v1/doctors/appointments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus, isPaid: newIsPaid })
            });

            if (response.ok) {
                const updatedAppointment = await response.json();
                console.log('Updated appointment:', updatedAppointment);
                setAppointmentList(prevState =>
                    prevState.map(item =>
                        item._id === id ? { ...item, status: updatedAppointment.data.status, isPaid: updatedAppointment.data.isPaid } : item
                    )
                );
            } else {
                console.error('Failed to update status');
                console.log('Update status called with ID:', id);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Tên</th>
                    <th scope="col" className="px-6 py-3">Giới tính</th>
                    <th scope="col" className="px-6 py-3">Thanh toán</th>
                    <th scope="col" className="px-6 py-3">Giá tiền</th>
                    <th scope="col" className="px-6 py-3">Thời gian</th>
                    <th scope="col" className="px-6 py-3">Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {appointmentList.map((item) => (
                    <tr key={item._id}>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                            <img src={item.user.photo} className="w-10 h-10 rounded-full" alt="" />
                            <div className="pl-3">
                                <div className="text-base font-semibold">
                                    {item.user.name}
                                </div>
                                <div className="text-normal text-gray-500">
                                    {item.user.email}
                                </div>
                            </div>
                        </th>
                        <td className="px-6 py-4">{item.user.gender}</td>
                        <td className="px-6 py-4">
                            <button onClick={() => {
                                console.log('Payment status button clicked for ID:', item._id);
                                updateStatus(item._id, item.status, !item.isPaid);
                            }} className="flex items-center">
                                <div className={`mr-2 h-2.5 w-2.5 rounded-full ${item.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                {item.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                            </button>
                        </td>
                        <td className="px-6 py-4">{item.ticketPrice}</td>
                        <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
                        <td className="px-6 py-4">
                            <button
                                onClick={() => {
                                    console.log('Status button clicked for ID:', item._id);
                                    const newStatus = item.status === 'pending' ? 'approved' : item.status === 'approved' ? 'cancelled' : 'pending';
                                    updateStatus(item._id, newStatus, item.isPaid);
                                }}
                                className={`px-4 py-2 rounded-full text-white 
                                ${item.status === 'pending' ? 'bg-blue-500' : item.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}
                            >
                                {item.status === 'pending' ? 'Đang chờ' : item.status === 'approved' ? 'Đã duyệt' : 'Đã hủy'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Appointments;
