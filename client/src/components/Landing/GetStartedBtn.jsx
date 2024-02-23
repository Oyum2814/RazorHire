import style from "./GetStartedBtn.module.scss";
import React from "react";
import { FaLock } from "react-icons/fa6";

import { MdKeyboardArrowRight } from "react-icons/md";

export default function GetStartedBtn() {
  return (
    <button className={style.wrapper}>
      Get Started for Free
      <span style={{ marginLeft: "1em" }}>
        <FaLock size={15} />
      </span>
    </button>
  );
}
