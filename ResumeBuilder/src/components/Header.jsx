import { useEffect, useState } from "react";
import { BsBellFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

export const Header = () => {
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


  return (
    <div className="">
      {/* <input
        type="text"
        className="w-32 sm:w-56 md:basis-[50%] ps-2   placeholder-black border-none outline-none  py-2 "
        placeholder="Search by name, position"
      /> */}

      <div className=" flex w-fit flex-row items-center justify-end gap-4 lg:gap-8 lg:w-auto">
        {/* <div className="flex items-center gap-2 lg:gap-5">
          <BsBellFill className="text-lg lg:text-xl text-gray-400 cursor-pointer" />
          <IoMdSettings className="text-lg lg:text-xl text-gray-400 cursor-pointer" />
          <div className="h-6 w-6  bg-gray-200 rounded-full cursor-pointer"></div>
          <p className="cursor-pointer ">ENG</p>
        </div> */}

        <div className="font-medium  bg-white px-4 py-3 rounded-full text-sm max-md:hidden lg:text-base text-center lg:text-left">
          <span>{day}, </span>
          <span>{month} </span>
          <span>{date}, </span>
          <span className="inline-block  text-center">
            {hours}:{minutes} {amPm}
          </span>
        </div>
      </div>
    </div>
  );
};
