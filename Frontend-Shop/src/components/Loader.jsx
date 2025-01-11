import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="w-full h-full min-h-screen ">
      <div className="wrapper ">
        <div className="box-wrap">
          <div className="box one"></div>
          <div className="box two"></div>
          <div className="box three"></div>
          <div className="box four"></div>
          <div className="box five"></div>
          <div className="box six"></div>
        </div>
      </div>
    </div>
  );
}
