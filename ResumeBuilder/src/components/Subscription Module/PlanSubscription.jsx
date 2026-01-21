import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Loader from "../Loader";
import { TfiPencilAlt } from "react-icons/tfi";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
DataTable.use(DT);
import Swal from "sweetalert2";
import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import { API_URL } from "../../config";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog } from "primereact/dialog";
import { FaEye } from "react-icons/fa";
import { Editor } from "primereact/editor";
import { formatHtml } from "../../utils/formatHtml";
import { Dropdown } from "primereact/dropdown";

const PlanSubscription = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");


  useEffect(() => {
  setTimeout(() => {
    document.querySelectorAll(".edit-icon").forEach((el) => {
      el.onclick = () => {
        const id = el.getAttribute("data-id");
        const row = data.find((i) => i._id === id);
        openEditModal(row);
      };
    });

    document.querySelectorAll(".view-icon").forEach((el) => {
      el.onclick = () => {
        const id = el.getAttribute("data-id");
        const row = data.find((i) => i._id === id);
        showUserDetails(row);
      };
    });

    document.querySelectorAll(".delete-icon").forEach((el) => {
      el.onclick = () => {
        const id = el.getAttribute("data-id");
        deleteJobTitle(id);
      };
    });
  }, 300);
}, [data]);

  useEffect(() => {
    fetchPlanSubscription();
  }, []);

  const [errors, setErrors] = useState({});

  const [isAnimating, setIsAnimating] = useState(false);

  const fetchPlanSubscription = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/plan-subscription/get-all-plan-subscription`
      );

      if (response.data) {
        setData(response.data?.planSubscriptionDetails);
        setCurrencySymbol(response.data?.setting[0]?.currencyType);
        setLoading(false);
      } else {
        setErrors("Failed to fetch Job title.");
      }
    } catch (err) {
      setErrors("Failed to fetch job title.");
      setLoading(false);
    }
  };

  // Open and close modals
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeAddModal = () => {
    formik.resetForm();
    setPlanSubscriptionDetails(null);
    setIsAnimating(false);
    setTimeout(() => setIsAddModalOpen(false), 250);
  };

  const [planSubscriptionDetails, setPlanSubscriptionDetails] = useState(null);

  const openEditModal = (row) => {
    setPlanSubscriptionDetails(row);
    setIsAddModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const rolesWithSno = data.map((data, index) => ({
    ...data,
    Sno: index + 1, // Add Sno field
  }));

  const deleteJobTitle = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Plan Subscription?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${API_URL}/api/plan-subscription/delete/${id}`
        );
        toast.success("Plan Subscription has been deleted.");
        fetchPlanSubscription();
      } catch (error) {
        console.error("Error deleting job title:", error);
        Swal.fire("Error!", "Failed to delete job title.", "error");
      }
    }
  };

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
    },
    // {
    //   header: "Description",
    //   field: "description",
    // },
    {
      title: "Price",
      data: "price",
      render: (data) => `${currencySymbol} ${data}`, // ✅ Adds the euro sign before the price
    },

    {
  title: "Status",
  data: "status",
  render: function (data) {
    const color = data === "1" ? "green" : "red";
    const text = data === "1" ? "ACTIVE" : "INACTIVE";

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
          padding:3px 6px;
        "
      >
        ${text}
      </span>
    `;
  }
},


    // {
    //   title: "Action",
    //   data: null,
    //   render: (data, type, row) => (
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
{
  title: "Action",
  data: null,
  orderable: false,
  createdCell: (td, cellData, rowData) => {
    td.innerHTML = ""; // Clear cell first

    const icons = (
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <TfiPencilAlt
          className="cursor-pointer text-black text-lg"
          onClick={() => openEditModal(rowData)}
        />
        <FaEye
          className="cursor-pointer text-gray-600 text-lg"
          onClick={() => showUserDetails(rowData)}
        />
        <MdOutlineDeleteOutline
          className="cursor-pointer text-red-600 text-xl"
          onClick={() => deleteJobTitle(rowData._id)}
        />
      </div>
    );

    ReactDOM.render(icons, td);
  },
},


  ];

  let navigate = useNavigate();
  // const [jobTitles, setJobTitles] = useState([]);
  // useEffect(() => {
  //   // Fetch job titles from API
  //   axios
  //     .get(`${API_URL}/api/desired-job-title/desired-job-title`)
  //     .then((response) => {
  //       setJobTitles(response.data || []); // Assuming response.data is an array of job titles
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching job titles:", error);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  const formik = useFormik({
    initialValues: {
      name: planSubscriptionDetails ? planSubscriptionDetails.name : "",
      description: planSubscriptionDetails
        ? planSubscriptionDetails.description
        : "",
      price: planSubscriptionDetails ? planSubscriptionDetails.price : "",
      status: planSubscriptionDetails ? planSubscriptionDetails.status : "",
      plan: planSubscriptionDetails ? planSubscriptionDetails.plan : "",
      order: planSubscriptionDetails ? planSubscriptionDetails.order : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Title Is Required"),
      description: Yup.string().required("Description Is Required"),
      price: Yup.number().required("Price Is Required"),
      plan: Yup.string().required("Plan Is Required"),
      order: Yup.number()
        .required("Order Is Required")
        .moreThan(0, "Order must be greater than 0"),
      status: Yup.number().required("Status Is Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (planSubscriptionDetails) {
          await axios.put(
            `${API_URL}/api/plan-subscription/edit/${planSubscriptionDetails._id}`,
            {
              name: values.name,
              description: values.description,
              price: values.price,
              status: values.status,
              plan: values.plan,
              order: values.order,
            }
          );
          toast.success("Plan Subscription Updated Successfully.");
          formik.resetForm();
        } else {
          const response = await axios.post(
            `${API_URL}/api/plan-subscription/create`,
            {
              name: values.name,
              description: values.description,
              price: values.price,
              status: values.status,
              plan: values.plan,
              order: values.order,
            }
          );
          toast.success("Plan Subscription Created Successfully.");
        }

        setIsAddModalOpen(false);
        fetchPlanSubscription();
        setErrors({});
        setJobName("");
        setStatus("");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors); // Set validation errors from API
        } else {
          console.error("Error submitting form:", err);
        }
      }
    },
  });

  const renderUserDetails = () => {
    if (!selectedUser) return null;

    return (
      <div className="space-y-3">
        <div className="">
          <div className="flex flex-col gap-4">
            <div>
              <strong>Job Title:</strong>
              <p>{selectedUser.name || "N/A"}</p>
            </div>
            <div>
              <strong>Price:</strong>
              <p>{selectedUser.price || "N/A"}</p>
            </div>
            <div>
              <strong>Description:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: formatHtml(selectedUser.description),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between bg-gray-100 min-h-screen w-screen px-5 pt-2 md:pt-4 overflow-x-hidden">
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

              <p className="text-sm text-[#C40116]">Plan Subscription</p>
            </div>

            {/* Add Button */}
            <div className="flex justify-between mt-8">
              <div className="">
                <h1 className="text-3xl  font-semibold">Plan Subscription</h1>
              </div>

              <button
                onClick={openAddModal}
                className="px-3 py-2  text-white bg-gradient-to-br from-[#C40116] to-[#C40116]/50  font-medium w-20 rounded-2xl"
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

            <Dialog
              header={
                <span className=" ">
                  Plan Subscription{" "}
                  <span
                    style={{
                      color: `${
                        selectedUser?.status === "1" ? "green" : "red"
                      }`,
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
              className="w-fit"
              onHide={onHide}
            >
              {renderUserDetails()}
            </Dialog>

            {isAddModalOpen && (
              <form onSubmit={formik.handleSubmit}>
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm bg-opacity-50 z-50">
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 "
                    onClick={closeAddModal}
                  ></div>

                  <div
                    className={`fixed top-0 right-0 h-screen overflow-y-auto w-screen sm:w-[90vw] md:w-[45vw] bg-white shadow-lg  transform transition-transform duration-500 ease-in-out ${
                      isAnimating ? "translate-x-0" : "translate-x-full"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full  mt-2 ms-2  border-2 transition-all duration-500 bg-white border-gray-300 flex items-center justify-center cursor-pointer"
                      title="Toggle Sidebar"
                      onClick={closeAddModal}
                    >
                      <IoIosArrowForward className="w-3 h-3" />
                    </div>

                    <div className="px-5 lg:px-14 py-10">
                      <p className="text-2xl md:text-3xl font-medium">
                        {planSubscriptionDetails ? "Edit" : "Add"} Plan
                        Subscription
                      </p>

                      <div className="mt-8 flex justify-between items-center ">
                        <div className="">
                          <label
                            htmlFor="jobtitle"
                            className="block text-md font-medium mb-2 mt-3"
                          >
                            Name <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="w-[60%] md:w-[70%]">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500">
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between  ">
                        <div className="">
                          <label
                            htmlFor="jobtitle"
                            className="block text-md font-medium mb-2 mt-3"
                          >
                            Description <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="w-[60%] md:w-[70%] rounded-lg">
                          <Editor
                            onTextChange={(e) => {
                              // e.htmlValue contains the HTML formatted text
                              formik.setFieldValue("description", e.htmlValue);
                            }}
                            style={{ height: "220px" }}
                            id="description"
                            name="description"
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="w-full  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {formik.touched.description &&
                          formik.errors.description ? (
                            <div className="text-red-500">
                              {formik.errors.description}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between items-center ">
                        <div className="">
                          <label
                            htmlFor="jobtitle"
                            className="block text-md font-medium mb-2 mt-3"
                          >
                            Price <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="w-[60%] md:w-[70%]">
                          <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {formik.touched.price && formik.errors.price ? (
                            <div className="text-red-500">
                              {formik.errors.price}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between items-center">
                        <div className="">
                          <label
                            htmlFor="plan"
                            className="block text-md font-medium mb-2 mt-3"
                          >
                            Plan <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="w-[60%] md:w-[70%]">
                          <select
                            name="plan"
                            id="plan"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.plan}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select a plan</option>
                            <option value="free">Free</option>
                            <option value="one time">One Time</option>
                            <option value="unlimited">Unlimited</option>
                            <option value="7-days access">7-days access</option>
                          </select>
                          {formik.touched.plan && formik.errors.plan ? (
                            <div className="text-red-500">
                              {formik.errors.plan}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between items-center">
                        <div className="">
                          <label
                            htmlFor="order"
                            className="block text-md font-medium mb-2 mt-3"
                          >
                            Order <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="w-[60%] md:w-[70%]">
                          <input
                            type="number"
                            id="order"
                            name="order"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.order}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {formik.touched.order && formik.errors.order ? (
                            <div className="text-red-500">
                              {formik.errors.order}
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
                          onClick={closeAddModal}
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
        </>
      )}
      <Footer />
    </div>
  );
};
export default PlanSubscription;
