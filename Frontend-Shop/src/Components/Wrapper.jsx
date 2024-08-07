import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = ({ children, className }) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0, {
      behavior: "smooth",
    });
  }, [navigate]);
  return (
    <div
      className={`w-full max-w-[1366px] px-5 md:px-10 mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
