import Contacts_Mainbar from "../components/Contacts Components/Contacts_Mainbar";
import Sidebar from "../components/Sidebar";

const Contacts = () => {
  return (
    <div className="flex ">
      <div className="bg-gray-100 md:bg-white">
        <Sidebar />
      </div>

      <Contacts_Mainbar />

    
    </div>
  );
};

export default Contacts;
