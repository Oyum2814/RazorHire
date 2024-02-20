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
      <div>
        <div>
          <span classNAme={clsx(style.close)} onClick={closeModal}>
            &times;
          </span>
          <h2>Enter Project Name</h2>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="button-container">
            <button className="confirm-btn" onClick={handleConfirm}>
              Next
            </button>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
