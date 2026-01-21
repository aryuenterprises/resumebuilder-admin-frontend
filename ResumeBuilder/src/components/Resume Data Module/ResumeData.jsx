import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { API_URL } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";
import { useNavigate } from "react-router-dom";

const ResumeData = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);

  const dataWithSno = data.map((dataItem, index) => ({
    ...dataItem,
    Sno: index + 1,
  }));

  let navigate = useNavigate();
  const handleViewClick = (id) => {
    navigate("/user-resume-details", { state: { userId: id } });
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
      header: "S.no",
      field: "Sno",
    },
    {
      field: "firstName",
      header: "First Name",
    },
    {
      field: "lastName",
      header: "Last Name",
    },
    {
      field: "email",
      header: "Email",
    },
    // {
    //   header: "View Details",
    //   field: null,
    //   render: (row) => (
    //     <button
    //       onClick={() => showUserDetails(row)}
    //       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
    //     >
    //       <FaEye />
    //     </button>
    //   ),
    // },
    {
      header: "Action",
      field: null,
      render: (row) => (
        <div className="action-container flex gap-4 justify-center">
          <FaEye
            onClick={() => handleViewClick(row._id)}
            className=" text-xl cursor-pointer"
          />
          <MdOutlineDeleteOutline
            onClick={() => deleteUser(row._id)}
            className="text-red-600 text-xl cursor-pointer"
          />
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/contact-resume/get-all-contact`
      );
      setData(response.data);
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
        await axios.delete(
          `${API_URL}/api/users/particular-user-delete/${id}`
        );
        toast.success("User has been deleted.");
        // refresh list
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
            <strong>Status:</strong>
            <p>{selectedUser.status === 1 ? "Active" : "Inactive"}</p>
          </div>
        </div>
        {selectedUser._id && (
          <div className="mt-4">
            <strong>User ID:</strong>
            <p className="text-xs text-gray-600 break-all">
              {selectedUser._id}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-between w-screen min-h-screen px-5 pt-2 md:pt-5">
      <div>
        <Mobile_Sidebar />

        <div className="flex gap-2 mt-5 text-sm items-center">
          <p className=" text-blue-500 ">Users Resume List</p>
          <p>{">"}</p>
        </div>

        <div>
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-2xl md:text-3xl font-semibold mt-5 md:mt-8">
              Users Resume List
            </p>
          </div>
        </div>

        <div style={{ width: "auto", margin: "0 auto" }}>
          <div className="mt-8 flex justify-end gap-4">
            <InputText
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search"
              className="px-2 py-2 rounded-md"
            />
          </div>

          <DataTable
            className="mt-8 display nowrap bg-white"
            value={dataWithSno}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
            globalFilter={globalFilter}
            showGridlines
            resizableColumns
          >
            {selectedColumns.map((col, index) => (
              <Column
                key={index}
                field={col.field}
                header={col.header}
                body={(rowData) =>
                  col.render ? col.render(rowData) : rowData[col.field]
                }
              />
            ))}
          </DataTable>
        </div>

        <Dialog
          header="User Details"
          visible={displayBasic}
          style={{ width: "50vw" }}
          onHide={onHide}
        >
          {renderUserDetails()}
        </Dialog>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ResumeData;
