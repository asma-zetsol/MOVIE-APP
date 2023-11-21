import React from "react";
const Spinner = ({ initial }) => {
    return (
        <div className={`${initial? "w-full h-[700px] relative flex justify-center  z-50 top-44":""}`}>
            <svg className="animate-spin w-12 h-12 text-white" viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></circle>
            </svg>
         </div>
)};

export default Spinner;
