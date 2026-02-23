import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <>
      <div
        className=" px-1 -mt-1 bg-amber-400/ animate-fadeIn animate-delay-sm 
    w-full  flex justify-start items-center dark:hidden"
      >
        <ThreeDots
          visible={true}
          height="35"
          width="40"
          color="#111"
          ariaLabel="infinity-spin-loading"
        />
      </div>
      <div
        className=" px-1 -mt-1 bg-amber-400/ animate-fadeIn animate-delay-sm 
    w-full  flex justify-start items-center  "
      >
        <ThreeDots
          visible={true}
          height="35"
          width="40"
          color="#63667F"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    </>
  );
}

export default Loader;
