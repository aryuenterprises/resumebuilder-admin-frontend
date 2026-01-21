import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Mobile_Sidebar from "../components/Mobile_Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../config";
import axios from "axios";
import { Password } from "primereact/password";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SettingsContext } from "../App";

const Settings = () => {

  const navigate = useNavigate();
  const [publishableKey, setPublishableKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const [logoImage, setLogoImage] = useState(null);
  const [email, setEmail] = useState("");
  const [currencyType, setCurrencyType] = useState("");
  const [currencyName, setCurrencyName] = useState("");


  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [fromName, setFromName] = useState("");

  const [logoPreview, setLogoPreview] = useState("");
  // console.log("logoPreview",logoPreview)

  // const {logoPreview, setLogoPreview} = useContext(SettingsContext);

const currencyList = [
  { code: "usd", symbol: "$" },
  { code: "eur", symbol: "€" },
  { code: "gbp", symbol: "£" },
  { code: "inr", symbol: "₹" },
  { code: "jpy", symbol: "¥" },
  { code: "aud", symbol: "A$" },
  { code: "cad", symbol: "C$" },
  { code: "cny", symbol: "¥" },
  { code: "nzd", symbol: "NZ$" },
  { code: "sgd", symbol: "S$" },
  { code: "chf", symbol: "CHF" },
  { code: "hkd", symbol: "HK$" },
  { code: "krw", symbol: "₩" },
  { code: "rub", symbol: "₽" },
  { code: "brl", symbol: "R$" },
  { code: "mxn", symbol: "MX$" },
  { code: "zar", symbol: "R" },
  { code: "try", symbol: "₺" },
  { code: "inr", symbol: "₹" },
  { code: "dzd", symbol: "دج" },
  { code: "aed", symbol: "د.إ" },
  { code: "sar", symbol: "﷼" },
  { code: "ngn", symbol: "₦" },
  { code: "php", symbol: "₱" },
  // … and many more
];

  const [currencyCode, setCurrencyCode] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");

  const handleCurrencyChange = (e) => {
    const code = e.target.value;
    setCurrencyCode(code);

    // Find the symbol for the selected code
    const selected = currencyList.find((c) => c.code === code);
    setCurrencySymbol(selected ? selected.symbol : "");
  };


  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      // const formData = {
      //   PublishableKey: publishableKey,
      //   SecretKey: secretKey,

      // };
      const formData = new FormData();

      // Payment keys
      formData.append("PublishableKey", publishableKey);
      formData.append("SecretKey", secretKey);

      // Logo image (file)
      if (logoImage) {
        formData.append("logoImage", logoImage);
      }

      // Email + Currency Type
      formData.append("email", email);
      // formData.append("currenyType", currencyType);
      // formData.append("currencyName", currencyName);
      formData.append("currencyType", currencySymbol);
      formData.append("currencyName", currencyCode);


      // SMTP fields
      formData.append("host", host);
      formData.append("port", port);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("fromName", fromName);

      console.log("formData", formData);

      const response = await axios.post(
        `${API_URL}/api/setting/setting`,
        formData
      );
      console.log("response:", response);
      getSettingsData();
      toast.success("Settings updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const getSettingsData = async () => {
    try {
      const formData = {
        PublishableKey: publishableKey,
        SecretKey: secretKey,
      };

      const response = await axios.get(`${API_URL}/api/setting/get-setting`);

      console.log(response.data[0]);
      setPublishableKey(response.data[0].PublishableKey);
      setSecretKey(response.data[0].SecretKey);
      setEmail(response.data[0].email || "");
      // setCurrencyType(response.data[0].currenyType || "");
      // setCurrencyName(response.data[0].currencyName || "");
      setCurrencySymbol(response.data[0].currencyType || "");
      setCurrencyCode(response.data[0].currencyName || "");

      setHost(response.data[0].host || "");
      setPort(response.data[0].port || "");
      setUsername(response.data[0].username || "");
      setPassword(response.data[0].password || "");
      setFromName(response.data[0].fromName || "");

      // Set backend image URL
      if (response.data[0].logoImage) {
        // setLogoPreview(
        //   `${API_URL}/api/uploads/others/${response.data[0].logoImage}`
        // );

        const logoUrl = `${API_URL}/api/uploads/others/${response.data[0].logoImage}`;
        setLogoPreview(logoUrl);

        // Save to localStorage
        localStorage.setItem("dashboardLogo", logoUrl);

      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  useEffect(() => {
    getSettingsData();
  }, []);

  useEffect(() => {
    const savedLogo = localStorage.getItem("dashboardLogo");

    if (savedLogo) {
      setLogoPreview(savedLogo);
    }

    getSettingsData();
  }, []);





  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

      <div className="flex flex-col justify-between w-screen bg-gray-100 px-3 md:px-5 pt-2 md:pt-5">
        <Mobile_Sidebar />
        <ToastContainer />
        <div className="min-h-screen">
          <h1 className="text-2xl md:text-3xl font-semibold mt-6">Settings</h1>

          <div className="bg-white rounded-2xl shadow-md border p-8 w-full mt-6">
            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* LEFT COLUMN */}
              <div>
                <h2 className="text-xl font-semibold">Stripe Settings</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Stripe integration details.
                </p>

                {/* Publishable Key */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Publishable Key
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Publishable Key"
                    value={publishableKey}
                    onChange={(e) => setPublishableKey(e.target.value)}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Secret Key */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Secret Key
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Secret Key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Logo Image */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Logo Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoImage(e.target.files[0])}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                  />

                  {logoImage ? (
                    <img
                      src={URL.createObjectURL(logoImage)}
                      className="w-32 h-32 object-contain border rounded-lg mt-3"
                      alt="Preview"
                    />
                  ) : logoPreview ? (
                    <img
                      src={logoPreview}
                      className="w-32 h-32 object-contain border rounded-lg mt-3"
                      alt="Preview"
                    />
                  ) : null}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                  />
                </div>

                {/* Currency */}
                {/* <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Currency Symbol (£)"
                    value={currencyType}
                    onChange={(e) => setCurrencyType(e.target.value)}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                  />
                </div> */}

                {/* Currency */}
                {/* <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Currency Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Currency Code (gbp)"
                    value={currencyName}
                    onChange={(e) => setCurrencyName(e.target.value)}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                  />
                </div> */}

                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Currency Code
                  </label>
                  <select
                    value={currencyCode}
                    onChange={handleCurrencyChange}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                  >
                    <option value="">Select Currency</option>
                    {currencyList.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                           {currency.code.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Currency Symbol (Auto Updated) */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={currencySymbol}
                    readOnly
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm bg-gray-100 cursor-not-allowed"
                  />
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div>
                <h2 className="text-xl font-semibold">SMTP Settings</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Email integration details.
                </p>

                {/* Host */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Host
                  </label>
                  <input
                    type="text"
                    placeholder="Enter SMTP Host"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                  />
                </div>

                {/* Port */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Port
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Port"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                  />
                </div>

                {/* Username */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                    />
                    <span
                      className="absolute right-3 top-3 text-gray-600 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>

                {/* From Name */}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-sm font-medium text-gray-700">
                    From Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter From Name"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    className="border border-gray-300 w-full rounded-lg p-2 text-sm focus:border-blue-500 focus:ring-2"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-5 mt-8">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-6 rounded-lg shadow-md transition"
              >
                Back
              </button>

              <button
                onClick={handlesubmit}
                className="bg-gradient-to-br from-[#C40116] to-[#C40116]/50  text-white font-medium py-2 px-6 rounded-lg shadow-md transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
