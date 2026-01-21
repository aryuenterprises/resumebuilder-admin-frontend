import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Contacts from "./pages/Contacts.jsx";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import UserList from "./pages/UserList.jsx";
import DesiredJobTitle_Page from "./pages/DesiredJobTitle_Page.jsx";
import PlanSubscription_Page from "./pages/PlanSubscription_Page.jsx";
import ToneResume_page from "./pages/PaymentRecords_page.jsx";
import { createContext, useEffect, useState } from "react";
import ResumeData_Page from "./pages/ResumeData_Page.jsx";
import ResumeDetails_page from "./pages/ResumeDetails_page.jsx";
import PaymentRecords_page from "./pages/PaymentRecords_page.jsx";
import Settings from "./pages/Settings.jsx";

export const SettingsContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check local storage during initial render
    const userDetails = localStorage.getItem("admin_token");
    return userDetails ? true : false;
  });
  
  const [dynamicDateFormat, setDynamicDateFormat] = useState("");


   const [logoPreview, setLogoPreview] = useState("");

useEffect(() => {
  const savedLogo = localStorage.getItem("dashboardLogo");
  if (savedLogo) {
    setLogoPreview(savedLogo);
  }
}, []);



  const settingsApi = async () => {
    // const response = await axios.get(`${API_URL}/api/setting/view-setting`);
    // const dateFormat = response.data.data[0]?.date_format;
    setDynamicDateFormat("MM/dd/yyyy");
  };
  useEffect(() => {
    settingsApi();
  }, []);
  return (
    <>
      <BrowserRouter>
        <SettingsContext.Provider
          value={{ dynamicDateFormat, setDynamicDateFormat,logoPreview, setLogoPreview }}
        >
          <Routes>
            <Route
              path="*"
              element={<ProtectedRoute element={<PageNotFound />} />}
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/contact"
              element={<ProtectedRoute element={<Contacts />} />}
            />
            <Route
              path="/users-list"
              element={<ProtectedRoute element={<UserList />} />}
            />
            <Route
              path="/desired-jobs-title"
              element={<ProtectedRoute element={<DesiredJobTitle_Page />} />}
            />
            <Route
              path="/plan-subscription"
              element={<ProtectedRoute element={<PlanSubscription_Page />} />}
            />

            <Route
              path="/users-resume-data"
              element={<ProtectedRoute element={<ResumeData_Page />} />}
            />
            <Route
              path="/user-resume-details"
              element={<ProtectedRoute element={<ResumeDetails_page />} />}
            />
            <Route
              path="/payment-history"
              element={<ProtectedRoute element={<PaymentRecords_page />} />}
            />
            <Route
              path="/settings"
              element={<ProtectedRoute element={<Settings />} />}
            />
          </Routes>
        </SettingsContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
