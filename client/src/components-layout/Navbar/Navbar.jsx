import clsx from "clsx";
import style from "./Navbar.module.scss";
import Logo from "components-shared/Logo";
import { useNavigate } from "react-router-dom";
import LockImg from "assets/images/lock-icon.svg";
import { useState, useCallback } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";
export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
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
      {user && (
        <button
          className="flex items-center"
          onClick={() => {
            toggleAccountMenu();
          }}
        >
          <div>
            <img
              src={user?.user.image}
              className="h-10 w-10 rounded-full flex-shrink-0"
            />
          </div>
          <BsChevronDown
            color="black"
            className={`transition hover:scale-125 ${
              showAccountMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <AccountMenu visible={showAccountMenu} user={user} />
        </button>
      )}
      {!user && (
        <a
          href="http://localhost:3001/auth/google"
          className="btn flex items-center"
        >
          <button>Log In/Sign Up</button>
        </a>
      )}
    </div>
  );
}
