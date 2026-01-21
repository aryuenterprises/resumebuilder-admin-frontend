import React from "react";
import { useEffect, useState } from "react";
import { BiSolidMessageAltAdd } from "react-icons/bi";
import sample from "../../assets/sample.jpg";
import { useNavigate } from "react-router-dom";
import zigzaglines_small from "../../assets/zigzaglines_small.svg";
import { BsBellFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsCalendar4 } from "react-icons/bs";
import { CiDeliveryTruck, CiBoxList } from "react-icons/ci";
import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";

const Employees_Card = () => {
  let navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the currentTime every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatHours = (hours) =>
    hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const formatNumber = (number) => (number < 10 ? `0${number}` : number);

  const day = days[currentTime.getDay()];
  const month = months[currentTime.getMonth()];
  const date = currentTime.getDate();
  const hours = formatHours(currentTime.getHours());
  const minutes = formatNumber(currentTime.getMinutes());
  const seconds = formatNumber(currentTime.getSeconds());
  const amPm = currentTime.getHours() >= 12 ? "PM" : "AM";

  let cardData = [
    {
      employee_Image: sample,
      employee_Name: "Janani",
      employee_Position: "CEO",
      employee_mailId: "ddsfds@dfde.efesf",
    },
    {
      employee_Image: sample,
      employee_Name: "Janani",
      employee_Position: "CEO",
      employee_mailId: "ddsfds@dfde.efesf",
    },
    {
      employee_Image: sample,
      employee_Name: "Janani",
      employee_Position: "CEO",
      employee_mailId: "ddsfds@dfde.efesf",
    },
    {
      employee_Image: sample,
      employee_Name: "Janani",
      employee_Position: "CEO",
      employee_mailId: "ddsfds@dfde.efesf",
    },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
    // {
    //   employee_Image: sample,
    //   employee_Name: "Janani",
    //   employee_Position: "CEO",
    //   employee_mailId: "ddsfds@dfde.efesf",
    // },
  ];

  function onClickAddNewMember() {
    navigate("/createemployee");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function onClickCard() {
    navigate("/employeedetails");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 w-screen  px-3 pt-2 md:pt-5 ">
      <div>
        <Mobile_Sidebar />

        {/* header */}
        <div className="flex  justify-between items-center bg-white px-2 py-2 mt-5  rounded-2xl">
          <input
            type="text"
            className="w-32 sm:w-56 md:basis-[50%] ps-2   placeholder-black border-none outline-none  py-2 "
            placeholder="Search by name, position"
          />

          <div className="flex w-fit md:basis-[50%] flex-row items-center justify-end gap-4 lg:gap-8 lg:w-auto">
            <div className="flex items-center gap-2 lg:gap-5">
              <BsBellFill className="text-lg lg:text-xl text-gray-400 cursor-pointer" />
              <IoMdSettings className="text-lg lg:text-xl text-gray-400 cursor-pointer" />
              <div className="h-6 w-6  bg-gray-200 rounded-full cursor-pointer"></div>
              <p className="cursor-pointer ">ENG</p>
            </div>

            <div className="font-medium text-sm max-md:hidden lg:text-base text-center lg:text-left">
              <span>{day}, </span>
              <span>{month} </span>
              <span>{date}, </span>
              <span className="inline-block  text-center">
                {hours}:{minutes} {amPm}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-5 text-sm items-center">
          <p className=" text-blue-500 ">Employees</p>
          <p>{">"}</p>
        </div>

        <div className="flex flex-wrap flex-col md:flex-row  justify-between ">
          <p className="text-2xl md:text-3xl font-semibold mt-5 md:mt-8">
            Employees
          </p>
          <button
            onClick={onClickAddNewMember}
            className="bg-blue-600 w-fit text-xs md:text-base  mt-5 md:mt-8 text-white font-medium px-3 py-2 rounded-full "
          >
            Add New Member{" "}
            <BiSolidMessageAltAdd className="inline-block  ms-3" />
          </button>
        </div>

       

        {/* <div className="flex flex-wrap justify-center md:justify-start mt-10 gap-8">
          {cardData.map((item, index) => (
            <div
              key={index}
              onClick={onClickCard}
              className="relative w-64 h-80 bg-cover cursor-pointer hover:-translate-y-1 transition-transform rounded-2xl shadow-lg"
            >
              <img
                src={zigzaglines_small}
                alt=""
                className="absolute inset-0 rounded-2xl object-cover w-full h-full"
              />

              <div className="flex flex-col items-center justify-center gap-4 absolute inset-0 p-4">
                <img
                  src={item.employee_Image}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {item.employee_Name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.employee_Position}
                  </p>
                  <p className="text-sm text-gray-700">
                    {item.employee_mailId}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
          {cardData.map((item, index) => (
            <div
              key={index}
              onClick={onClickCard}
              className="relative w-full h-80 bg-cover cursor-pointer hover:-translate-y-1 transition-transform rounded-2xl shadow-lg"
            >
              <img
                src={zigzaglines_small}
                alt=""
                className="absolute inset-0 rounded-2xl object-cover w-full h-full"
              />

              <div className="flex flex-col items-center justify-center gap-4 absolute inset-0 p-4">
                <img
                  src={item.employee_Image}
                  alt=""
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {item.employee_Name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.employee_Position}
                  </p>
                  <p className="text-sm text-gray-700">
                    {item.employee_mailId}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Employees_Card;
