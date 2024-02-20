import React from "react";
import style from "./CreateResume.module.scss";

import clsx from "clsx";
import { useAppContext } from "contexts/AppContext";
import { useNavigate } from "react-router-dom";
import TechResumeImg from "assets/images/tech-resume-img.png";
import RoleResumeImg from "assets/images/role-resume-img.png";
import ServiceResumeImg from "assets/images/service-resume-img.png";
import SkillsetResumeImg from "assets/images/skillset-resume-img.png";

const TYPES = [
  { image: ServiceResumeImg, body: `For service or product based company` },
  { image: TechResumeImg, body: `For specific Technology` },
  {
    image: RoleResumeImg,
    body: `For specific Role & Experience`,
  },
  {
    image: SkillsetResumeImg,
    body: `For specific Skillset`,
  },
];

export default function Profile() {
  const { state: appState } = useAppContext();
  const { userProfile } = appState;
  let navigate = useNavigate();
  return (
    <div className={clsx(style.wrapper, "withPadding")}>
      <div className={style.greetings}>Hey {userProfile.name}, Welcome</div>
      <h4>Please select the type of resume you want to create</h4>

      <div className={style.types}>
        {TYPES.map((type) => (
          <article
            onClick={() => {
              navigate("/resume/templates");
            }}
          >
            <div className={style.image}>
              <img src={type.image} alt="" />
            </div>
            <div className={style.body}>{type.body}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
