// ProtectedRoute.js
import React from "react"; // <- make sure React is imported
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie"; // if using cookies
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element }) => {
  const cookieToken = Cookies.get("token");
  const localToken = localStorage.getItem("admin_token");
  const token = cookieToken|| localToken;

  
    if (!token) {
      return <Navigate to="/" replace />;
    }
    try {
      const decoded = jwtDecode(token);
      const verify = decoded.exp > Date.now() / 1000;
      
      if (verify) {
       
        return element;
      }else {
         Cookies.remove("token");
        localStorage.removeItem("admin_token");
        return <Navigate to="/" replace />;
      }
      
    } catch (error) {
      return <Navigate to="/" replace />;
    }
  // JSX returned must be inside a component
  // return token ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
