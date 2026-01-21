import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import ReactDOMServer from "react-dom/server";
import { TfiPencilAlt } from "react-icons/tfi";
import Swal from "sweetalert2";
import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import { API_URL } from "../../config";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
DataTable.use(DT);
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye } from "react-icons/fa6";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

const DesiredJobTitle = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [toneResume, setToneResume] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
  setTimeout(() => {
    // EDIT
    document.querySelectorAll(".edit-icon").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-id");
        const row = data.find((item) => item._id === id);
        openEditModal(row);
      });
    });

    // VIEW
    document.querySelectorAll(".view-icon").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-id");
        const row = data.find((item) => item._id === id);
        showUserDetails(row);
      });
    });

    // DELETE
    document.querySelectorAll(".delete-icon").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-id");
        deleteJobTitle(id);
      });
    });

  }, 500);
}, [data]);

  useEffect(() => {
    fetchToneResume();
  }, []);

  const fetchToneResume = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/desired-job-title/desired-job-title`
      );

      if (response.data) {
        setData(response?.data?.data);
        setLoading(false);
      } else {
        setErrors("Failed to fetch Tone Resume.");
        setLoading(false);
      }
    } catch (err) {
      setErrors("Failed to fetch Tone Resume.");
      setLoading(false);
    }
  };

  // Open and close modals
  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeModal = () => {
    formik.resetForm();
    setToneResume(null);
    setIsAnimating(false);
    setTimeout(() => setIsModalOpen(false), 250);
  };

  const openEditModal = (row) => {
    setToneResume(row);
    setIsModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const rolesWithSno = data.map((data, index) => ({
    ...data,
    Sno: index + 1,
  }));

  const deleteJobTitle = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Desired Job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${API_URL}/api/desired-job-title/delete/${id}`
        );
        toast.success("Job Title Resume has been deleted.");
        fetchToneResume();
      } catch (error) {
        console.error("Error deleting Desired Job:", error);
        Swal.fire("Error!", "Failed to delete Desired Job.", "error");
      }
    }
  };

  const [jobTitles, setJobTitles] = useState([]);
  useEffect(() => {
    // Fetch job titles from API
    axios
      .get(`${API_URL}/api/desired-job-title/desired-job-title`)
      .then((response) => {
        setJobTitles(response.data || []); // Assuming response.data is an array of job titles
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setDisplayBasic(true);
  };
  const onHide = () => {
    setDisplayBasic(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "Sno",
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "Job Title",
      data: "name",
      body: (row) => <div className="capitalize">{row.name}</div>,
    },
    {
  title: "Status",
  data: "status",
  render: function (data, type, row) {
    const statusLabel = row.status === "1" ? "ACTIVE" : "INACTIVE";
    const color = row.status === "1" ? "green" : "red";

    return `
      <span 
        style="
          color:${color};
          border:1px solid ${color};
          border-radius:9999px;
          display:inline-block;
          text-align:center;
          width:100px;
          font-size:12px;
          font-weight:500;
        "
      >
        ${statusLabel}
      </span>
    `;
  }
},


    // {
    //   title: "Action",
    //   data: null,
    //   body: (row) => (
    //     <div className="action-container flex gap-4 justify-center">
    //       <TfiPencilAlt
    //         className="cursor-pointer text-black"
    //         onClick={() => openEditModal(row)}
    //       />
    //       <FaEye
    //         onClick={() => showUserDetails(row)}
    //         className="text-xl cursor-pointer mt-0"
    //       />
    //       <MdOutlineDeleteOutline
    //         className="text-red-600 text-xl cursor-pointer"
    //         onClick={() => deleteJobTitle(row._id)}
    //       />
    //     </div>
    //   ),
    // },

//     {
//   title: "Action",
//   data: null,
//  render: (data, type, row) =>
//          ReactDOMServer.renderToString(
//     <div className="action-container flex gap-4 justify-center">
      
//       {/* EDIT ICON */}
//       <TfiPencilAlt
//         className="cursor-pointer text-black"
//         onClick={() => openEditModal(row)}
//       />

//       {/* VIEW ICON */}
//       <FaEye
//         className="text-xl cursor-pointer mt-0"
//         onClick={() => showUserDetails(row)}   // View Popup
//       />

//       {/* DELETE ICON */}
//       <MdOutlineDeleteOutline
//         className="text-red-600 text-xl cursor-pointer"
//         onClick={() => deleteJobTitle(row._id)}
//       />
//     </div>
//   ),
// },

{
  title: "Action",
  data: null,
  render: (data, type, row) => {
    return ReactDOMServer.renderToString(
      <div className="action-container flex gap-4 justify-center">

        <TfiPencilAlt
          className="edit-icon cursor-pointer text-black text-lg"
          data-id={row._id}
        />

        <FaEye
          className="view-icon cursor-pointer text-gray-600 text-lg"
          data-id={row._id}
        />

        <MdOutlineDeleteOutline
          className="delete-icon cursor-pointer text-red-600 text-xl"
          data-id={row._id}
        />

      </div>
    );
  }
},



    
  ];

  const renderUserDetails = () => {
    if (!selectedUser) return null;

    return (
      <div className="space-y-3 ">
        <div className="">
          <div className="flex flex-col gap-4">
            <div>
              <strong>Job Title:</strong>
              <p className="mt-1">{selectedUser.name || "N/A"}</p>
            </div>
            <div className="">
              <strong>Keywords:</strong>
              <div className="flex gap-2 flex-wrap">
                {selectedUser.keywords.map((data, index) => (
                  <span className=" mt-1 bg-gray-50 border px-2 rounded-full">
                    {data}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <strong>Tones:</strong>
              <div className="flex gap-2 flex-wrap">
                {selectedUser.tones.map((data, index) => (
                  <span className=" mt-1 bg-gray-50 border px-2 rounded-full">
                    {data}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: toneResume ? toneResume.name : "",
      keywords: toneResume ? toneResume.keywords : [],
      tones: toneResume ? toneResume.tones : [],
      status: toneResume ? toneResume.status : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Tone Resume Is Required"),
      keywords: Yup.array().min(1, "At least one keyword is required"),
      tones: Yup.array().min(1, "At least one tone is required"),
      status: Yup.number().required("Status Is Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (toneResume) {
          await axios.put(
            `${API_URL}/api/desired-job-title/edit/${toneResume._id}`,
            {
              name: values.name,
              keywords: values.keywords,
              tones: values.tones,
              status: values.status,
            }
          );
          toast.success("Job Title Updated Successfully.");
        } else {
          const response = await axios.post(
            `${API_URL}/api/desired-job-title/create`,
            {
              name: values.name,
              keywords: values.keywords,
              tones: values.tones,
              status: values.status,
            }
          );
          toast.success("Job Title Created Successfully.");
        }

        setIsModalOpen(false);
        fetchToneResume();
        resetForm();
        setToneResume(null);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors); // Set validation errors from API
        } else {
          console.error("Error submitting form:", err);
        }
      }
    },
  });

  const [tonesInputValue, setTonesInputValue] = useState("");
  const [keywordsInputValue, setKeywordsInputValue] = useState("");

  const handleKeywordsKeyDown = (e) => {
    if (e.key === "Enter" && keywordsInputValue.trim() !== "") {
      e.preventDefault();
      formik.setFieldValue("keywords", [
        ...formik.values.keywords,
        keywordsInputValue.trim(),
      ]);
      setKeywordsInputValue("");
    } else {
      return;
    }
  };

  const handleTonesKeyDown = (e) => {
    if (e.key === "Enter" && tonesInputValue.trim() !== "") {
      e.preventDefault();
      formik.setFieldValue("tones", [
        ...formik.values.tones,
        tonesInputValue.trim(),
      ]);
      setTonesInputValue("");
    }
  };

  const handleDeleteTone = (indexToDelete) => {
    const updated = formik.values.tones.filter((_, i) => i !== indexToDelete);
    formik.setFieldValue("tones", updated);
  };

  const handleDeleteKeyword = (indexToDelete) => {
    const updated = formik.values.keywords.filter(
      (_, i) => i !== indexToDelete
    );
    formik.setFieldValue("keywords", updated);
  };

  return (
    <div className="flex flex-col justify-between bg-gray-100 w-full min-h-screen px-3 md:px-5 pt-2 md:pt-4 overflow-x-hidden">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Mobile_Sidebar />

            <ToastContainer />

            <div className="flex gap-2 items-center cursor-pointer">
              <p
                className="text-sm text-gray-500"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </p>
              <p>{">"}</p>

              <p className="text-sm text-[#C40116]">Desired Jobs Title</p>
            </div>

            {/* Add Button */}
            <div className="flex justify-between mt-8">
              <div className="">
                <h1 className="text-3xl  font-semibold">Desired Jobs Title</h1>
              </div>

              <button
                onClick={openModal}
                className="px-3 py-2  text-white bg-gradient-to-br from-[#C40116] to-[#C40116]/50 font-medium w-20 rounded-2xl"
              >
                Add
              </button>
            </div>

            {/* data table */}
            <div style={{ width: "auto", margin: "0 auto" }}>
              
              <div className="datatable-container">
                          {/* Responsive wrapper for the table */}
                          <div className="table-scroll-container" id="datatable">
                            <DataTable
                              data={data}
                              columns={columns}
                              options={{
                                paging: true,
                                searching: true,
                                ordering: true,
                                scrollX: true,
                                responsive: true,
                                autoWidth: false,
                              }}
                              className="display nowrap bg-white"
                            />
              
                          </div>
                        </div>
            </div>

            {isModalOpen && (
              <form onSubmit={formik.handleSubmit}>
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm bg-opacity-50 z-50">
                  {/* Overlay */}
                  <div className="absolute inset-0 " onClick={closeModal}></div>

                  <div
                    className={`fixed top-0 right-0 h-screen overflow-y-auto w-screen sm:w-[90vw] md:w-[45vw] bg-white shadow-lg  transform transition-transform duration-500 ease-in-out ${
                      isAnimating ? "translate-x-0" : "translate-x-full"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full  mt-2 ms-2  border-2 transition-all duration-500 bg-white border-gray-300 flex items-center justify-center cursor-pointer"
                      title="Toggle Sidebar"
                      onClick={closeModal}
                    >
                      <IoIosArrowForward className="w-3 h-3" />
                    </div>

                    <div className="px-5 lg:px-8 py-10">
                      <p className="text-2xl md:text-3xl font-medium">
                        {toneResume ? "Edit" : "Add"} Desired Job Title
                      </p>

                      <div className="mt-8 flex justify-between items-center ">
                        <div className="">
                          <label
                            htmlFor="jobtitle"
                            className="block text-md font-medium mb-2 mt-3"
                          >
                            Desired Job Title{" "}
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="w-[60%] md:w-[70%]">
                          <input
                            type="name"
                            name="name"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                          />

                          {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500">
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between items-start">
                        <label
                          htmlFor="keywords"
                          className="block text-md font-medium mb-2 mt-3"
                        >
                          Keywords <span className="text-red-500">*</span>
                        </label>
                        <div className=" w-[60%] md:w-[70%]">
                          <div className="bg-white border p-4 rounded-xl mt-3">
                            <input
                              type="text"
                              name="keywords"
                              id="keywords"
                              placeholder="Add a keyword and press Enter"
                              className="w-full  rounded-md  h-8 border-none outline-none"
                              value={keywordsInputValue}
                              onChange={(e) =>
                                setKeywordsInputValue(e.target.value)
                              }
                              onKeyDown={handleKeywordsKeyDown}
                            />

                            <div className="mt-4 flex flex-wrap gap-2">
                              {formik?.values?.keywords?.map(
                                (keyword, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                                  >
                                    <span className="mr-2">{keyword}</span>
                                    <button
                                      type="button"
                                      className="text-black hover:text-red-600"
                                      onClick={() => handleDeleteKeyword(index)}
                                    >
                                      &times;
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          {formik.touched.keywords && formik.errors.keywords ? (
                            <div className="text-red-500">
                              {formik.errors.keywords}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between items-start">
                        <label
                          htmlFor="jobtitle"
                          className="block text-md font-medium mb-2 mt-3"
                        >
                          Tones <span className="text-red-500">*</span>
                        </label>

                        <div className=" w-[60%] md:w-[70%]">
                          <div className="bg-white border p-4 rounded-xl mt-3 ">
                            <input
                              type="text"
                              placeholder="Add a tone and press Enter"
                              className="w-full rounded-md  h-8 border-none outline-none"
                              value={tonesInputValue}
                              onChange={(e) =>
                                setTonesInputValue(e.target.value)
                              }
                              onKeyDown={handleTonesKeyDown}
                            />

                            <div className="mt-4 flex flex-wrap gap-2">
                              {formik.values.tones.map((tone, index) => (
                                <div
                                  key={index}
                                  className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                                >
                                  <span className="mr-2">{tone}</span>
                                  <button
                                    type="button"
                                    className="text-black hover:text-red-600"
                                    onClick={() => handleDeleteTone(index)}
                                  >
                                    &times;
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          {formik.touched.tones && formik.errors.tones ? (
                            <div className="text-red-500">
                              {formik.errors.tones}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between items-center">
                        <div className="">
                          <label
                            htmlFor="status"
                            className="block text-md font-medium mb-2 mt-3"
                          >
                            Status <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="w-[60%] md:w-[70%]">
                          <select
                            name="status"
                            id="status"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select a status</option>
                            <option value="1">Active</option>
                            <option value="0">InActive</option>
                          </select>
                          {formik.touched.status && formik.errors.status ? (
                            <div className="text-red-500">
                              {formik.errors.status}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {/* {error.status && <p className="error">{error.status}</p>} */}

                      <div className="flex  justify-end gap-2 mt-14">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="bg-red-100  hover:bg-red-200 text-sm md:text-base text-red-600 px-5 md:px-5 py-1 md:py-2 font-semibold rounded-full"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2 font-semibold rounded-full"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          <Dialog
            header={
              <span className=" ">
                Desired Jobs Title{" "}
                <span
                  style={{
                    color: `${selectedUser?.status === "1" ? "green" : "red"}`,
                    border: `1px solid  ${
                      selectedUser?.status === "1" ? "green" : "red"
                    }`,
                    borderRadius: "9999px",
                    display: "inline-block",
                    textAlign: "center",
                    width: "60px",

                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                >
                  {selectedUser?.status === "1" ? "ACTIVE" : "INACTIVE"}
                </span>
              </span>
            }
            visible={displayBasic}
            className="max-w-[600px]"
            onHide={onHide}
          >
            {renderUserDetails()}
          </Dialog>
        </>
        
      )}
      <Footer />
    </div>
    
  );
  
};
export default DesiredJobTitle;
