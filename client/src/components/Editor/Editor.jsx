import React from "react";
import style from "./Editor.module.scss";
import clsx from "clsx";
import Resume from "./Resume";

export default function Editor() {
  return (
    <div className={clsx(style.wrapper)}>
      <Resume resumeName={"Template3"} />
    </div>
  );
}
