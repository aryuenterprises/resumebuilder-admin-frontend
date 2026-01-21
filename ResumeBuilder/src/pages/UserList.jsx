import React from "react";
import Sidebar from "../components/Sidebar";
import UserList_Mainbar from "../components/UserList Components/UserList_Mainbar";

const UserList = () => {
  return (
    <div className="flex ">
      
      <div className="bg-gray-100 md:bg-white">
        <Sidebar />
      </div>

      <UserList_Mainbar/>
    </div>
  );
};

export default UserList;
