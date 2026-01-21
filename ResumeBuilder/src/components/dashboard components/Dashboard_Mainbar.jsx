import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar_style.css";
import { Line, Circle } from "rc-progress";
import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";
import { Header } from "../Header";

const Dashboard_Mainbar = () => {
  const [value, onChange] = useState(new Date());

  let navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between overflow-x-hidden bg-gray-100 px-5 pt-2 md:pt-3 min-h-screen  w-screen">
      <div>
        <Mobile_Sidebar />

        {/* <Header /> */}

        <div className="flex gap-2 items-center ">
          <p className="text-sm text-[#C40116] ml-2">Dashboard</p>
          <p>{">"}</p>
        </div>
        
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard_Mainbar;
