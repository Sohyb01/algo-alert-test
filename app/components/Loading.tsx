import React from "react";

const Loading = () => {
  return (
    <div className="w-full grid place-items-center">
      <span className="loading loading-dots text-accent loading-lg"></span>
      <p className="text-2xl text-white">Loading Data</p>
    </div>
  );
};

export default Loading;
