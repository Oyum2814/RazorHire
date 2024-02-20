import React from "react";
import style from "./Footer.module.scss";
import clsx from "clsx";
import Logo from "components-shared/Logo";

const Links = [
  {
    title: "Products",
    links: [
      { title: "Resume", link: "/" },
      { title: "Courses", link: "https://jayaho.io", isExternal: true },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "Terms of Service", link: "/" },
      { title: "Privacy", link: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <div className={clsx(style.wrapper, "withPadding")}>
      <div className={style.logo}>
        <Logo theme="light" />
      </div>

      <div className={style.links}>
        {Links.map((item) => (
          <div className={style.linksCol}>
            <span className={style.title}>{item.title}</span>
            <nav>
              {item.links.map((link) => (
                <span>{link.title}</span>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className={style.copyright}>Copyright Jayaho 2024</div>
    </div>
  );
}
