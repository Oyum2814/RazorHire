import React from "react";
import style from "./ResumeTemplates.module.scss";
import clsx from "clsx";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components-shared/Modal/Modal";
export default function ResumeTemplates() {
  const [templates, setTemplates] = useState([]);
  const [projectId, setProjectId] = useState("");
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("resume/resume-templates");
        setTemplates(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, []);
  let navigate = useNavigate();

  const handleConfirm = (projectName) => {
    console.log("Project Name:", projectName);
    addProject(projectId, projectName);
  };

  const addProject = async (templateId, projectName) => {
    try {
      const res = await axios.post("resume/add", {
        ResumeTemplateId: templateId,
        Title: projectName,
      });
      console.log(res?.data);
      navigate(`/resume/${res?.data?.Content}`);
    } catch (error) {
      console.error("Error fetching user projects ", error);
    }
  };
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className={clsx(style.wrapper)}>
      <h2> Templates</h2>
      <div className={clsx(style.templates)}>
        {templates.map((template) => (
          <div
            className={clsx(style.template)}
            onClick={() => {
              setProjectId(template?._id);
              openModal();
              // navigate(`/resume/${template?._id}`);
              // addProject(template?._id);
            }}
          >
            <img alt="" height="150" width="auto" src={template.ImageLink} />
            <p>{template.Title}</p>
          </div>
        ))}
      </div>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
