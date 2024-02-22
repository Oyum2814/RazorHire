import { useState, useCallback } from "react";
import clsx from "clsx";
import style from "./Navbar.module.scss";
import Logo from "components-shared/Logo";
import AccountMenu from "./AccountMenu";
import LockImg from "assets/images/lock-icon.svg";

import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";

import Hamburger from "hamburger-react";

import config from "config/config";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const [isOpenHam, setOpenHam] = useState(false);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
  return (
    <div className={clsx(style.wrapper, "withPadding")}>
      <a href="/" className={style.logo}>
        <Logo />
      </a>

      {user && (
        <button
          className="flex items-center"
          onClick={() => {
            toggleAccountMenu();
          }}
        >
          <div>
            <img src={user?.user.image} className="h-10 w-10 rounded-full flex-shrink-0" />
          </div>
          <BsChevronDown
            color="black"
            className={`transition hover:scale-125 ${showAccountMenu ? "rotate-180" : "rotate-0"}`}
          />
          <AccountMenu visible={showAccountMenu} user={user} />
        </button>
      )}

      {!user && (
        <div className="flex  items-center ml-auto">
          <div className={clsx(style.mobile, "ml-auto mr-10")}>
            <Hamburger color="#2846bd" toggled={isOpenHam} toggle={setOpenHam} />
            <div className={clsx(style.dropdown, "withPadding", isOpenHam && style.open)}>
              <ol>
                <li>Free Templates</li>
                <li className={style.locked}>
                  For Companies
                  <span className={style.icon}>
                    <img src={LockImg} alt="lock" />
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <nav className={style.desktop}>
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

          <a href={`${config.apiBaseUrl}/auth/google`}>
            <button>Log In/Sign Up</button>
          </a>
        </div>
      )}
    </div>
  );
}
