import React from "react";

import LogoImg from "assets/images/logo.png";
import LogoWhiteImg from "assets/images/logo-white.png";

export default function Logo({ theme = "dark" }) {
  const src = theme.toLowerCase() === "light" ? LogoWhiteImg : LogoImg;
  return <img style={{ width: "150px" }} src={src} alt="logo" />;
}
