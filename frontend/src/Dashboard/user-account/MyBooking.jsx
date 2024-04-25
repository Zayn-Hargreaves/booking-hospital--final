import useFetchData from "../../hooks/useFetchData"
import DoctorCard from "../../components/Doctors/DoctorCard"
import Loading from "../../components/Loader/Loading"
import Error from "../../components/Error/Error"
const MyBookings = () => {
    const { data: appointments, loading, error } = useFetchData(`http://localhost:5000/api/v1/users/appointments/my-appointments`)
    return <div>
        {loading && <Loading />}
        {error && <Error errorMess={error} />}
        {!loading &&!error && (
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {appointments.map(doctor =>{
                    <DoctorCard doctor={doctor} key ={doctor.id} />
                })}
                </div>
        )}
        {!loading && !error && appointments.length=== 0 && <h2
        className="mt-5  leading-7 text-[20px] font-semibold text-primaryColor">Bạn chưa từng đặt lịch trước đây</h2>}
    </div>
}
export default MyBookings;