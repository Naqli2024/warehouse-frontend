import React from "react";
import { LuLoader } from "react-icons/lu";

const Loader = ({ isLoading }) => {
  if (!isLoading) {
    return null; 
  }

  return (
    <div className="loader-overlay">
      <div className="loader">
        <LuLoader className="spinner" />
      </div>
    </div>
  );
};

export default Loader;