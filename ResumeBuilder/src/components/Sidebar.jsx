import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { BsCalendar4 } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import { CiDeliveryTruck, CiBoxList, CiMail } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdLogout,
  MdOutlineAdminPanelSettings,
  MdPayment,
  MdWorkOutline,
} from "react-icons/md";
import { BsCalendar2Check } from "react-icons/bs";
import resumemint_logo from "../../public/resumemint_logo.png"
import { FaRegMessage } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";
import { TbDeviceIpadDollar, TbUrgent } from "react-icons/tb";
import Cookies from "js-cookie";
import { RiContactsLine, RiFileUserLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { FaRegFileAlt } from "react-icons/fa";
import { SettingsContext } from "../App";
import aryuSmartCVLogo from '../assets/aryuLogo.png'

const Sidebar = () => {

   const { logoPreview } = useContext(SettingsContext);

  //  console.log("logoPreviewdd",logoPreview)
  const [arrowClicked, setArrowClicked] = useState(() => {
    // Get the persisted state from localStorage
    const savedState = localStorage.getItem("sidebarState");
    return savedState === "true";
  });
  const [selectAnyOneClicked, setSelectAnyOneClicked] = useState(false);
  let navigate = useNavigate();
  const [dropdownShow, setDropdownShow] = useState(false);

  const onClickArrow = () => {
    const newState = !arrowClicked;
    setArrowClicked(newState);
    localStorage.setItem("sidebarState", newState); // Persist the new state
  };

  const onClickSidebarMenu = (path) => {
    if (path === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      navigate(`/${path.toLowerCase()}`);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const onChangeSelect = (e) => {
    let value = e.target.value;
    let location = value.toLowerCase();
    navigate(`/${location}`);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("admin_token");
    navigate("/");
    window.location.reload();
  };

  const location = useLocation();
  const activePath = location.pathname;

  const sidebarMenuItems = [
    { label: "Dashboard", path: "dashboard", icon: <CiBoxList /> },
    { label: "Registered Users", path: "users-list", icon: <LuUsers /> },
    // {
    //   label: "Desired Jobs Title",
    //   path: "desired-jobs-title",
    //   icon: <MdWorkOutline />,
    // },
    {
      label: "Plan Subscription",
      path: "plan-subscription",
      icon: <TbDeviceIpadDollar />,
    },
    // { label: "Users Resume List", path: "users-resume-data", icon: <RiFileUserLine /> },
    { label: "Payment History", path: "payment-history", icon: <MdPayment /> },
    { label: "Contact", path: "contact", icon: <CiMail /> },
  ];

  
//   const [logoPreview, setLogoPreview] = useState("");

//   console.log("logoPreview", logoPreview);


// useEffect(() => {
//   const savedLogo = localStorage.getItem("dashboardLogo");
//   if (savedLogo) {
//     setLogoPreview(savedLogo);
//   }
// }, []);

  return (
    <div>
      <section
        className={`bg-white max-md:hidden max-h-dvh overflow-y-scroll transition-all duration-500 flex flex-col  ${
          arrowClicked ? "w-[60px]" : "w-52"
        }`}
      >
        <div className="fixed flex flex-col  h-full">
          {/* Toggle Button */}
          <div
            className="flex justify-end  mt-3 items-center"
            onClick={onClickArrow}
            title="Toggle Sidebar"
          >
            <div
              className={`${
                arrowClicked ? "-me-3" : "-me-8"
              } w-6 h-6 rounded-full  border-2 transition-all duration-500 bg-white border-gray-300 flex items-center justify-center cursor-pointer`}
            >
              {arrowClicked ? (
                <IoIosArrowForward className="w-3 h-3" />
              ) : (
                <IoIosArrowBack className="w-3 h-3" />
              )}
            </div>
          </div>

          {arrowClicked ? (
            <div className=" ms-4 text-xl font-semibold">
              {/* <img src={resumint_logo} alt="" className="h-8 w-8 " /> */}
              <h1 className="text-gray-800 cursor-pointer">
                {" "}
                <a href="/">R<span className="text-[#46c3e9]">M</span></a>
              </h1>
            </div>
          ) : (
            // <img src={medicsresearch_logo} alt="" className="h-12 w-24 ms-8" />
            // <img src={aryu_logo} alt="" className="h-20 w-24 ms-8" />

            // <h1 className="text-blue-600 text-2xl font-semibold ms-8 cursor-pointer">
            //   <a href="/">ResuMint</a>
            // </h1>
            <img   src={aryuSmartCVLogo} alt="Logo" className="h-10 w-25 mx-auto " />
          )}

          {/* Sidebar Menu */}
          <div
            className={`${
              !arrowClicked && ""
            } flex-grow w-full p-1 mt-8 flex flex-col justify-between ${
              arrowClicked ? "" : "overflow-y-auto"
            }`}
          >
            <div
              className={`flex gap-1  flex-col ${
                arrowClicked ? "items-center" : "items-start"
              }  `}
            >
              {sidebarMenuItems.map((item) => (
                <div
                  key={item.path}
                  onClick={() => onClickSidebarMenu(item.path)}
                  className={`
            flex w-full items-center flex-grow 
            ${arrowClicked ? "justify-center" : "justify-normal"}
             ${
               activePath === `/${item.path}`
                 ? "bg-red-100 text-[#C40116]"
                 : "text-gray-500"
             }
            hover:bg-red-50 hover:text-[#C40116]/80
            px-2 py-3 h-10 rounded-full gap-3  text-sm font-medium cursor-pointer
          `}
                >
                  {item.icon}
                  {!arrowClicked && <p className="text-sm">{item.label}</p>}
                </div>
              ))}
            </div>

            {/* settings */}
            <div className="flex flex-col gap-2 ">
              <hr className="ml-3" />
              <div
                onClick={() => onClickSidebarMenu("settings")}
                className={`
            flex w-full items-center flex-grow
            ${arrowClicked ? "justify-center" : "justify-normal"}
             ${activePath === `/settings` ? "bg-red-100 text-[#C40116]" : "text-gray-500"}
                        hover:bg-red-50 hover:text-[#C40116]/80 

            px-2 py-3 h-10 rounded-full gap-3  text-sm font-medium cursor-pointer
          `}
              >
                <IoSettings />

                {!arrowClicked && <p className="text-sm">Settings</p>}
              </div>
              {/* logout */}
              <div
                onClick={handleLogout}
                className={`flex items-center mb-2 ${
                  arrowClicked ? "justify-center" : "justify-normal"
                } px-3 py-3 gap-3 items-center  bg-[#C40116] rounded-full cursor-pointer`}
              >
                <div className="text-white flex items-center justify-center">
                  <MdLogout />
                </div>
                {!arrowClicked && (
                  <p className="text-sm font-medium text-white">Logout</p>
                )}
              </div>
            </div>
          </div>

          {/* User Section */}
          <div>
            <hr className="border-gray-300" />
            <div className="flex items-center gap-3 px-2 py-4">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                <MdOutlineAdminPanelSettings />
              </div>
              {!arrowClicked && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-gray-500">
                      Welcome back
                    </p>
                  </div>
                  <p className="font-medium text-sm  text-[#C40116]">Admin</p>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
