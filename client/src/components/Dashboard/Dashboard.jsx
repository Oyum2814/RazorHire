import React, { useState, useEffect } from "react";
import style from "./Dashboard.module.scss";
import clsx from "clsx";
import axios from "../../utils/axios";
import CreateResumeIcon from "assets/images/create-resume-icon.png";
// import axios from
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Dashboard() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("resume/myProjects");
        console.log({ response });
        setResumes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchResumes();
  }, []);

  let navigate = useNavigate();

  const user = useSelector((state) => state.user);
  if (user.user === null) {
    return (
      <div className="text-center text-3xl h-[40vh] flex justify-center items-center font-bold">
        Log in to get Started
      </div>
    );
  } else {
    return (
      <div className={clsx(style.wrapper, "withPadding")}>
        <h2>Dashboard Page</h2>
        <div
          className={clsx(
            style.templates,
            "templates grid grid-cols-1  lg:grid-cols-4 2xl:grid-cols-5 gap-6 p-4"
          )}
        >
          <a
            className={clsx(
              style.template,
              "withPadding",
              "text-md md:text-2xl h-full  flex-col justify-around border border-black"
            )}
            href={"/resume/new"}
          >
            <img src={CreateResumeIcon} classname="h-8 w-auto" />
            <div className="text-blue-500  font-[700] text-xl">
              Create new Resume
            </div>
          </a>
          {resumes?.map((resume, index) => (
            <div
              key={index}
              className={clsx(
                style.template,
                "group w-[80vw] h-[60vw] lg:h-[10vw] lg:w-[12vw]"
              )}
              onClick={() => {
                navigate(`/resume/${resume?.Content}`);
              }}
            >
              <div className={clsx(style.layer)}>
                <div className="w-full h-[30%] absolute bottom-0 ">
                  <h3 className="text-white font-[800] lg:font-[400] text-left ml-4 text-xl group-hover:font-[800]">
                    {resume?.Title}
                  </h3>
                </div>
              </div>
              <img
                height="150"
                width="auto"
                src={resume.ImageLink}
                className="object-cover h-full group-hover:h-[105%] "
              />
              {/* <p>{resume?.Title}</p> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
