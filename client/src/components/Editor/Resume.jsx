import { useCallback, useEffect, useState } from "react";

import axios from "../../utils/axios";
import { IoIosRemoveCircle } from "react-icons/io";
import "./resume.css";
import { Resume1, Resume2, Resume3, Resume4 } from "./ResumeTemplates";
import { useParams } from "react-router-dom";

import Input from "components-shared/Form/Input/Input";
import TextArea from "components-shared/Form/Textarea/TextArea";

const Resume = ({ resumeName }) => {
  const [skillInput, setSkillInput] = useState();

  const [info, setInfo] = useState({
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    designation: "Role",
    address: "Your Address",
    phone: "your phone number",
    summary: "Summary ...",
    story: "",
    site: "",
  });

  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [socials, setSocials] = useState([]);
  const { resumeId } = useParams();
  const [userProfile, setUserProfile] = useState({
    ...info,
    experiences,
    educations,
    projects,
    skills,
    socials,
  });

  const saveProfile = useCallback(async () => {
    try {
      const response = await axios.put(`resume/${resumeId}`, userProfile);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  }, [userProfile, resumeId]);

  useEffect(() => {
    setUserProfile({
      ...info,
      experiences,
      educations,
      projects,
      skills,
      socials,
    });
  }, [info, experiences, educations, projects, skills, socials]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`resume/${resumeId}`);
        console.log(response.data);
        setInfo((prevInfo) => ({
          ...prevInfo,
          firstName: response.data?.firstName,
          middleName: response.data?.middleName,
          lastName: response.data?.lastName,
          designation: response.data?.designation,
          address: response.data?.address,
          phone: response.data?.phone,
          summary: response.data?.summary,
        }));
        setEducations(response.data?.educations);
        setExperiences(response.data?.experiences);
        setProjects(response.data?.projects);
        setSocials(response.data?.socials);
        setSkills(response.data?.skills);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };
    fetchData();
  }, [resumeId]);
  return (
    <>
      <div
        className="md:h-full w-full flex flex-col-reverse  justify-between absolute md:overflow-y-hidden
            md:flex-row"
      >
        <section
          id="about-sc"
          className="non_print_area w-screen md:w-[50%] h-auto md:h-screen md:overflow-y-auto my-16"
        >
          <div className="container">
            <form action="" className="cv-form" id="cv-form">
              <div>
                <h2 className="font-[700] text-[#0648BF] uppercase tracking-[1.5px] text-xl mb-1">
                  Contact Info
                </h2>
                <p className="text-[#828282] mb-4 mt-1">
                  It allows employers to see how they can contact you.
                </p>
                <div className="grid lg:grid-cols-2 gap-8 grid-cols-1 mt-8 text-xs">
                  <Input
                    label="First Name"
                    defaultValue={info?.firstName}
                    name="firstname"
                    type="text"
                    placeholder="e.g. John"
                    onChange={(e) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        firstName: e.target.value,
                      }));
                    }}
                  />
                  <Input
                    label="Middle Name"
                    defaultValue={info?.middleName}
                    name="middlename"
                    type="text"
                    placeholder="e.g. John"
                    onChange={(e) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        middleName: e.target.value,
                      }));
                    }}
                  />

                  <Input
                    label="Last Name"
                    defaultValue={info?.lastName}
                    name="lastname"
                    type="text"
                    placeholder="e.g. Doe"
                    onChange={(e) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        lastName: e.target.value,
                      }));
                    }}
                  />
                  <Input
                    label="Designation"
                    defaultValue={info?.designation}
                    name="designation"
                    type="text"
                    placeholder="e.g. Doe"
                    onChange={(e) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        designation: e.target.value,
                      }));
                    }}
                  />

                  <Input
                    label="Address"
                    defaultValue={info?.address}
                    name="address"
                    type="text"
                    placeholder="e.g. Lake Street-23"
                    onChange={(e) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        address: e.target.value,
                      }));
                    }}
                  />
                  <Input
                    label="My Story"
                    defaultValue={info?.story}
                    name="story"
                    type="text"
                    placeholder=""
                    onChange={(e) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        story: e.target.value,
                      }));
                    }}
                  />
                  <Input
                    label="Phone No"
                    defaultValue={info?.phone}
                    name="phoneno"
                    type="text"
                    placeholder="e.g. 456-768-798, 567.654.002"
                    onChange={(e) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        phone: e.target.value,
                      }));
                    }}
                  />
                  <Input
                    label="Objective"
                    defaultValue={info?.summary}
                    name="summary"
                    type="text"
                    placeholder="e.g. Doe"
                    onChange={(e) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        summary: e.target.value,
                      }));
                    }}
                  />
                  <Input
                    label="Website"
                    defaultValue={info?.site}
                    name="email"
                    type="text"
                    placeholder="www.example.com"
                    onChange={(e) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        site: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <hr color="#1176AE" className="opacity-50 mt-8" />
              <div className="cv-form-blk">
                <div className="flex flex-col">
                  <h3 className="font-[700] text-[#0648BF] uppercase tracking-[1.5px] text-xl mb-1">
                    Academic Profile
                  </h3>
                  <p className="text-[#828282] mb-4 mt-1">
                    Add your most relevant education, including programs you’re
                    currently enrolled in
                  </p>
                </div>

                <div className="row-separator repeater">
                  <div className="repeater" data-repeater-list="group-c">
                    {educations?.map((education, index) => (
                      <div data-repeater-item key={index}>
                        <div className="grid lg:grid-cols-2 gap-8 grid-cols-1 mt-8 text-xs">
                          <Input
                            label="Institution"
                            defaultValue={education?.school}
                            name="edu_school"
                            type="text"
                            onChange={(e) => {
                              setEducations((prevEducations) => {
                                const newEducations = [...prevEducations];
                                newEducations[index] = {
                                  ...newEducations[index],
                                  school: e.target.value,
                                };
                                return newEducations;
                              });
                            }}
                          />
                          <Input
                            label=" Degree"
                            defaultValue={education?.degree}
                            name="edu_degree"
                            type="text"
                            onChange={(e) => {
                              setEducations((prevEducations) => {
                                const newEducations = [...prevEducations];
                                newEducations[index] = {
                                  ...newEducations[index],
                                  degree: e.target.value,
                                };
                                return newEducations;
                              });
                            }}
                          />
                          <Input
                            label="City"
                            defaultValue={education?.city}
                            name="edu_city"
                            type="text"
                            onChange={(e) => {
                              setEducations((prevEducations) => {
                                const newEducations = [...prevEducations];
                                newEducations[index] = {
                                  ...newEducations[index],
                                  city: e.target.value,
                                };
                                return newEducations;
                              });
                            }}
                          />
                          <Input
                            label="Year of Passing"
                            defaultValue={education?.graduationDate}
                            name="edu_graduation_date"
                            type="date"
                            onChange={(e) => {
                              setEducations((prevEducations) => {
                                const newEducations = [...prevEducations];
                                newEducations[index] = {
                                  ...newEducations[index],
                                  graduationDate: e.target.value,
                                };
                                return newEducations;
                              });
                            }}
                          />
                        </div>
                        <div className="mt-8">
                          <TextArea
                            label="Description"
                            deafultValue={education?.description}
                            name="edu_description"
                            placeholder="CGPA/Percentage"
                            onChange={(e) => {
                              setEducations((prevEducations) => {
                                const newEducations = [...prevEducations];
                                newEducations[index] = {
                                  ...newEducations[index],
                                  description: e.target.value,
                                };
                                return newEducations;
                              });
                            }}
                          />

                          <p className="text-xs mt-0  text-neutral-500">
                            Note : Bullet points in Description can be created
                            by seperating two senteces by | sign
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <span
                    className="text-blue-600 text-xs cursor-pointer"
                    onClick={() => {
                      setEducations((prevEducations) => [
                        ...prevEducations,
                        {
                          school: "",
                          degree: "",
                          city: "",
                          startDate: "",
                          graduationDate: "",
                          description: "",
                        },
                      ]);
                    }}
                  >
                    Add More Education
                  </span>
                  <div className="flex justify-end items-center gap-x-5">
                    <span>
                      <IoIosRemoveCircle
                        onClick={() => {
                          setEducations((prevEducations) =>
                            prevEducations.slice(0, -1)
                          );
                        }}
                        size={30}
                        color="red"
                      />
                    </span>
                    <button
                      type="button"
                      data-repeater-create
                      value="Add"
                      className="repeater-add-btn bg-blue-400 text-white"
                      onClick={() => {
                        setEducations((prevEducations) => [
                          ...prevEducations,
                          {
                            school: "",
                            degree: "",
                            city: "",
                            startDate: "",
                            graduationDate: "",
                            description: "",
                          },
                        ]);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <hr color="#1176AE" className="opacity-50 mt-8" />
              <div className="cv-form-blk">
                <div className="flex flex-col">
                  <h2 className="font-[700] text-[#0648BF] uppercase tracking-[1.5px] text-xl mb-1">
                    Internship Profile
                  </h2>
                  <p className="text-[#828282] mb-4 mt-1">
                    Add your most relevant education, including programs you’re
                    currently enrolled in
                  </p>
                </div>

                <div className="row-separator repeater">
                  <div className="repeater" data-repeater-list="group-b">
                    {experiences?.map((experience, index) => (
                      <div data-repeater-item key={index}>
                        <div className="grid lg:grid-cols-2 gap-8 grid-cols-1 mt-8 text-xs">
                          <Input
                            label="Title"
                            defaultValue={experience?.title}
                            name="exp_title"
                            type="text"
                            onChange={(e) => {
                              setExperiences((prevExperiences) => {
                                const newExperiences = [...prevExperiences];
                                newExperiences[index] = {
                                  ...newExperiences[index],
                                  title: e.target.value,
                                };
                                return newExperiences;
                              });
                            }}
                          />
                          <Input
                            label="Organization"
                            defaultValue={experience?.organization}
                            name="exp_organization"
                            type="text"
                            onChange={(e) => {
                              setExperiences((prevExperiences) => {
                                const newExperiences = [...prevExperiences];
                                newExperiences[index] = {
                                  ...newExperiences[index],
                                  organization: e.target.value,
                                };
                                return newExperiences;
                              });
                            }}
                          />
                          <Input
                            label=" Location"
                            defaultValue={experience?.location}
                            name="exp_location"
                            type="text"
                            onChange={(e) => {
                              setExperiences((prevExperiences) => {
                                const newExperiences = [...prevExperiences];
                                newExperiences[index] = {
                                  ...newExperiences[index],
                                  location: e.target.value,
                                };
                                return newExperiences;
                              });
                            }}
                          />
                          <div></div>
                          <Input
                            label="Start Date"
                            defaultValue={experience?.startDate}
                            name="exp_start_date"
                            type="date"
                            onChange={(e) => {
                              setExperiences((prevExperiences) => {
                                const newExperiences = [...prevExperiences];
                                newExperiences[index] = {
                                  ...newExperiences[index],
                                  startDate: e.target.value,
                                };
                                return newExperiences;
                              });
                            }}
                          />
                          <Input
                            label="End Date"
                            defaultValue={experience?.endDate}
                            min={experience?.startDate}
                            name="exp_end_date"
                            type="date"
                            onChange={(e) => {
                              setExperiences((prevExperiences) => {
                                const newExperiences = [...prevExperiences];
                                newExperiences[index] = {
                                  ...newExperiences[index],
                                  endDate: e.target.value,
                                };
                                return newExperiences;
                              });
                            }}
                          />
                        </div>
                        <div className="mt-8">
                          <TextArea
                            label="Description"
                            defaultValue={experience?.description}
                            name="exp_description"
                            onChange={(e) => {
                              setExperiences((prevExperiences) => {
                                const newExperiences = [...prevExperiences];
                                newExperiences[index] = {
                                  ...newExperiences[index],
                                  description: e.target.value,
                                };
                                return newExperiences;
                              });
                            }}
                          />
                          <p className="text-xs text-neutral-500 mt-0">
                            Note : Bullet points in Description can be created
                            by seperating two senteces by | sign
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end items-center gap-x-5">
                    <span>
                      <IoIosRemoveCircle
                        onClick={() => {
                          setExperiences((prevExperiences) =>
                            prevExperiences.slice(0, -1)
                          );
                        }}
                        size={30}
                        color="red"
                      />
                    </span>
                    <button
                      type="button"
                      data-repeater-create
                      value="Add"
                      className="repeater-add-btn"
                      onClick={() => {
                        console.log(experiences);
                        setExperiences((prevExperiences) => [
                          ...prevExperiences,
                          {
                            title: "",
                            organization: "",
                            location: "",
                            startDate: "",
                            endDate: "",
                            description: "",
                          },
                        ]);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <hr color="#1176AE" className="opacity-50 mt-8" />
              <div className="cv-form-blk">
                <div className="flex flex-col">
                  <h2 className="font-[700] text-[#0648BF] uppercase tracking-[1.5px] text-xl mb-1">
                    Project Profile
                  </h2>
                  <p className="text-[#828282] mb-4 mt-1">
                    It allows employers to see how they can contact you.
                  </p>
                </div>

                <div className="row-separator repeater">
                  <div className="repeater" data-repeater-list="group-d">
                    {projects?.map((project, index) => (
                      <div data-repeater-item key={index}>
                        <div className="grid lg:grid-cols-2 gap-8 grid-cols-1 mt-8 text-xs">
                          <Input
                            label="Project Name"
                            defaultValue={project?.title}
                            name="proj_title"
                            type="text"
                            onChange={(e) => {
                              setProjects((prevProjects) => {
                                const newProjects = [...prevProjects];
                                newProjects[index] = {
                                  ...newProjects[index],
                                  title: e.target.value,
                                };
                                return newProjects;
                              });
                            }}
                          />
                          <Input
                            label=" Project link"
                            defaultValue={project?.link}
                            name="proj_link"
                            type="text"
                            onChange={(e) => {
                              setProjects((prevProjects) => {
                                const newProjects = [...prevProjects];
                                newProjects[index] = {
                                  ...newProjects[index],
                                  link: e.target.value,
                                };
                                return newProjects;
                              });
                            }}
                          />
                          <Input
                            label="Start Date"
                            defaultValue={project?.startDate}
                            name="exp_start_date"
                            type="date"
                            onChange={(e) => {
                              setProjects((prevProjects) => {
                                const newProjects = [...prevProjects];
                                newProjects[index] = {
                                  ...newProjects[index],
                                  startDate: e.target.value,
                                };
                                return newProjects;
                              });
                            }}
                          />
                          <Input
                            label="End Date"
                            defaultValue={project?.endDate}
                            name="exp_end_date"
                            type="date"
                            min={project?.startDate}
                            onChange={(e) => {
                              setProjects((prevProjects) => {
                                const newProjects = [...prevProjects];
                                newProjects[index] = {
                                  ...newProjects[index],
                                  endDate: e.target.value,
                                };
                                return newProjects;
                              });
                            }}
                          />
                        </div>
                        <div className="mt-8">
                          <TextArea
                            label="Description"
                            deafultValue={project?.description}
                            name="proj_description"
                            type="text"
                            className="form-control proj_description"
                            id=""
                            onChange={(e) => {
                              setProjects((prevProjects) => {
                                const newProjects = [...prevProjects];
                                newProjects[index] = {
                                  ...newProjects[index],
                                  description: e.target.value,
                                };
                                return newProjects;
                              });
                            }}
                          />
                          <p className="text-xs mt-0 text-neutral-500">
                            Note : Bullet points in Description can be created
                            by seperating two senteces by | sign
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end items-center gap-x-5 w-full">
                    <span>
                      <IoIosRemoveCircle
                        onClick={() => {
                          setProjects((prevProjects) =>
                            prevProjects.slice(0, -1)
                          );
                        }}
                        size={30}
                        color="red"
                      />
                    </span>
                    <div>
                      <button
                        type="button"
                        data-repeater-create
                        value="Add"
                        className="repeater-add-btn bg-blue-400 text-white"
                        onClick={() => {
                          setProjects((prevProjects) => [
                            ...prevProjects,
                            {
                              title: "",
                              link: "",
                              description: "",
                              startDate: "",
                              endDate: "",
                            },
                          ]);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr color="#1176AE" className="opacity-50 mt-8" />
              <div className="cv-form-blk xl:block">
                <div className="flex flex-col">
                  <h2 className="font-[700] text-[#0648BF] uppercase tracking-[1.5px] text-xl mb-1">
                    Skill Profile
                  </h2>
                  <p className="text-[#828282] mb-4 mt-1">
                    Add relevant professional key skills and proficiencies.
                  </p>
                </div>
                <div className="row-separator repeater">
                  <div className="repeater" data-repeater-list="group-e">
                    <div>
                      <div className="grid lg:grid-cols-2 gap-8 grid-cols-1 mt-8 text-xs">
                        <Input
                          label="Skill"
                          defaultValue={skillInput}
                          onChange={(e) => {
                            setSkillInput(e.target.value);
                          }}
                          placeholder="Skill"
                          name="skill"
                          type="text"
                        />

                        <button
                          type="button"
                          data-repeater-create
                          value="Add"
                          className=" bg-blue-600 text-white font-bold px-4 py-2 text-sm w-fit rounded-md"
                          onClick={() => {
                            setSkills((prevSkills) => [
                              ...prevSkills,
                              skillInput,
                            ]);
                          }}
                        >
                          Add Skill
                        </button>
                      </div>
                      <div className="px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg  mt-2 border border-[#66A5CA] border-solid">
                        {skills?.map((skill, index) => (
                          <div
                            key={index}
                            className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer  bg-[#E7F3FD] text-gray-800 hover:bg-[#e1f2ff]"
                          >
                            {skill}
                            <svg
                              onClick={(e) => {
                                setSkills((prevSkills) =>
                                  prevSkills.filter(
                                    (prevSkill) => prevSkill !== skill
                                  )
                                );
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-3 hover:text-gray-300"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr color="#1176AE" className="opacity-50 mt-8" />
              <div className="cv-form-blk">
                <div className="flex flex-col">
                  <h2 className="font-[700] text-[#0648BF] uppercase tracking-[1.5px] text-xl mb-1">
                    Social Profile
                  </h2>
                  <p className="text-[#828282] mb-4 mt-1">
                    Add social profile links.
                  </p>
                </div>

                <div className="row-separator repeater">
                  <div className="repeater" data-repeater-list="group-d">
                    {socials?.map((social, index) => (
                      <div data-repeater-item key={index}>
                        <div className="grid lg:grid-cols-2 gap-8 grid-cols-1 mt-8 text-xs">
                          <Input
                            label="Platform"
                            defaultValue={social?.platform}
                            name="proj_title"
                            type="text"
                            onChange={(e) => {
                              setSocials((prevSocials) => {
                                const newSocials = [...prevSocials];
                                newSocials[index] = {
                                  ...newSocials[index],
                                  platform: e.target.value,
                                };
                                return newSocials;
                              });
                            }}
                          />
                          <Input
                            label="Link"
                            defaultValue={social?.link}
                            name="proj_link"
                            type="text"
                            onChange={(e) => {
                              setSocials((prevSocials) => {
                                const newSocials = [...prevSocials];
                                newSocials[index] = {
                                  ...newSocials[index],
                                  link: e.target.value,
                                };
                                return newSocials;
                              });
                            }}
                          />
                          <Input
                            label="Username"
                            defaultValue={social?.username}
                            name="proj_description"
                            type="text"
                            onChange={(e) => {
                              setSocials((prevSocials) => {
                                const newSocials = [...prevSocials];
                                newSocials[index] = {
                                  ...newSocials[index],
                                  username: e.target.value,
                                };
                                return newSocials;
                              });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end items-center gap-x-5 ">
                    <span>
                      <IoIosRemoveCircle
                        onClick={() => {
                          setSocials((prevSocials) => prevSocials.slice(0, -1));
                        }}
                        size={30}
                        color="red"
                      />
                    </span>
                    <button
                      type="button"
                      data-repeater-create
                      value="Add"
                      className="repeater-add-btn bg-blue-400 text-white"
                      onClick={() => {
                        setSocials((prevSocials) => [
                          ...prevSocials,
                          {
                            platform: "",
                            link: "",
                            username: "",
                          },
                        ]);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center mb-12">
                <button
                  onClick={saveProfile}
                  className="text-xl px-4 py-2 bg-blue-600 text-white font-[600] rounded-md mx-auto"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
        <div className="hidden md:block h-[80vh] w-[1px] bg-neutral-300"></div>
        {resumeName === "Template1" && (
          <Resume1
            info={info}
            experiences={experiences}
            projects={projects}
            educations={educations}
            skills={skills}
            socials={socials}
          />
        )}
        {resumeName === "Template2" && (
          <Resume2
            info={info}
            experiences={experiences}
            projects={projects}
            educations={educations}
            skills={skills}
            socials={socials}
          />
        )}
        {resumeName === "Template3" && (
          <Resume3
            info={info}
            experiences={experiences}
            projects={projects}
            educations={educations}
            skills={skills}
            socials={socials}
          />
        )}
        {resumeName === "Template4" && (
          <Resume4
            info={info}
            experiences={experiences}
            projects={projects}
            educations={educations}
            skills={skills}
            socials={socials}
          />
        )}
      </div>
    </>
  );
};

export default Resume;
