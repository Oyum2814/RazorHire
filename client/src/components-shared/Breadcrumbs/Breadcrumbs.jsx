import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";

const Breadcrumbs = ({ template, resume, resumeId }) => {
  const [resumeName, setResumeName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchResumeName = async () => {
      try {
        const response = await axios.get(`/resume/name/${resumeId}`);
        setResumeName(response.data.resumeName);
      } catch (error) {
        setError("Error fetching resume name");
      } finally {
        setLoading(false);
      }
    };

    fetchResumeName();
  }, [resumeId]);
  return (
    <nav
      className={`flex z-40 bg-[#6a2c70] text-white ${
        resume ? "w-full fixed top-16 md:w-[50%]  " : " -top-5"
      } py-2 px-4  
        absolute ${
          template ? "mt-16 md:mt-8 xl:mt-32 w-[80vw] md:w-[68vw]" : ""
        }`}
      aria-label="Breadcrumb"
    >
      <ul className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className=" list-none inline-flex items-center">
          <a
            href="/dashboard"
            className="inline-flex text-white items-center text-sm font-medium  hover:text-blue-600 dark: dark:hover:text-blue-600"
          >
            <svg
              className="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </a>
        </li>
        {template && (
          <li aria-current="page" className="list-none">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-white md:ms-2 ">
                Template
              </span>
            </div>
          </li>
        )}
        {resume && (
          <>
            <li className="list-none">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3  mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="/dashboard"
                  className="ms-1 text-white text-sm font-medium  hover:text-blue-600 md:ms-2 dark: dark:hover:text-blue-600"
                >
                  Templates
                </a>
              </div>
            </li>
            <li aria-current="page" className="list-none">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3  mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-white md:ms-2 dark:">
                  {loading ? "Loading" : resumeName}
                </span>
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
