import React, { useState } from "react";
import clsx from "clsx";
import style from "./Modal.module.scss";

const Modal = ({ showModal, closeModal, onConfirm }) => {
  const [projectName, setProjectName] = useState("");

  const handleConfirm = () => {
    // Call the onConfirm callback with the project name
    onConfirm(projectName);
    // Close the modal
    closeModal();
  };

  return (
    <div className={`${showModal ? clsx(style.show) : clsx(style.wrapper)}`}>
      <div className="w-screen h-screen absolute top-0 flex bg-black/40 justify-center items-center">
        <div className="w-[40vw] bg-black/70 p-6 rounded-md">
          <h2 className="text-white font-bold text-3xl my-4">
            Enter Project Name
          </h2>
          <input
            type="text"
            className="w-full p-4"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="button-container mt-4 flex justify-evenly">
            <button
              className="confirm-btn bg-green-600 w-24 h-12 rounded-md text-white"
              onClick={handleConfirm}
            >
              Next
            </button>
            <button
              className="cancel-btn bg-gray-400 w-24 h-12 rounded-md text-white"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
