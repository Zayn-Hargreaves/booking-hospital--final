import DoctorCard from "./DoctorCard";
import useFetchData from "../../hooks/useFetchData.js"
import Error from "../../components/Error/Error.jsx"
import Loading from "../../components/Loader/Loading.jsx";
const DoctorList = () => {
    const { data:doctors, loading, error } = useFetchData(`http://localhost:5000/api/v1/doctors`)
    return (
        <>
            {loading && <Loading />}
            {error && <Error />}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                {doctors.map((doctor) => (<DoctorCard key={doctor._id} doctor={doctor} ></DoctorCard>))}
            </div>
            )}
        </>
    )
}
export default DoctorList