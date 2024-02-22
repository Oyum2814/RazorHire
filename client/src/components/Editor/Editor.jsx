import React from "react";
import style from "./Editor.module.scss";
import clsx from "clsx";
import Resume from "./Resume";
import Breadcrumbs from "../../components-shared/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";

export default function Editor() {
  const { resumeId } = useParams();
  return (
    <div className={clsx(style.wrapper)}>
      {/* <Breadcrumbs resume resumeId={resumeId} /> */}
      <Resume resumeName={"Template3"} />
    </div>
  );
}
