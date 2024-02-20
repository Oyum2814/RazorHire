import { AiOutlineLogout as LogOut } from "react-icons/ai";
import { FiUser } from "react-icons/fi";

export const Roles = {
  User: "user",
  Admin: "admin",
};

export const NavLinks = [
  { name: "My Account", link: "/profile/student/account", icon: <FiUser /> },
  { name: "Logout", link: "", icon: <LogOut /> },
];
