import React from "react";
import style from "./GetStartedBtn.module.scss";

import { MdKeyboardArrowRight } from "react-icons/md";

export default function GetStartedBtn() {
  return (
    <a href={"/dashboard"} className={style.wrapper}>
      Get Started for Free
      <span>
        <MdKeyboardArrowRight size={25} />
      </span>
    </a>
  );
}
