import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
DataTable.use(DT);
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // PrimeReact core CSS
import { InputText } from "primereact/inputtext";
import Mobile_Sidebar from "../Mobile_Sidebar";
import axios from "axios";
import { API_URL } from "../../config";
import { Header } from "../Header";
import { Dropdown } from "primereact/dropdown";
import { FaEye } from "react-icons/fa";
import ReactDOM from "react-dom";



const Contacts_Mainbar = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  

  const dataWithSno = data.map((data, index) => ({
    ...data,
    Sno: index + 1,
  }));

 const [displayBasic, setDisplayBasic] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

const showUserDetails = (rowData) => {
  setSelectedUser(rowData);
  setDisplayBasic(true);
};


  const columns = [
  {
    title: "Sno",
    data: null,
    render: (data, type, row, meta) => meta.row + 1,
  },
  {
    title: "Name",
    data: "name",
    defaultContent: "-",
  },
  {
    title: "Email",
    data: "email",
    defaultContent: "-",
  },
  // {
  //   title: "Message",
  //   data: "message",
  //   defaultContent: "-",
  // },

  {
    title: "Action",
    data: null,
    createdCell: (td, cellData, rowData) => {
      td.innerHTML = ""; // clear cell
  
      const element = (
        <div className="action-container flex gap-4 justify-center" title="View">
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


 

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/contacts/all-lsit`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen w-screen px-5 pt-2 md:pt-4 flex flex-col justify-between overflow-x-hidden">
      <div>
        <Mobile_Sidebar />

        {/* breadcrumb */}
        <div className="flex gap-2  text-sm items-center ">
          <p
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </p>
          <p>{">"}</p>
          <p className=" text-[#C40116] ">Contact</p>
          <p>{">"}</p>
        </div>

        <div>
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-2xl md:text-3xl font-semibold mt-5 md:mt-8">
              Contact
            </p>
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

{displayBasic && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
    <div className="bg-white p-6 rounded-xl shadow-xl w-[50%] max-h-[70vh] overflow-hidden relative animate-scaleIn">

      {/* Close Button */}
      <button
        onClick={() => setDisplayBasic(false)}
        className="absolute right-3 top-3 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-4 ">Message</h2>

      {selectedUser ? (
        <div className="space-y-2 text-gray-700 max-h-[55vh] overflow-y-auto pr-2 scroll-smooth custom-scroll">
          <p className="leading-relaxed">{selectedUser.message}</p>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  </div>
)}


          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contacts_Mainbar;
