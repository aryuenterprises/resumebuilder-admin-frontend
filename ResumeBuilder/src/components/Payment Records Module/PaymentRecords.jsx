import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaEye } from "react-icons/fa";
import Loader from "../Loader";
import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
DataTable.use(DT);
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useDateUtils } from "../../Hooks/useDateUtils";

const PaymentRecords = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");
  console.log("currencySymbol:", currencySymbol);
  const [user, setUser] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [errors, setErrors] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const formatDateTime = useDateUtils();
  

  useEffect(() => {
  setTimeout(() => {
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const selected = data.find((item) => item._id === id);
        showUserDetails(selected);
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
        `${API_URL}/api/payment/payment-records`
      );
      console.log("Payment Records Response:", response.data);
      // console.log("Payment currency:", response.data?.paymentRecord.currencyType);
      if (response.data) {
        setData(response.data?.paymentRecord);
        setCurrencySymbol(response.data?.paymentRecord?.currencyAmount);
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

  const onHide = () => {
    setDisplayBasic(false);
    setUser(null);
  };
  const showUserDetails = (user) => {
    setUser(user);
    setDisplayBasic(true);
  };

  const rolesWithSno = data.map((data, index) => ({
    ...data,
    Sno: index + 1,
  }));

  const [expandedRows, setExpandedRows] = useState([]);

  const columns = [
    {
      title: "Sno",
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
    title: "Date",
    data: "createdAt",
    render: function (data) {
      if (!data) return "-";
      const d = new Date(data);
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const year = d.getFullYear();
      return `${month}/${day}/${year}`;
    },
  },
   {
    title: "Amount",
    data: "currencyAmount",
    render:(data)=> `${data || ""}`,
    // render: function (data, type, row) {
    //   return `£ ${row?.planId?.price || 0}`;
    // },
    // render: (data) => `${currencySymbol} ${data}`,
  },
  

    // {
    //   title: "Name",
    //   body: (row) =>
    //     `${row?.userId?.firstName || ""} ${row?.userId?.lastName || ""
    //       }`.trim() || "-",
    // },

    {
  title: "Name",
  data: null,
  render: function (data, type, row) {
    const first = row?.userId?.firstName || "";
    const last = row?.userId?.lastName || "";
    const fullName = `${first} ${last}`.trim();

    return fullName !== "" ? fullName : "-";
  },
},

    // {
    //   header: "Email",
    //   field: "userId.email",
    // },

    {
      title: "Plan",
      data: "planId.name" || "-",
    },
    // {
    //   header: "Transaction ID",
    //   field: "paymentId" || "-",
    //    body: (row) =>
    //     `${row?.paymentId || "-"}`
    // },
    // {
    //   header: "Card No",
    //   field: "paymentDetails.last4" || "-",
    //    body: (row) =>
    //     `${row?.paymentDetails?.last4 || "-"}`
    // },

     {
    title: "Status",
    data: "status",
    render: function (data, type, row) {
      const color = row.status === "succeeded" ? "green" : "red";
      return `
        <span style="
          color:${color};
          border:1px solid ${color};
          border-radius:9999px;
          padding:2px 10px;
          font-size:12px;
          display:inline-block;
          min-width:80px;
          text-align:center;
          text-transform:capitalize;
        ">
          ${row.status}
        </span>
      `;
    },
  },

{
  title: "Action",
  data: null,
  createdCell: (td, cellData, rowData) => {
    td.innerHTML = ""; // clear cell

    const element = (
      <div className="action-container flex gap-4 justify-center">
        <FaEye
          onClick={() => showUserDetails(rowData)}
          className="text-xl cursor-pointer mt-0"
        />
      </div>
    );

    ReactDOM.render(element, td);
  },
},


  ];

  //  const rowExpansionTemplate = (data) => {
  //   const paymentDetails = data?.paymentDetails;

  //   // Create a single-row data object
  //   const details = [
  //     {
  //       Type: payments?.paymentDetails?.type ?  payments?.paymentDetails?.type : "",
  //       Brand: payments?.paymentDetails?.brand ? payments?.paymentDetails?.brand : "",
  //       Last4: payments?.paymentDetails?.last4 ? payments?.paymentDetails?.last4 : "",
  //       Expiry: `${payments?.paymentDetails?.expiryMonth ? payments?.paymentDetails?.expiryMonth : ""}/${payments?.paymentDetails?.expiryYear ? payments?.paymentDetails?.expiryYear  : ""}`,
  //       Amount: payments?.amount ? payments?.amount : "",
  //       Status: payments?.status ? payments?.status : "",
  //       CreatedAt: payments?.createdAt ? new Date(payments?.createdAt).toLocaleString() : "",
  //       UpdatedAt: payments?.updatedAt ? new Date(payments?.updatedAt).toLocaleString() : "",
  //     },
  //   ];

  //   return (
  //     <div  className="bg-gray-100 px-6 py-2">
  //       <h3 className="text-xl font-semibold pb-2 text-left">Payment Details</h3>
  //       <DataTable
  //         value={details}
  //         showGridlines
  //         responsiveLayout="scroll"
  //         stripedRows
  //       >
  //         <Column field="Type" header="Type" />
  //         <Column field="Brand" header="Brand" />
  //         <Column field="Last4" header="Last 4 Digits" />
  //         <Column field="Expiry" header="Expiry" />
  //         <Column field="Amount" header="Amount" />
  //         <Column field="Status" header="Status" />
  //         <Column field="CreatedAt" header="Created At" />
  //         <Column field="UpdatedAt" header="Updated At" />
  //       </DataTable>
  //     </div>
  //   );
  // };
  let navigate = useNavigate();
  const renderUserDetails = () => {
    if (!user) return null;

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>First Name:</strong>
            <p>{user?.userId?.firstName || "N/A"}</p>
          </div>
          <div>
            <strong>Last Name:</strong>
            <p>{user?.userId?.lastName || "N/A"}</p>
          </div>
          <div>
            <strong>Email:</strong>
            <p>{user?.userId?.email || "N/A"}</p>
          </div>
          <div>
            <strong>Card No:</strong>
            <p>{user?.paymentDetails?.last4 || "N/A"}</p>
          </div>
          <div>
            <strong>Transaction ID:</strong>
            <p>{user?.paymentId || "N/A"}</p>
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

  return (
<div className="bg-gray-100 min-h-screen w-screen px-5 pt-2 md:pt-4 flex flex-col justify-between overflow-x-hidden">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Mobile_Sidebar />

            <div className="flex gap-2 items-center cursor-pointer">
              <p
                className="text-sm text-gray-500"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </p>
              <p>{">"}</p>

              <p className="text-sm text-[#C40116]">Payment History</p>
            </div>

            {/* Add Button */}
            <div className="flex justify-between mt-8">
              <div className="">
                <h1 className="text-3xl  font-semibold">Payment History</h1>
              </div>
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
            User Details{" "}
            <span
              style={{
                color: user?.status === "succeeded" ? "green" : "red",
                border: `1px solid  ${user?.status === "succeeded" ? "green" : "red"
                  }`,
                borderRadius: "9999px",
                display: "inline-block",
                textAlign: "center",
                width: "80px",
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              {user?.status === "succeeded" ? "SUCCEEDED" : "UNSUCCEEDED"}
            </span>
          </span>
        }
        visible={displayBasic}
        className="w-fit"
        onHide={onHide}
      >
        {renderUserDetails()}
      </Dialog>
          </div>
      <Footer />
         </>
      )}
    </div>
  );
};
export default PaymentRecords;
