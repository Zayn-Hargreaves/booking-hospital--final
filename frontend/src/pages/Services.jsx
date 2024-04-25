import React from "react";
import { services } from "../assets/data/services";
import SeviceCard from "../Services/ServiceCard";
const Services = () => {
    return <section>
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                {services.map((item, index) => <SeviceCard item={item} index={index} key={index} />)}
            </div>
        </div>
    </section>
    // return <div>servicedfsasdfasdfaa</div>
}
export default Services