import React, { useEffect, useState } from "react";
import $ from "jquery";
import ReactDOM from "react-dom";
import { TfiPencilAlt } from "react-icons/tfi";
import ReactDOMServer from "react-dom/server";
import { RiDeleteBin6Line } from "react-icons/ri";
import aryu_logo from "../../assets/aryu_logo.svg";
import { Dialog } from "primereact/dialog";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
DataTable.use(DT);
import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";
import { InputText } from "primereact/inputtext";
import { Header } from "../Header";
import { API_URL } from "../../config";
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { InputSwitch } from "primereact/inputswitch";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

const UserList_Mainbar = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBilling, setSelectedBilling] = useState(null);
  console.log("selectbilling", selectedBilling)
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showBillingDialog, setShowBillingDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currencySymbol, setCurrencySymbol] = useState("");
  
  const dataWithSno = data.map((data, index) => ({
    ...data,
    Sno: index + 1, // Add Sno field
  }));

  const handleStatusChange = async (userId, newValue) => {
    try {
      const newStatus = newValue ? 1 : 0;

      const response = await axios.put(
        `${API_URL}/api/users/particular-user-edit/${userId}`,
        { status: newStatus }
      );
      fetchData();
      toast.success("User status updated successfully.");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDialog(true);
  };

  const showBillingDetails = (user) => {
    setSelectedBilling(user);
    setShowBillingDialog(true);
  };

  const onHideUser = () => {
    setShowUserDialog(false);
    setSelectedUser(null);
  };

  const onHideBilling = () => {
    setShowBillingDialog(false);
    setSelectedBilling(null);
  };

  let navigate = useNavigate();
  const handleViewClick = (id) => {
    navigate("/user-resume-details", { state: { userId: id } });
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
      title: "First Name",
      data: "firstName",
    },
    {
      title: "Last Name",
      data: "lastName",
    },
    {
      title: "Email",
      data: "email",
    },

    // Billing
    {
      title: "Billing",
      data: "billing",
      render: (data, type, row) =>
        ReactDOMServer.renderToString(
          <div className="action-container flex gap-4 justify-center">
            <FaEye
              className="billing-eye text-xl cursor-pointer"
              data-id={row.id}
            />
          </div>
        ),
    },

    // Email Verified
    {
      title: "Email Verified",
      data: "isVerified",
      render: (data, type, row) =>
        ReactDOMServer.renderToString(
          <span
            style={{
              backgroundColor: row.isVerified ? "#d1fae5" : "#fee2e2",
              color: row.isVerified ? "#065f46" : "#991b1b",
              padding: "4px 10px",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            {row.isVerified ? "Verified" : "Not Verified"}
          </span>
        ),
    },

    // Resume View
    {
      title: "Resume View",
      data: "resumeView",
      render: (data, type, row) =>
        ReactDOMServer.renderToString(
          <div className="flex gap-4 justify-center">
            <FaEye
              className="resume-eye text-xl cursor-pointer "
              data-id={row.id}
            />
          </div>
        ),
    },

    // Action Column
    {
      title: "Action",
      data: "actions",
      render: (data, type, row) =>
        ReactDOMServer.renderToString(
          <div className="flex gap-4 justify-center">
            <InputSwitch
              className="status-switch"
              checked={row.status == 1}
              data-id={row.id}
            />
            <FaEye
              className="user-eye text-xl cursor-pointer"
              data-id={row.id}
            />
            <MdOutlineDeleteOutline
              className="delete-eye text-red-600 text-xl cursor-pointer"
              data-id={row.id}
            />
          </div>
        ),
    },
  ];


  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/all-user-list`);
      setData(response.data?.users);
      setCurrencySymbol(response.data?.users?.currencyAmount);
      console.log("dsd",response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do You Want To Delete This User?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(
          `${API_URL}/api/users/particular-user-delete/${id}`
        );
        toast.success("User has been deleted.");
        fetchData();
      } catch (error) {
        console.error("Error deleting User:", error);
        Swal.fire("Error!", "Failed to delete User.", "error");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedColumns, setSelectedColumns] = useState(columns);

  const onColumnToggle = (event) => {
    let selected = event.value;
    setSelectedColumns(selected);
  };

  const renderUserDetails = () => {
    if (!selectedUser) return null;

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>First Name:</strong>
            <p>{selectedUser.firstName || "N/A"}</p>
          </div>
          <div>
            <strong>Last Name:</strong>
            <p>{selectedUser.lastName || "N/A"}</p>
          </div>
          <div>
            <strong>Email:</strong>
            <p>{selectedUser.email || "N/A"}</p>
          </div>
          <div>
            <strong>Phone:</strong>
            <p>{selectedUser.phone || "N/A"}</p>
          </div>
          <div>
            <strong>City:</strong>
            <p>{selectedUser.city || "N/A"}</p>
          </div>
          <div>
            <strong>State:</strong>
            <p>{selectedUser.state || "N/A"}</p>
          </div>
          <div>
            <strong>Country:</strong>
            <p>{selectedUser.country || "N/A"}</p>
          </div>
          <div>
            <strong>Status: </strong>
            <p
              style={{
                color: selectedUser?.status === "1" ? "green" : "red",
                border: `1px solid  ${selectedUser?.status === "1" ? "green" : "red"
                  }`,

                borderRadius: "9999px",
                display: "inline-block",
                textAlign: "center",
                width: "80px",
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              {selectedUser?.status === "1" ? "ACTIVE" : "INACTIVE"}
            </p>
          </div>
        </div>
        {/* {selectedUser._id && (
          <div className="mt-4">
            <strong>User ID:</strong>
            <p className="text-xs text-gray-600 break-all">
              {selectedUser._id}
            </p>
          </div>
        )} */}
      </div>
    );
  };

  const renderBillingDetails = () => {
    if (!selectedBilling) {
      return null;
    }

    const plans = selectedBilling.planSubscriptions;

    if (!plans || plans.length === 0) {
      return (
        <div className="py-4 text-center text-gray-600 font-medium">
          No Transaction Found
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-4 border p-3 rounded-lg shadow-sm"
          >
            <div>
              <strong>Card:</strong>
              <p>
                {plan?.paymentDetails?.last4
                  ? `**** **** **** ${plan.paymentDetails.last4}`
                  : "N/A"}
              </p>
            </div>

            <div>
              <strong>Transaction ID:</strong>
              <p>{plan?.paymentId || "N/A"}</p>
            </div>

            <div>
              <strong>Plan Price:</strong>
              <p>{plan?.currencyAmount || ""}</p>
            </div>

            <div>
              <strong>Plan Name:</strong>
              <p>{plan?.planId?.name || "N/A"}</p>
            </div>

            <div>
              <strong>Status: </strong>
              <p
                style={{
                  color: plan?.status === "succeeded" ? "green" : "red",
                  border: `1px solid ${plan?.status === "succeeded" ? "green" : "red"
                    }`,
                  borderRadius: "9999px",
                  display: "inline-block",
                  textAlign: "center",
                  width: "100px",
                  fontSize: "10px",
                  fontWeight: 500,
                }}
              >
                {plan?.status?.toUpperCase() || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between bg-gray-100 w-full min-h-screen px-3 md:px-5 pt-2 md:pt-4 overflow-x-hidden">
      <div className="">
        <Mobile_Sidebar />

        <ToastContainer />

        {/* breadcrumb */}

        <div className="flex gap-2 items-center cursor-pointer">
          <p
            className="text-sm text-gray-500"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </p>
          <p>{">"}</p>

          <p className="text-sm text-[#C40116]">Registered Users</p>
        </div>
        <div className="mt-8">
          <h1 className="text-3xl  font-semibold">Registered Users</h1>
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

                  createdRow: (row, rowData) => {
                    ``
                    $(row)
                      .find(".billing-eye")
                      .on("click", () => showBillingDetails(rowData));

                    $(row)
                      .find(".resume-eye")
                      .on("click", () => handleViewClick(rowData.id));

                    $(row)
                      .find(".user-eye")
                      .on("click", () => showUserDetails(rowData));

                    $(row)
                      .find(".delete-eye")
                      .on("click", () => deleteUser(rowData.id));

                    $(row)
                      .find(".status-switch")
                      .on("click", () =>
                        handleStatusChange(rowData.id, rowData.status == 0)
                      );
                    

                  },
                  
                }}
                className="display nowrap bg-white"
              />

            </div>
          </div>
        </div>

        <Dialog
          header={<span className=" ">User Details </span>}
          visible={showUserDialog}
          className="w-fit"
          onHide={onHideUser}
        >
          {renderUserDetails()}
        </Dialog>

        {/* billing*/}
        <Dialog
          header={<span className=" ">Billing </span>}
          visible={showBillingDialog}
          className="w-fit"
          onHide={onHideBilling}
        >
          {renderBillingDetails()}
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default UserList_Mainbar;
