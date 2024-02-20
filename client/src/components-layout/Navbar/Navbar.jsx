import clsx from "clsx";
import style from "./Navbar.module.scss";
import Logo from "components-shared/Logo";
import { useNavigate } from "react-router-dom";
import LockImg from "assets/images/lock-icon.svg";

export default function Navbar() {
  let navigate = useNavigate();
  return (
    <div className={clsx(style.wrapper, "withPadding")}>
      <span className={style.logo}>
        <Logo />
      </span>
      <nav>
        <ol>
          <li>Free Templates</li>
          <li className={style.locked}>
            For Companies
            <span className={style.icon}>
              <img src={LockImg} alt="lock" />
            </span>
          </li>
        </ol>
      </nav>
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Log In/Sign Up
      </button>
    </div>
  );
}
