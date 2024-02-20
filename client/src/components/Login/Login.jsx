import React from "react";
import style from "./Login.module.scss";
import clsx from "clsx";

export default function Login() {
  return (
    <div className={clsx(style.wrapper, "withPadding")}>
      <h2>Login Page</h2>
      <a href={"http://localhost:3001/auth/google"}>Login Using Google</a>
    </div>
  );
}
