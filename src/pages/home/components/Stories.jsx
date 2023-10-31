import React from "react";
import { Link } from "react-router-dom";

const Stories = () => {
  return (
    <div className="bg-white text-center dark:bg-black ">
      <img
        className="p-2"
        src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
        alt=""
      />
      <p className="">
        {" "}
        <Link to={"/profile"}>kcro_ref</Link>
      </p>
    </div>
  );
};

export default Stories;
