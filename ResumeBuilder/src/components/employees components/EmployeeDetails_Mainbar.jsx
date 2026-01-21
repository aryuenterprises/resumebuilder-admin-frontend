import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsCalendar4 } from "react-icons/bs";
import { CiDeliveryTruck, CiBoxList } from "react-icons/ci";
import sample from "../../assets/sample.jpg";
import Footer from "../Footer";

import resume from "../../assets/resume.pdf";
import bb from "../../assets/bb.jpg";
import creditcard from "../../assets/creditcard.png";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaFileWord } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileImage } from "react-icons/fa";
import Mobile_Sidebar from "../Mobile_Sidebar";

const EmployeeDetails_Mainbar = () => {
  let navigate = useNavigate();

  const skills = [
    "Leadership",
    "Communication",
    "Time Management",
    "Risk Management",
    "Problem-Solving",
    "Organization",
    "Team Collaboration",
    "Negotiation",
    "Critical Thinking",
    "Budget Management",
    "Decision-Making",
    "Conflict Resolution",
    "Stakeholder Management",
    "Adaptability",
    "Technical Proficiency",
  ];

  

  const employeeDocuments = [
    {
      document_name: "Personal Information",
      documents: [
        { name: "resume.pdf", url: resume },
        { name: "bb.jpg", url: bb },
      ],
    },
    {
      document_name: "Educations Information",
      documents: [{ name: "creditcard.png", url: creditcard }],
    },
    {
      document_name: "Salary Information",
      documents: [
        { name: "creditcard.xlsx", url: creditcard },
        { name: "creditcard.docx", url: creditcard },
        { name: "creditcard.pdf", url: creditcard },
      ],
    },
  ];

  const openDocument = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col justify-between w-screen min-h-screen bg-gray-100 px-3 md:px-5 pt-2 md:pt-5">
      <div>
        
        <Mobile_Sidebar/>

        {/* breadcrumbs */}
        <div className="flex gap-2  text-sm items-center">
          <p
            onClick={() => navigate("/employees")}
            className=" text-gray-500 cursor-pointer "
          >
            Employees
          </p>
          <p>{">"}</p>
          <p className=" text-blue-500 ">Employee Details</p>
          <p>{">"}</p>
        </div>

        <div className="flex gap-8 items-center justify-end mt-5">
          <p className="text-sm font-medium">STATUS</p>
          <p className="border px-8 py-2 text-sm bg-white rounded-xl">Active</p>
        </div>

        <div className="flex flex-col xl:flex-row md:gap-3 mt-3">
          {/* leftsidebar */}
          <div className="basis-[70%] pb-3 md:pb-0">
            <div className="flex flex-col md:flex-row flex-grow gap-3">
              <div className="border-2 flex-grow rounded-2xl bg-white  px-5 py-5">
                <div className="flex gap-3">
                  <div>
                    <div className="flex">
                      <img
                        src={sample}
                        alt=""
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col  gap-3">
                    <p className="font-semibold text-2xl">Olivia Williams</p>
                    <p className="bg-orange-300 text-sm md:text-base font-medium px-2 text-center py-1 rounded-full">
                      Project Manager
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 mt-5">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-600">DEPARTMENT</p>
                    <p className="font-semibold">Sales & Marketing</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-600">DATE OF JOINING</p>
                    <p className="font-semibold">Jan 19,2020</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 bg-gray-200 mt-5 px-8 rounded-2xl py-3">
                  <p className="font-medium">aa@sdss.sdsd</p>
                  <hr className="w-full border-gray-300" />
                  <p className="mt-2 font-extrabold text-green-500">ON DUTY</p>
                  <p className="mt-2 font-extrabold text-red-500">RELEIVING</p>
                </div>
              </div>

              <div className="border-2 bg-white flex-grow rounded-2xl  px-5 py-5">
                <div className="flex justify-between">
                  <p className="text-2xl font-semibold">Personal Info</p>
                  <button
                    onClick={() =>
                      navigate("/editemployeedetails", {
                        state: { scrollTo: "personal-info" },
                      })
                    }
                    className="text-sm bg-gray-200 px-5 py-2 h-fit rounded-3xl"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between mt-3">
                    <p className="text-sm">PASSPORT NO.</p>
                    <p className="font-medium text-sm">QW3342981</p>
                  </div>
                  <hr />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between mt-3">
                    <p className="text-sm">PASSPORT EXP DATE</p>
                    <p className="font-medium text-sm">12/12/28</p>
                  </div>
                  <hr />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between mt-3">
                    <p className="text-sm">PHONE NUMBER</p>
                    <p className="font-medium text-sm">(380)-322-4422</p>
                  </div>
                  <hr />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between mt-3">
                    <p className="text-sm">BIRTHDAY</p>
                    <p className="font-medium text-sm">12/01/1988</p>
                  </div>
                  <hr />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between mt-3">
                    <p className="text-sm">MARITAL STATUS</p>
                    <p className="font-medium text-sm">Married</p>
                  </div>
                  <hr />
                </div>
              </div>
            </div>

            <div className="border-2 bg-white px-5 py-5 rounded-2xl mt-3 ">
              <div className="flex justify-between">
                <p className="text-2xl font-semibold">Skills</p>
                <button
                  onClick={() =>
                    navigate("/editemployeedetails", {
                      state: { scrollTo: "skills" },
                    })
                  }
                  className="text-sm bg-gray-200 h-fit px-5 py-2 rounded-3xl"
                >
                  Edit
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((item) => (
                  <p className="px-3 py-1 rounded-full border-2 w-fit ">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex flex-col flex-grow gap-2">
                <div className="border-2 bg-white px-5 py-5 rounded-2xl mt-3 ">
                  <div className="flex justify-between">
                    <p className="text-2xl font-semibold">Educations</p>
                    <button
                      onClick={() =>
                        navigate("/editemployeedetails", {
                          state: { scrollTo: "educations" },
                        })
                      }
                      className="text-sm bg-gray-200 h-fit px-5 py-2 rounded-3xl"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex gap-3 mt-3">
                    <div className="h-7 w-7 bg-gray-300 rounded-full"></div>
                    <p className="font-medium">
                      Bachelor of Science in Computer Science
                    </p>
                  </div>

                  <p className="text-sm font-medium  mt-5">
                    UNIVERSITY OF TECHNOLOGY
                  </p>
                  <p className="text-sm font-medium mt-2">Graduated may 2018</p>

                  <hr className="my-5" />

                  <div className="h-7 w-7 bg-gray-300 rounded-full"></div>
                  <p className="font-medium mt-2">
                    Certificate in Full Stack Web Development
                  </p>
                  <p className="font-medium">CODING ACADEMY</p>
                </div>

                <div className="border-2 bg-white px-5 py-5 rounded-2xl ">
                  <div className="flex justify-between">
                    <p className="text-2xl font-semibold">Emergency Contact</p>
                    <button
                      onClick={() =>
                        navigate("/editemployeedetails", {
                          state: { scrollTo: "emergency-contact" },
                        })
                      }
                      className="text-sm bg-gray-200 h-fit px-5 py-2 rounded-3xl"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex justify-between mt-3">
                    <p className="text-sm">Full name</p>
                    <p className="font-medium text-sm">Abdul</p>
                  </div>
                  <hr className="my-3" />

                  <div className="flex justify-between mt-3">
                    <p className="text-sm">Contact</p>
                    <p className="font-medium text-sm">123456789</p>
                  </div>
                  <hr className="my-3" />

                  <div className="flex justify-between mt-3">
                    <p className="text-sm">Relation type</p>
                    <p className="font-medium text-sm">Friend</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-grow gap-2">
                <div className="border-2 bg-white px-5 py-5 rounded-2xl mt-0 md:mt-3">
                  <div className="flex justify-between">
                    <p className="text-2xl font-semibold">PF Info</p>
                    <button
                      onClick={() =>
                        navigate("/editemployeedetails", {
                          state: { scrollTo: "pf-info" },
                        })
                      }
                      className="text-sm h-fit bg-gray-200 px-5 py-2 rounded-3xl"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex justify-between mt-3">
                    <p className="text-sm">UAN No</p>
                    <p className="text-sm font-medium">QW3342981</p>
                  </div>
                  <hr className="my-3" />

                  <div className="flex justify-between mt-3">
                    <p className="text-sm">PF Exp Date.</p>
                    <p className="text-sm font-medium">12/12/28</p>
                  </div>
                  <hr className="my-3" />

                  <div className="flex justify-between mt-3">
                    <p className="text-sm">Phone Number</p>
                    <p className="text-sm font-medium">(380)-322-4422</p>
                  </div>
                </div>

                <div className="border-2 bg-white px-5 py-5 rounded-2xl ">
                  <div className="flex justify-between">
                    <p className="text-2xl font-semibold">Documents</p>
                    <button
                      onClick={() =>
                        navigate("/editemployeedetails", {
                          state: { scrollTo: "documents" },
                        })
                      }
                      className="text-sm h-fit bg-gray-200 px-5 py-2 rounded-3xl"
                    >
                      Edit
                    </button>
                  </div>

                  <div>
                    {employeeDocuments.map((item) => (
                      <div key={item.document_name}>
                        <p className="">{item.document_name}</p>
                        <div className="ms-5 flex items-center gap-2 flex-wrap">
                          {item.documents.map((document, index) => (
                            <div
                              key={index}
                              className="flex gap-1 bg-gray-100 px-4 py-4 hover:bg-gray-200 rounded-xl items-center text-3xl cursor-pointer"
                              onClick={() => openDocument(document.url)}
                            >
                              {document.name.includes(".pdf") && <FaFilePdf />}
                              {document.name.includes(".jpg") && (
                                <FaFileImage />
                              )}
                              {document.name.includes(".png") && (
                                <FaFileImage />
                              )}
                              {document.name.includes(".xlsx") && (
                                <PiMicrosoftExcelLogoFill />
                              )}
                              {document.name.includes(".docx") && (
                                <FaFileWord />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* <div className="flex gap-2 flex-col">
                    <div className="flex items-center mt-3 justify-between bg-violet-100/80 rounded-xl px-3 py-3">
                      <p className="ps-5 font-medium">Employment Contract</p>
                      <BsThreeDotsVertical className="cursor-pointer" />
                    </div>

                    <div className="flex items-center  justify-between bg-orange-100/80 rounded-xl px-3 py-3">
                      <p className="ps-5 font-medium">Resume</p>
                      <BsThreeDotsVertical className="cursor-pointer" />
                    </div>

                    <div className="flex items-center  justify-between bg-blue-100/80 rounded-xl px-3 py-3">
                      <p className="ps-5 font-medium">Personal Information</p>
                      <BsThreeDotsVertical className="cursor-pointer" />
                    </div>
                  </div> */}
                </div>

                <div className="border-2 bg-white px-5 py-5 rounded-2xl ">
                  <div className="flex justify-between">
                    <p className="text-2xl font-semibold">Verification Doc</p>
                    <button
                      onClick={() =>
                        navigate("/editemployeedetails", {
                          state: { scrollTo: "verification-doc" },
                        })
                      }
                      className="text-sm h-fit bg-gray-200 px-5 py-2 rounded-3xl"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <p className="border text-sm font-medium px-3 py-2 rounded-full">
                      Aadhar
                    </p>
                    <p className="border text-sm font-medium px-3 py-2 rounded-full">
                      Salary
                    </p>
                    <p className="border text-sm font-medium px-3 py-2 rounded-full">
                      Education
                    </p>
                    <p className="border text-sm font-medium px-3 py-2 rounded-full">
                      Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* rightsidebar */}
          <div className="flex flex-row flex-wrap flex-grow xl:flex-col gap-3 basis-[30%]">
            <div className="border-2 flex-grow bg-white px-5 py-5 rounded-2xl ">
              <div className="flex justify-between">
                <p className="text-2xl font-semibold">Bank information</p>
                <button
                  onClick={() =>
                    navigate("/editemployeedetails", {
                      state: { scrollTo: "bank-information" },
                    })
                  }
                  className="text-sm h-fit bg-gray-200 px-5 py-2 rounded-3xl"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between mt-3">
                <p className="text-sm">Bank account No.</p>
                <p className="font-medium text-sm">00234552976293057</p>
              </div>
              <hr className="my-3" />

              <div className="flex justify-between mt-3">
                <p className=" text-sm">IFSC Code</p>
                <p className="font-medium text-sm">CC128693311</p>
              </div>
              <hr className="my-3" />

              <div className="flex justify-between mt-3">
                <p className="text-sm">PAN No</p>
                <p className="font-medium text-sm">0012998383647383</p>
              </div>
            </div>

            <div className="border-2 bg-white flex-grow px-5 py-5 rounded-2xl ">
              <div className="flex justify-between">
                <p className="text-2xl font-semibold">Salary information</p>
                <button
                  onClick={() =>
                    navigate("/editemployeedetails", {
                      state: { scrollTo: "salary-information" },
                    })
                  }
                  className="text-sm h-fit bg-gray-200 px-5 py-2 rounded-3xl"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between mt-3">
                <p className="text-sm">Salary basis </p>
                <p className="font-medium text-sm">Monthly</p>
              </div>
              <hr className="my-3" />

              <div className="flex justify-between mt-3">
                <p className="text-sm">Salary amount per month</p>
                <p className="font-medium text-sm">$1300</p>
              </div>
              <hr className="my-3" />

              <div className="flex justify-between mt-3">
                <p className="text-sm">Effective Date</p>
                <p className="font-medium text-sm">19/08/2022</p>
              </div>
              <hr className="my-3" />

              <div className="flex justify-between mt-3">
                <p className="text-sm">Payment type</p>
                <p className="font-medium text-sm">Transfer</p>
              </div>
              <hr className="my-3" />

              <div className="flex justify-between mt-3">
                <p className="text-sm">bill Rate</p>
                <p className="font-medium text-sm">20%</p>
              </div>
            </div>

            <div className="border-2 bg-white px-5 py-5 flex-grow rounded-2xl ">
              <div className="flex justify-between">
                <p className="text-2xl font-semibold">Experience</p>
                <button
                  onClick={() =>
                    navigate("/editemployeedetails", {
                      state: { scrollTo: "experience" },
                    })
                  }
                  className="text-sm h-fit bg-gray-200 px-5 py-2 rounded-3xl"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between mt-3">
                <div className="flex flex-col items-end">
                  <p className="font-semibold text-lg">
                    Senior Project Manager
                  </p>
                  <p className="text-sm font-medium me-5">
                    Aug, 2023 - Present
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <div className="h-7 w-7 rounded-md bg-gray-500"></div>
                  <p className="text-sm">Daytor</p>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium">Tech Solutions Pro</p>

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. When an unknown printer took a galley of type and
              </p>

              <hr className="my-3" />

              <div className="flex justify-between mt-3">
                <div className="flex flex-col items-end">
                  <p className="font-semibold text-lg">
                    Assistant Project Manager
                  </p>
                  <p className="text-sm font-medium me-5">
                    Jul 2018 - Dec 2019
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <div className="h-7 w-7 rounded-md bg-gray-500"></div>
                  <p className="text-sm">Louisville</p>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium">Tech Innovators Ltd.</p>

              <p>
                Assisted Project Managers in coordinating project activities,
                resources, and timelines.- Prepared project status reports,
                tracked …
              </p>

              <hr className="my-3" />

              <p className="font-medium mt-3"> Previous salary: $800</p>
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeDetails_Mainbar;
