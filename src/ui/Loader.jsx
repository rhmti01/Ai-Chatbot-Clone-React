import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <div className=" p-1 bg-amber-400/ animate-fadeIn animate-delay-sm " >
      <ThreeDots
        visible={true}
        height="40"
        width="45"
        color="#111"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}

export default Loader;
