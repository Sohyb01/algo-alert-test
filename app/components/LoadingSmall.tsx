import React from "react";

const LoadingSmall = () => {
  return (
    <div className="w-full p-4 flex items-center justify-center text-center gap-2">
      <span className="loading loading-spinner loading-sm"></span>
      <p className="text-base text-white">Loading Data</p>
    </div>
  );
};

export default LoadingSmall;
