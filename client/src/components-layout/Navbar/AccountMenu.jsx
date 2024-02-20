import React from "react";
import { BsPersonFill } from "react-icons/bs";

const AccountMenu = ({ visible, user }) => {
  if (!visible) return null;
  console.log(process.env.HOST);
  return (
    <div className="border-[0.5px] rounded-md bg-white text-black w-56 absolute top-14 right-0 py-5 m-4 flex-col border-1 border-gray-800 flex z-50">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row items-center w-full">
          {user?.image ? (
            <div className="w-12 h-12 rounded-full border border-[2px] overflow-hidden bg-white">
              <img
                width="40"
                height="40"
                className="h-12 w-12 object-contain rounded-full "
                src={user.user.image}
                alt="profileImage"
              />
            </div>
          ) : (
            <BsPersonFill size={45} />
          )}
          <p className="text-black ml-4 text-xl cursor-default font-semibold font-sans">
            {user?.user.firstName ? user.user.firstName : "Name not found"}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-[0.5px] my-2" />
        <a
          href={"http://localhost:3001/auth/logout"}
          className="text-center cursor-pointer px-4 py-2 bg-white text-[#6a2c70] font-extralight rounded-[10px]"
        >
          Sign Out
        </a>
      </div>
    </div>
  );
};
export default AccountMenu;
