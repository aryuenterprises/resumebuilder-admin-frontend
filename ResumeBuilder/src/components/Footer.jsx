import React from "react";
import aryu_logo from "../assets/aryu_logo.svg";

const Footer = () => {
  return (
    <div>
      <div className="flex  gap-2 flex-wrap items-center text-sm text-gray-500 mt-10 mb-2 justify-center">
        <p>Copyrights &copy; 2026 </p>
        <div className="flex items-center gap-2">
          <p>&bull; Powered by Aryu SmartCV</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
