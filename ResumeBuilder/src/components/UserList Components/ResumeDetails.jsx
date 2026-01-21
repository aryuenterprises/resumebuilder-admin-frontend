import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";
import axios from "axios";
import { API_URL } from "../../config";
import { formatHtml } from "../../utils/formatHtml";
import { FaFileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AiOutlineFileUnknown } from "react-icons/ai";


const ResumeDetails = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  console.log("data", data);
  const [userData, setUserData] = useState([]);
  const [openResume, setOpenResume] = useState(null);

  // const [selectedResume, setSelectedResume] = useState(null);



  const location = useLocation();
  const { userId } = location.state || {};

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/experience/get-user-contacts/${id}`
      );
      setData(response?.data?.data);
      setUserData(response?.data?.user);

      // console.log(response);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
    }
  }, [userId]);

  const [openSection, setOpenSection] = useState("profile");

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  useEffect(() => {
    if (openResume) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openResume]);

  return (
    <div className="flex flex-col justify-between w-screen min-h-screen bg-gray-100 px-3 md:px-5 pt-2 md:pt-5">
      <div>
        <Mobile_Sidebar />

        {/* breadcrumbs */}
        <div className="flex gap-2  text-sm items-center">
          <p
            onClick={() => navigate("/users-list")}
            className=" text-gray-500 cursor-pointer "
          >
            User List
          </p>
          <p>{">"}</p>
          <p className=" text-blue-500 ">User Resume Details</p>
          <p>{">"}</p>
        </div>

        <div>
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-2xl md:text-3xl font-semibold mt-5 md:mt-8">
              User Resume Details
            </p>
          </div>
        </div>

        <div>
          <div className=" bg-white w-fit py-3 px-5 mt-5 md:mt-8 ">
            <p className="text-lg capitalize">
              <span className="font-semibold">User Name : </span>{" "}
              {userData.firstName} {userData.lastName}
            </p>
            <p className="text-lg mt-2 capitalize">
              <span className="font-semibold">User Email : </span>{" "}
              {userData.email}
            </p>
          </div>
        </div>
        {data.length > 0 ? <>
          {data?.map((data, index) => (

            <div className="flex flex-col gap-6 mt-8 text-gray-800 font-[Poppins]">
              <div className="flex justify-between text-xl font-medium mt-10">
                <h2 className="">
                  Resume {index + 1}{" "}
                  <span className="text-md text-blue-600">
                    (Template Id - {data?.contact.templateId})
                  </span>
                </h2>
                <button
                  onClick={() => setOpenResume(data?.contact?.resume)}
                  // onClick={() => setSelectedResume(data?.contact?.resume)}
                  className="bg-gray-200 hover:scale-105 duration-300 p-2 rounded-full mr-5 text-blue-600"
                >
                  <FaFileAlt className="text-2xl" />
                </button>
                {openResume && (
                  <div
                    className="fixed inset-0 cursor-pointer bg-black/5 backdrop-blur-sm flex justify-center items-center z-50"
                    onClick={() => setOpenResume(null)}
                  >
                    <div className=" rounded-xl  w-[90%] md:w-[70%] lg:w-[60%] h-[80%] py-4 px-12  relative">
                      {/* <button
                      onClick={() => setOpenResume(false)}
                      className="absolute top-1 right-2 bg-white/60 p-1 rounded-full text-gray-700 hover:text-red-500 text-xl"
                    >
                      <IoClose className="text-2xl"/>
                    </button> */}

                      <iframe
                        src={`${API_URL}/api/uploads/resumes/${openResume}`} className="w-full h-full rounded-lg border"
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* Section Template */}
              {[
                {
                  id: `profile ${index}`,
                  title: "👤 Profile Information",
                  content: (
                    <div className="space-y-4 text-gray-700">
                      <div>
                        <h2 className="text-2xl font-semibold capitalize text-gray-900">
                          {data?.contact?.firstName} {data?.contact?.lastName}
                        </h2>
                        <p className="text-gray-500">
                          {data?.contact?.jobTitle?.name}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 bg-white/50 rounded-xl p-4 shadow-inner backdrop-blur-sm border border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Email</p>
                          <p className="font-medium">{data?.contact?.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Phone</p>
                          <p className="font-medium">{data?.contact?.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">
                            Country
                          </p>
                          <p className="font-medium">{data?.contact?.country}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">City</p>
                          <p className="font-medium">{data?.contact?.city}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-xs text-gray-500 uppercase">
                            Address
                          </p>
                          <p className="font-medium">{data?.contact?.address}</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                data?.skills.length > 0 && {
                  id: `skills ${index}`,
                  title: "💼 Skills",
                  content: (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {data?.skills?.map((item, i) => (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 text-indigo-700 font-medium px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all"
                        >
                          {item.skill}
                        </span>
                      ))}
                    </div>
                  ),
                },
                data?.educations.length > 0 && {
                  id: `education ${index}`,
                  title: "🎓 Education",
                  content: (
                    <div className="space-y-4 mt-2">
                      {data?.educations?.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-gray-200 p-4 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
                        >
                          <h3 className="font-semibold text-lg text-gray-900">
                            {item.schoolname}
                          </h3>
                          <p className="text-sm text-gray-600">{item.degree}</p>
                          <p className="text-sm text-gray-500">{item.location}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {item.startDate} – {item.endDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                data?.experiences.length > 0 && {
                  id: `experience ${index}`,
                  title: "🏢 Experience",
                  content: (
                    <div className="space-y-4 mt-2">
                      {data?.experiences?.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-gray-200 p-4 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
                        >
                          <h3 className="font-semibold text-lg text-gray-900">
                            {item.jobTitle}
                          </h3>
                          <p className="text-sm text-gray-600">{item.employer}</p>
                          <p className="text-sm text-gray-500">{item.location}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {item.startDate?.split("T")[0]} – {item.endDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                data?.summary.length > 0 && {
                  id: `summary ${index}`,
                  title: "🗨️ Summary",
                  content: (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatHtml(data?.summary),
                      }}
                      className="flex flex-wrap gap-3 mt-3"
                    ></div>
                  ),
                },
                data?.finalize.length > 0 &&

                {
                  id: `finalize ${index}`,
                  title: "🌟 Finalize",
                  content: (
                    <div className="flex flex-col gap-3 ">
                      {data?.finalize[0]?.languages.length > 0 && (
                        <div className="rounded-xl border border-gray-200 p-4 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-sm flex flex-col gap-4">
                          <h3 className="text-lg font-medium capitalize text-gray-900">
                            Languages
                          </h3>
                          {data?.finalize[0]?.languages.map((item, i) => (
                            <span
                              key={i}
                              className="
      inline-block
      bg-gradient-to-r from-indigo-100 to-purple-100
      border border-indigo-200
      text-indigo-700 font-medium
      px-3 py-2
      rounded-2xl shadow-sm hover:shadow-md
      transition-all text-sm
      break-words
      max-w-fit
      leading-relaxed
    "
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: formatHtml(item.name),
                                }}
                              ></span>
                            </span>
                          ))}
                        </div>
                      )}

                      {data?.finalize[0]?.certificationsAndLicenses.length >
                        0 && (
                          <div className="rounded-xl border border-gray-200 p-4 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-sm flex flex-col gap-4">
                            <h3 className="text-lg font-medium capitalize text-gray-900">
                              Certifications And Licenses
                            </h3>
                            {data?.finalize[0]?.certificationsAndLicenses.map(
                              (item, i) => (
                                <span
                                  key={i}
                                  className="
      inline-block
      bg-gradient-to-r from-indigo-100 to-purple-100
      border border-indigo-200
      text-indigo-700 font-medium
      px-3 py-2
      rounded-2xl shadow-sm hover:shadow-md
      transition-all text-sm
      break-words
      max-w-fit
      leading-relaxed
    "
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: formatHtml(item.name),
                                    }}
                                  ></span>
                                </span>
                              )
                            )}
                          </div>
                        )}

                      {data?.finalize[0]?.hobbiesAndInterests.length > 0 && (
                        <div className="rounded-xl border border-gray-200 p-4 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-sm flex flex-col gap-4">
                          <h3 className="text-lg font-medium capitalize text-gray-900">
                            Hobbies And Interests
                          </h3>
                          {data?.finalize[0]?.hobbiesAndInterests.map(
                            (item, i) => (
                              <span
                                key={i}
                                className="
      inline-block
      bg-gradient-to-r from-indigo-100 to-purple-100
      border border-indigo-200
      text-indigo-700 font-medium
      px-3 py-2
      rounded-2xl shadow-sm hover:shadow-md
      transition-all text-sm
      break-words
      max-w-fit
      leading-relaxed
    "
                              >
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: formatHtml(item.name),
                                  }}
                                ></span>
                              </span>
                            )
                          )}
                        </div>
                      )}

                      {data?.finalize[0]?.awardsAndHonors.length > 0 && (
                        <div className="rounded-xl border border-gray-200 p-4 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-sm flex flex-col gap-4">
                          <h3 className="text-lg font-medium capitalize text-gray-900">
                            Awards And Honors
                          </h3>
                          {data?.finalize[0]?.awardsAndHonors.map((item, i) => (
                            <span
                              key={i}
                              className="
      inline-block
      bg-gradient-to-r from-indigo-100 to-purple-100
      border border-indigo-200
      text-indigo-700 font-medium
      px-3 py-2
      rounded-2xl shadow-sm hover:shadow-md
      transition-all text-sm
      break-words
      max-w-fit
      leading-relaxed
    "
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: formatHtml(item.name),
                                }}
                              ></span>
                            </span>
                          ))}

                        </div>
                      )}

                      {data?.finalize[0]?.websitesAndSocialMedia.length > 0 && (
                        <div className="rounded-xl border border-gray-200 p-4 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-sm flex flex-col gap-4">
                          <h3 className="text-lg font-medium capitalize text-gray-900">
                            Websites And Social Media
                          </h3>
                          {data?.finalize[0]?.websitesAndSocialMedia.map(
                            (item, i) => (
                              <div key={i} className="text-md">
                                <div className="">
                                  {" "}
                                  <span className="font-medium">
                                    Social Media
                                  </span>{" "}
                                  - {item.socialMedia}{" "}
                                </div>
                                <div className="">
                                  <span className="font-medium">
                                    {" "}
                                    Website Url
                                  </span>{" "}
                                  - {item.websiteUrl}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {data?.finalize[0]?.references.length > 0 && (
                        <div className="rounded-xl border border-gray-200 p-4 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-sm flex flex-col gap-4">
                          <h3 className="text-lg font-medium capitalize text-gray-900">
                            References
                          </h3>
                          {data?.finalize[0]?.references.map((item, i) => (
                            <div key={i} className="text-md">
                              {item.name}
                            </div>
                          ))}
                        </div>
                      )}

                      {data?.finalize[0]?.customSection.length > 0 && (
                        <div className="rounded-xl border border-gray-200 p-4 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-sm flex flex-col gap-4 h-fit">
                          <h3 className="text-lg font-medium capitalize text-gray-900">
                            Custom Section
                          </h3>
                          {data?.finalize[0]?.customSection.map((item, i) => (
                            <div key={i} className="text-md flex flex-col">
                              <div className="">
                                <span className="font-medium">Name</span> -{" "}
                                {item.name}{" "}
                              </div>
                              <div className="flex">
                                <span className="font-medium">Description </span>{" "}
                                -{" "}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: formatHtml(item.description),
                                  }}
                                ></span>{" "}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ),
                },
              ]
                .filter(Boolean)
                .map((section) => (
                  <div
                    key={section.id}
                    className={`rounded-2xl shadow-lg transition-all border border-gray-100 overflow-hidden ${openSection === section.id
                      ? "bg-gradient-to-br from-white via-gray-50 to-gray-100"
                      : "bg-white"
                      }`}
                  >
                    <button
                      className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 transition-all"
                      onClick={() => toggleSection(section.id)}
                    >
                      <span className="text-lg md:text-xl font-semibold tracking-wide text-gray-800">
                        {section.title}
                      </span>
                      <span
                        className={`text-2xl transition-transform ${openSection === section.id
                          ? "rotate-180 text-indigo-600"
                          : ""
                          }`}
                      >
                        ▼
                      </span>
                    </button>

                    {/* Smooth Expand Transition */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${openSection === section.id
                        ? "max-h-full p-6"
                        : "max-h-0 p-0"
                        }`}
                    >
                      {openSection === section.id && (
                        <div className="text-gray-700 text-sm md:text-base">
                          {section.content}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}</> : <p className="text-gray-500 pt-10 flex gap-1 items-center"><AiOutlineFileUnknown /> This user has not created any resume.</p>}
      </div>
      <Footer />
    </div>
  );
};

export default ResumeDetails;
