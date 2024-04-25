import React from "react";
const Error = (errorMess) => {
    return (
        <section>
            <div className=" flex items-center justify-center w-full h-full">
                <h3 className="text-HeadingColor text-[20px] leading-[30px] font-semibold">{errorMess}</h3>
            </div>
        </section>
    )
}
export default Error