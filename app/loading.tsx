import React from "react";

function Loading() {
  return (
    <div className="text-white w-full p-[144px] text-center text-xl flex justify-center items-center gap-8 h-[50vh]">
      <p>Loading </p>
      <span className="loading loading-spinner text-info loading-lg"></span>
    </div>
  );
}

export default Loading;
