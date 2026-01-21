import { useState, useEffect } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsCalendar4 } from "react-icons/bs";
import { CiDeliveryTruck, CiBoxList } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";

const CreateEmployee_Mainbar = () => {
  let navigate = useNavigate();

  const onClickCreateEmployeeCancelButton = () => {
    navigate("/employee");
  };

  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
  const [openImageModal, setOpenImageModal] = useState(false);

  // Function to handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview URL for the image
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [employeeFullName, setEmployeeFullName] = useState("");
  const [employeePhoneNo, setEmployeePhoneNo] = useState("");
  const [employeeEmailAddress, setEmployEmailAddress] = useState("");
  const [createPassword, setCreatePassoword] = useState("");
  const [employeeType, setEmployeeType] = useState("");

  const [searchedPosition, setSearchedPosition] = useState("");
  const [positionIsOpen, setPositionIsOpen] = useState(false);
  const [selectedPositionOption, setSelectedPositionOption] = useState(null);

  const positionOptions = [
    "HR",
    "Accounts",
    "UI UX Designer",
    "web developer",
    "CEO",
    "CTO",
  ];
  const filteredPositionOptions = positionOptions.filter((option) =>
    option.toLowerCase().includes(searchedPosition.toLowerCase())
  );

  const [searchedDepartment, setSearchedDepartment] = useState("");
  const [departmentIsOpen, setDepartmentIsOpen] = useState(false);
  const [selectedDepartmentOption, setSelectedDepartmentOption] =
    useState(null); // To store the selected option
  const departmentOptions = [
    "Development",
    "SEO",
    "Digital Marketing",
    "Accounts",
  ];

  const filteredDepartmentOptions = departmentOptions.filter((option) =>
    option.toLowerCase().includes(searchedDepartment.toLowerCase())
  );

  const [employeeDateOfJoin, setEmployeeDateOfJoin] = useState(null);
  const [employeePassportNumber, setEmployeePassportNumber] = useState(null);
  const [employeePanNumber, setEmployeePanNumber] = useState(null);
  const [employeeAadharNumber, setEmployeeAadharNumber] = useState(null);
  const [employeeDob, setEmployeeDob] = useState(null);

  const [pfJoinDate, setPfJoinDate] = useState(null);
  const [pfExpiryDate, setPfExpiryDate] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);

  const [searchedBankName, setSearchedBankName] = useState("");
  const [bankNameIsOpen, setBankNameIsOpen] = useState(false);
  const [selectedBankNameOption, setSelectedBankNameOption] = useState(null);
  const bankNameOptions = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "IndusInd Bank",
    "Yes Bank",
    "Federal Bank",
    "IDFC FIRST Bank",
    "South Indian Bank",
    "RBL Bank",
    "UCO Bank",
    "Indian Bank",
    "Central Bank of India",
    "Punjab & Sind Bank",
    "AU Small Finance Bank",
  ];

  const filteredBankNametOptions = bankNameOptions.filter((option) =>
    option.toLowerCase().includes(searchedBankName.toLowerCase())
  );

  const [skills, setSkills] = useState([]);
  const [skillsInputValue, setSkillsInputValue] = useState("");

  const handleSkillsKeyPress = (e) => {
    if (e.key === "Enter" && skillsInputValue) {
      setSkills([...skills, skillsInputValue.trim()]);
      setSkillsInputValue("");
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  const [addWorkExperienceModalOpen, setAddWorkExperienceModalOpen] =
    useState(false);
  const [addEducationalInfoModalOpen, setAddEducationalInfoModalOpen] =
    useState(false);
  const [addEmployeeDocumentsModalOpen, setAddEmployeeDocumentModalOpen] =
    useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  const openWorkExperienceModal = () => {
    setAddWorkExperienceModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10); // Delay to trigger animation
  };

  const closeAddWorkExperienceModal = () => {
    setIsAnimating(false);
    setTimeout(() => setAddWorkExperienceModalOpen(false), 250); // Matches animation duration
  };

  const openAddEducationInfoModal = () => {
    setAddEducationalInfoModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10); // Delay to trigger animation
  };

  const closeAddEducationInfoModal = () => {
    setIsAnimating(false);
    setTimeout(() => setAddEducationalInfoModalOpen(false), 250); // Delay to trigger animation
  };

  const openAddEmployeeDocumentsModal = () => {
    setAddEmployeeDocumentModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10); // Delay to trigger animation
  };

  const closeAddEmployeeDocumentsModal = () => {
    setIsAnimating(false);
    setTimeout(() => setAddEmployeeDocumentModalOpen(false), 250); // Delay to trigger animation
    setUploadedFiles([]);
  };

  // education info
  const [educationInfo, setEducationInfo] = useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [yearOfPassing, setYearOfPassing] = useState("");

  const handleSaveEducationInfo = () => {
    if (schoolName && departmentName && startYear && endYear) {
      closeAddEducationInfoModal();
      const newEntry = {
        schoolName,
        departmentName,
        period: `${startYear} - ${endYear}`,
      };

      setEducationInfo([...educationInfo, newEntry]); // Add new entry to the array

      setSchoolName("");
      setDepartmentName("");
      setStartYear("");
      setEndYear("");
    } else {
      alert("fill all the fields");
    }
  };

  const onClickEducationInfoDelete = (deleteIndex) => {
    const newEducationInfo = educationInfo.filter(
      (_, index) => index !== deleteIndex
    );
    setEducationInfo(newEducationInfo);
  };

  // work experience
  const [workExperiences, setWorkExperiences] = useState([]);
  const [experienceForm, setExperienceForm] = useState({
    jobTitle: "",
    companyIndustry: "",
    companyName: "",
    previousSalary: "",
    startWork: "",
    endWork: "",
    responsibilities: [],
  });
  
  const [responsibilityInput, setResponsibilityInput] = useState("");
  const handleDeleteResponsibility = (index) => {
    setExperienceForm((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };
  const handleAddResponsibility = (e) => {
    if (e.key === "Enter" && responsibilityInput.trim() !== "") {
      setExperienceForm((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, responsibilityInput],
      }));
      setResponsibilityInput("");
    }
  };
  const handleSaveExperience = () => {
    if (
      experienceForm.companyIndustry &&
      experienceForm.companyName &&
      experienceForm.endWork &&
      experienceForm.jobTitle &&
      experienceForm.previousSalary &&
      experienceForm.responsibilities.length > 0 &&
      experienceForm.startWork
    ) {
      closeAddWorkExperienceModal();
      setWorkExperiences([...workExperiences, experienceForm]);
      setExperienceForm({
        jobTitle: "",
        companyIndustry: "",
        companyName: "",
        previousSalary: "",
        startWork: "",
        endWork: "",
        responsibilities: [],
      });
      setResponsibilityInput("");
    } else {
      alert("fill all the fields");
    }
  };
  const onClickWorkExperienceDelete = (deleteIndex) => {
    const newWorkExperience = workExperiences.filter(
      (_, index) => index !== deleteIndex
    );
    setWorkExperiences(newWorkExperience);
  };

  // const onDrop = (acceptedFiles) => {
  //   const filesWithDetails = acceptedFiles.map((file) => ({
  //     id: Date.now() + Math.random(), // Generate unique ID
  //     file,
  //     title: title || "No title entered",
  //     preview: URL.createObjectURL(file),
  //   }));
  //   setUploadedFiles((prevFiles) => [...prevFiles, ...filesWithDetails]);
  //   setTitle(""); // Reset the title after upload
  // };

  const [title, setTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  // const onDrop = (acceptedFiles) => {
  //   if (!title.trim()) {
  //     alert("Please enter a title before uploading files.");
  //     return;
  //   }

  //   setUploadedFiles((prevFiles) => {
  //     // Map the new files into the desired structure
  //     const filesWithDetails = acceptedFiles.map((file) => {
  //       // Remove './' from the file path if it exists
  //       const filePath = file.path || file.name;
  //       const cleanFilePath = filePath.replace(/^\.\/+/, ""); // Remove leading './'

  //       return {
  //         id: Date.now() + Math.random(), // Unique ID
  //         file: {
  //           path: cleanFilePath,
  //           relativePath: cleanFilePath,
  //         },
  //         preview: URL.createObjectURL(file),
  //       };
  //     });

  //     // Check if a group with the same title already exists
  //     const existingGroupIndex = prevFiles.findIndex(
  //       (group) => group.title === title
  //     );

  //     if (existingGroupIndex !== -1) {
  //       // If group exists, update with the new files without removing other files
  //       prevFiles[existingGroupIndex].files = [
  //         ...prevFiles[existingGroupIndex].files,
  //         ...filesWithDetails,
  //       ];
  //       return [...prevFiles]; // Return updated files array
  //     } else {
  //       // If no group exists, create a new group with the title
  //       return [
  //         ...prevFiles,
  //         {
  //           title: title || "Untitled", // Default title if not provided
  //           files: filesWithDetails, // Add new files to this group
  //         },
  //       ];
  //     }
  //   });

  //   setTitle(""); // Reset the title after upload
  // };

  // const saveUploadedFile = () => {
  //   setUploadedDocuments((prev) => [...prev, uploadedFiles]);
  //   setIsAnimating(false);
  //   setTimeout(() => setAddEmployeeDocumentModalOpen(false), 250); // Delay to trigger animation
  //   setUploadedFiles([]);
  // };

  // const saveUploadedFile = () => {
  //   if (!uploadedFiles) {
  //     console.error("uploadedFiles is undefined or null");
  //     alert("No files uploaded. Please check and try again.");
  //     return;
  //   }

  //   // If uploadedFiles is an array, loop through and process each item
  //   if (Array.isArray(uploadedFiles)) {
  //     setUploadedDocuments((prev) => {
  //       const updatedDocuments = [...prev];

  //       uploadedFiles.forEach((fileGroup) => {
  //         const existingIndex = updatedDocuments.findIndex(
  //           (doc) => doc.title === fileGroup.title
  //         );

  //         if (existingIndex !== -1) {
  //           // Append files to the existing document group
  //           updatedDocuments[existingIndex].files = [
  //             ...(updatedDocuments[existingIndex].files || []),
  //             ...(fileGroup.files || []),
  //           ];
  //         } else {
  //           // Add as a new document group
  //           updatedDocuments.push(fileGroup);
  //         }
  //       });

  //       return updatedDocuments;
  //     });
  //   } else if (uploadedFiles.files && Array.isArray(uploadedFiles.files)) {
  //     // If uploadedFiles is an object with a files array
  //     setUploadedDocuments((prev) => {
  //       const existingIndex = prev.findIndex(
  //         (doc) => doc.title === uploadedFiles.title
  //       );

  //       if (existingIndex !== -1) {
  //         // Append files to the existing document group
  //         const updatedDocuments = [...prev];
  //         updatedDocuments[existingIndex].files = [
  //           ...(updatedDocuments[existingIndex].files || []),
  //           ...uploadedFiles.files,
  //         ];
  //         return updatedDocuments;
  //       } else {
  //         // Add as a new document group
  //         return [...prev, uploadedFiles];
  //       }
  //     });
  //   } else {
  //     console.error("uploadedFiles structure is incorrect:", uploadedFiles);
  //     alert("Invalid file structure. Please try uploading again.");
  //     return;
  //   }

  //   // Reset the modal state and uploaded files
  //   setIsAnimating(false);
  //   setTimeout(() => setAddEmployeeDocumentModalOpen(false), 250); // Delay to trigger animation
  //   setUploadedFiles([]);
  // };

  // const saveUploadedFile = () => {
  //   setUploadedDocuments((prev) => {
  //     const updatedDocuments = [...prev];

  //     uploadedFiles.forEach((fileGroup) => {
  //       // Check if the title already exists in the uploadedDocuments
  //       const existingIndex = updatedDocuments.findIndex(
  //         (doc) => doc.title === fileGroup.title
  //       );

  //       if (existingIndex !== -1) {
  //         // Merge arrays if the title exists
  //         updatedDocuments[existingIndex].files = [
  //           ...(updatedDocuments[existingIndex].files || []),
  //           ...(fileGroup.files || []),
  //         ];
  //       } else {
  //         // Add a new document group if the title doesn't exist
  //         updatedDocuments.push({
  //           title: fileGroup.title,
  //           files: fileGroup.files || [], // Ensure the files array exists
  //         });
  //       }
  //     });

  //     return updatedDocuments;
  //   });

  //   // Reset the modal state and uploaded files
  //   setIsAnimating(false);
  //   setTimeout(() => setAddEmployeeDocumentModalOpen(false), 250); // Delay to trigger animation
  //   setUploadedFiles([]); // Clear the uploaded files after saving
  // };

  const saveUploadedFile = () => {
    setUploadedDocuments((prev) => {
      // Use a map to track titles to prevent duplicates
      const documentMap = new Map();

      prev.forEach((doc) => {
        documentMap.set(doc.title, {
          title: doc.title,
          files: [...(doc.files || [])],
        });
      });

      // Merge the uploaded files into the map
      uploadedFiles.forEach((fileGroup) => {
        if (documentMap.has(fileGroup.title)) {
          // Merge files if the title already exists
          const existingDoc = documentMap.get(fileGroup.title);
          documentMap.set(fileGroup.title, {
            ...existingDoc,
            files: [...existingDoc.files, ...(fileGroup.files || [])],
          });
        } else {
          // Add a new entry if the title doesn't exist
          documentMap.set(fileGroup.title, {
            title: fileGroup.title,
            files: fileGroup.files || [],
          });
        }
      });

      // Convert the map back to an array for state
      return Array.from(documentMap.values());
    });

    // Reset the modal state and uploaded files
    setIsAnimating(false);
    setTimeout(() => setAddEmployeeDocumentModalOpen(false), 250); // Delay to trigger animation
    setUploadedFiles([]); // Clear the uploaded files after saving
  };

  const onDrop = (acceptedFiles) => {
    setUploadedFiles((prevFiles) => {
      // Map the new files into the desired structure
      const filesWithDetails = acceptedFiles.map((file) => {
        // Remove './' from the file path if it exists
        const filePath = file.path || file.name;
        const cleanFilePath = filePath.replace(/^\.\/+/, ""); // Remove leading './'

        return {
          id: Date.now() + Math.random(), // Unique ID
          file: {
            path: cleanFilePath,
            relativePath: cleanFilePath,
          },
          preview: URL.createObjectURL(file),
        };
      });

      // Check if a group with the same title already exists
      const existingGroupIndex = prevFiles.findIndex(
        (group) => group.title === title
      );

      if (existingGroupIndex !== -1) {
        // If group exists, check for duplicate files before adding
        const existingFiles = prevFiles[existingGroupIndex].files;

        // Filter out duplicate files
        const uniqueFiles = filesWithDetails.filter((newFile) => {
          return !existingFiles.some(
            (existingFile) => existingFile.file.path === newFile.file.path
          );
        });

        // Update the group with the unique files
        prevFiles[existingGroupIndex].files = [
          ...existingFiles,
          ...uniqueFiles,
        ];
        return [...prevFiles]; // Return updated files array
      } else {
        // If no group exists, create a new group with the title
        return [
          ...prevFiles,
          {
            title: title || "Untitled", // Default title if not provided
            files: filesWithDetails, // Add new files to this group
          },
        ];
      }
    });
    setTitle(""); // Reset the title after upload
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    disabled: !title.trim(), // Disable dropzone if title is empty
  });

  const handleDelete = (fileId, groupTitle) => {
    setUploadedFiles(
      (prevFiles) =>
        prevFiles
          .map((group) => {
            if (group.title === groupTitle) {
              return {
                ...group,
                files: group.files.filter((file) => file.id !== fileId),
              };
            }
            return group;
          })
          .filter((group) => group.files.length > 0) // Remove empty groups
    );
  };

  const onClickDocumentDeleteButton = (filePath) => {
    setUploadedDocuments(
      (prevDocuments) =>
        prevDocuments
          .map((doc) => ({
            ...doc,
            files: doc.files.filter((file) => file.file.path !== filePath),
          }))
          .filter((doc) => doc.files.length > 0) // Remove empty documents
    );
  };

  useEffect(() => {
    if (
      addEducationalInfoModalOpen ||
      addWorkExperienceModalOpen ||
      addEmployeeDocumentsModalOpen
    ) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up on component unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [
    addEducationalInfoModalOpen,
    addWorkExperienceModalOpen,
    addEmployeeDocumentsModalOpen,
  ]);

  const [year, setYear] = useState("");

  const handleChange = (event) => {
    const dateValue = event.target.value;
    const selectedYear = new Date(dateValue).getFullYear();
    setYear(selectedYear);
  };

  return (
    <div className="w-screen flex flex-col justify-between min-h-screen bg-gray-100 px-3 md:px-5 pt-2 md:pt-5">
     
      <div>
        <Mobile_Sidebar />

        {/* breadcrumbs */}
        <div className="flex gap-2 mt-5 text-sm items-center">
          <p
            onClick={() => navigate("/employees")}
            className=" text-gray-500 cursor-pointer "
          >
            Employees
          </p>
          <p>{">"}</p>
          <p className=" text-blue-500 ">Create Employees</p>
          <p>{">"}</p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row justify-between mt-5">
            <p className="text-xl md:text-3xl font-semibold ">
              Create Employee
            </p>

            {/* Heading */}
            <div className="flex justify-end gap-5 mt-8">
              <button
                onClick={onClickCreateEmployeeCancelButton}
                className="bg-red-100  hover:bg-red-200 text-sm md:text-base text-red-600 px-5 md:px-9 py-1 md:py-2 font-semibold rounded-full"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-5 md:px-9 py-1 md:py-2 text-sm  md:text-base font-semibold rounded-full">
                Save
              </button>
            </div>
          </div>

          {/*main flex */}
          <div className="flex flex-col  lg:flex-row gap-3 my-5">
            {/* leftside bar */}
            <div className="basis-[50vw] flex-grow flex flex-col gap-3 ">
              <div className="rounded-2xl border-2 border-gray-200 bg-white  py-4 px-4 lg:px-6">
                <div className="flex items-center justify-between flex-wrap">
                  <p className="text-xl font-semibold">Basic Information</p>
                  <label
                    htmlFor="file"
                    className="text-xs text-end  md:text-sm mt-3 font-medium cursor-pointer"
                  >
                    {`${selectedImage ? "Change Photo" : "Upload Photo"}`}
                  </label>
                </div>

                {/* Hidden File Input */}
                <input
                  id="file"
                  type="file"
                  accept="image/*" // Allow only image files
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

                {/* Display Selected Image */}
                {selectedImage && (
                  <div className="mt-8 flex justify-center sm:justify-end">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      onClick={() => setOpenImageModal(true)} // Open modal on click
                      className="w-36 h-32 object-fill cursor-pointer  rounded-md"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-4 mt-4">
                  {/* name */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        htmlFor="FULL NAME"
                      >
                        FULL NAME
                      </label>
                      <p className="text-sm">Add employee name</p>
                    </div>
                    <input
                      value={employeeFullName}
                      onChange={(e) => setEmployeeFullName(e.target.value)}
                      id="FULL NAME"
                      type="text"
                      placeholder="Employee Name"
                      className="border-2 rounded-xl ps-4 h-10 border-gray-300 outline-none w-full  lg:w-72"
                    />
                  </div>

                  {/* Phone*/}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        htmlFor="PHONE NO & EMERGENCY"
                      >
                        PHONE NO
                      </label>
                      <p className="text-sm">Contact number</p>
                    </div>

                    <input
                      value={employeePhoneNo}
                      onChange={(e) => setEmployeePhoneNo(e.target.value)}
                      id="PHONE NO "
                      type="number"
                      placeholder="000-000-000"
                      className="border-2 h-10 rounded-xl ps-4 border-gray-300 outline-none w-full  lg:w-72"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        htmlFor="EMAIL ADDRESS"
                      >
                        EMAIL ADDRESS
                      </label>
                      <p className="text-sm">Add employee email</p>
                    </div>
                    <input
                      value={employeeEmailAddress}
                      onChange={(e) => setEmployEmailAddress(e.target.value)}
                      id="EMAIL ADDRESS"
                      type="email"
                      placeholder="@example.com"
                      className="border-2 h-10 rounded-xl ps-4 border-gray-300 outline-none w-full  lg:w-72"
                    />
                  </div>

                  {/* create password */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        htmlFor="CREATE PASSWORD"
                      >
                        CREATE PASSWORD
                      </label>
                      <p className="text-sm">Add employee password</p>
                    </div>
                    <div className="relative w-full lg:w-72">
                      <input
                        value={createPassword}
                        onChange={(e) => setCreatePassoword(e.target.value)}
                        id="CREATE PASSWORD"
                        type={showPassword ? "text" : "password"}
                        placeholder="#@ABCaba1214"
                        className="border-2 h-10 rounded-xl ps-4 border-gray-300 outline-none w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </div>

                  {/* Employee type */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label className="font-medium text-sm" htmlFor="">
                        EMPLOYEE TYPE
                      </label>
                      <p className="text-sm">Select Employee type</p>
                    </div>
                    <div className="border-2 rounded-xl flex items-center text-gray-400 ps-4 h-10 border-gray-300 outline-none w-full lg:w-72">
                      <select
                        value={employeeType}
                        onChange={(e) => setEmployeeType(e.target.value)}
                        name=""
                        id=""
                        className="border-none outline-none w-full"
                      >
                        <option value="Full time">Full time</option>pt
                        <option value="Part time">Part time</option>pt
                        <option value="Freelancer">Freelancer</option>pt
                      </select>
                    </div>
                  </div>

                  {/* position */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        onClick={() => {
                          setPositionIsOpen(!positionIsOpen);
                          setDepartmentIsOpen(false);
                        }}
                      >
                        POSITION
                      </label>
                      <p className="text-sm">Choose position</p>
                    </div>

                    <div className="relative border-2 rounded-xl ps-4 border-gray-300 outline-none w-full  lg:w-72">
                      <button
                        onClick={() => {
                          setPositionIsOpen(!positionIsOpen);
                          setDepartmentIsOpen(false);
                        }}
                        className={`w-full ${
                          selectedPositionOption
                            ? "text-black"
                            : "text-gray-400"
                        } py-2 text-left bg-white rounded-lg shadow-sm focus:outline-none`}
                      >
                        {selectedPositionOption || "Choose position"}
                      </button>

                      {positionIsOpen && (
                        <div className="absolute left-0 z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                          <input
                            type="text"
                            value={searchedPosition}
                            onChange={(e) =>
                              setSearchedPosition(e.target.value)
                            }
                            placeholder="Search..."
                            className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
                          />
                          <ul className="max-h-48 overflow-y-auto">
                            {filteredPositionOptions.length > 0 ? (
                              filteredPositionOptions.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() => {
                                    setSelectedPositionOption(option);
                                    setPositionIsOpen(false);
                                  }}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                  {option}
                                </li>
                              ))
                            ) : (
                              <li className="px-4 py-2 text-gray-500">
                                No results found
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Department */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        onClick={() => setDepartmentIsOpen(!departmentIsOpen)}
                      >
                        DEPARTMENT
                      </label>
                      <p className="text-sm">Choose department</p>
                    </div>

                    <div className="relative border-2 rounded-xl ps-4 border-gray-300 outline-none w-full  lg:w-72">
                      <button
                        onClick={() => setDepartmentIsOpen(!departmentIsOpen)}
                        className={`w-full ${
                          selectedDepartmentOption
                            ? "text-black"
                            : "text-gray-400"
                        } py-2 text-left bg-white rounded-lg shadow-sm focus:outline-none`}
                      >
                        {selectedDepartmentOption || "Choose department"}
                      </button>

                      {departmentIsOpen && (
                        <div className="absolute left-0 z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                          <input
                            type="text"
                            value={searchedDepartment}
                            onChange={(e) =>
                              setSearchedDepartment(e.target.value)
                            }
                            placeholder="Search..."
                            className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
                          />
                          <ul className="max-h-48 overflow-y-auto">
                            {filteredDepartmentOptions.length > 0 ? (
                              filteredDepartmentOptions.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() => {
                                    setSelectedDepartmentOption(option);
                                    setDepartmentIsOpen(false);
                                  }}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                  {option}
                                </li>
                              ))
                            ) : (
                              <li className="px-4 py-2 text-gray-500">
                                No results found
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date of Joining */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        htmlFor="DATE OF JOINING"
                      >
                        DATE OF JOINING
                      </label>
                      <p className="text-sm">employee's date of join</p>
                    </div>

                    <div className="relative">
                      <DatePicker
                        id="DATE OF JOINING"
                        placeholderText="Choose the employee date of join"
                        className="border-2 rounded-xl h-10 ps-4 border-gray-300 outline-none w-full lg:w-72"
                        selected={employeeDateOfJoin}
                        onChange={(date) => setEmployeeDateOfJoin(date)}
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-5" />

                <p className="text-xl font-semibold">Personal Info</p>

                <div className="flex flex-col gap-4 mt-4">
                  {/* Passport No. */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        htmlFor="PASSPORT NO."
                      >
                        PASSPORT NO.
                      </label>
                      <p className="text-sm">Add passport No.</p>
                    </div>
                    <input
                      value={employeePassportNumber}
                      onChange={(e) =>
                        setEmployeePassportNumber(e.target.value)
                      }
                      id="PASSPORT NO."
                      type="number"
                      placeholder="Passport No."
                      className="border-2 h-10 rounded-xl ps-4 border-gray-300 outline-none w-full  lg:w-72"
                    />
                  </div>

                  {/* Pan no */}
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label className="font-medium text-sm" htmlFor="PAN NO">
                        PAN NO
                      </label>
                      <p className="text-sm">PAN NO</p>
                    </div>
                    <input
                      value={employeePanNumber}
                      onChange={(e) => setEmployeePanNumber(e.target.value)}
                      id="PAN NO"
                      type="number"
                      placeholder="Enter PAN NO"
                      className="border-2 rounded-xl h-10 ps-4 w-full lg:w-72 border-gray-300 outline-none"
                    />
                  </div>

                  {/* Aadhar No */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        htmlFor="AADHAR NO"
                      >
                        AADHAR NO
                      </label>
                      <p className="text-sm">Add Aadhar No</p>
                    </div>
                    <input
                      value={employeeAadharNumber}
                      onChange={(e) => setEmployeeAadharNumber(e.target.value)}
                      id="AADHAR NO"
                      type="text"
                      placeholder="Aadhar No"
                      className="border-2 h-10 rounded-xl ps-4 border-gray-300 outline-none w-full  lg:w-72"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label
                        className="font-medium text-sm"
                        htmlFor="DATE OF BIRTH"
                      >
                        DATE OF BIRTH
                      </label>
                      <p className="text-sm">Choose employee's DOB</p>
                    </div>
                    <div className="relative">
                      <DatePicker
                        id="DATE OF BIRTH"
                        placeholderText="Choose the employee date of join"
                        className="border-2 rounded-xl h-10 ps-4 border-gray-300 outline-none w-full lg:w-72"
                        selected={employeeDob}
                        onChange={(date) => setEmployeeDob(date)}
                      />
                    </div>
                  </div>

                  {/* marital status */}
                  <div className="flex flex-col xl:flex-row justify-between gap-1">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label className="font-medium text-sm">
                        MARITAL STATUS
                      </label>
                      <p className="text-sm">Choose option </p>
                    </div>
                    <div className="flex flex-wrap gap-4 w-full  lg:w-72">
                      <div className="flex items-center gap-1">
                        <input
                          value="Single"
                          type="radio"
                          name=""
                          id="single"
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          checked={maritalStatus === ""}
                        />
                        <label htmlFor="single" className="tex-sm font-medium">
                          Single
                        </label>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          value="Married"
                          type="radio"
                          name=""
                          id="Married"
                        />
                        <label htmlFor="Married" className="tex-sm font-medium">
                          Married
                        </label>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          value="                          Divorced
"
                          type="radio"
                          name=""
                          id="Divorced"
                        />
                        <label
                          htmlFor="Divorced"
                          className="tex-sm font-medium"
                        >
                          Divorced
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* pf info */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white py-4 px-4 lg:px-6 ">
                <p className="text-xl font-semibold ">PF Info</p>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label className="font-medium text-sm" htmlFor="UAN NO">
                        UAN NO.
                      </label>
                      <p className="text-sm">Add UAN NO.</p>
                    </div>

                    <input
                      id="UAN NO"
                      type="text"
                      placeholder="UAN No"
                      className="border-2 rounded-xl ps-4 h-10 border-gray-300 outline-none w-full  lg:w-72"
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        htmlFor="PF JOIN DATE"
                      >
                        PF JOIN DATE.
                      </label>
                      <p className="text-sm">dd/mm/yyyy</p>
                    </div>

                    <div className="relative">
                      <DatePicker
                        id="PF JOIN DATE"
                        placeholderText="PF Join Date"
                        className="border-2 rounded-xl h-10 ps-4 border-gray-300 outline-none w-full lg:w-72"
                        selected={pfJoinDate}
                        onChange={(date) => setPfJoinDate(date)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        htmlFor="PF EXP DATE"
                      >
                        PF EXP DATE.
                      </label>
                      <p className="text-sm">dd/mm/yyyy</p>
                    </div>

                    <div className="relative">
                      <DatePicker
                        id="PF EXP DATE"
                        placeholderText="PF  Exp Date"
                        className="border-2 rounded-xl h-10 ps-4 border-gray-300 outline-none w-full lg:w-72"
                        selected={pfExpiryDate}
                        onChange={(date) => setPfExpiryDate(date)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency contact */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white py-4 px-4 lg:px-6 ">
                <p className="text-xl font-semibold">Emergency Contact</p>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <label
                      className="font-medium text-sm"
                      htmlFor="EMERGENCY NAME"
                    >
                      FULL NAME
                    </label>
                    <input
                      id="EMERGENCY NAME"
                      type="text"
                      placeholder="Full Name"
                      className="border-2 rounded-xl ps-4 border-gray-300 outline-none h-10 w-full  lg:w-72"
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <label
                      className="font-medium text-sm"
                      htmlFor="EMERGENCY CONTACT"
                    >
                      CONTACT
                    </label>

                    <input
                      id="EMERGENCY CONTACT"
                      type="text"
                      placeholder="Contact Number"
                      className="border-2 rounded-xl ps-4 border-gray-300 outline-none h-10 w-full  lg:w-72"
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <label className="font-medium text-sm" htmlFor="">
                      RELATION TYPE
                    </label>
                    <div className="flex flex-wrap gap-4 w-full  lg:w-72">
                      <div className="flex items-center gap-1">
                        <input type="checkbox" name="" id="Single" />
                        <label htmlFor="father" className="tex-sm font-medium">
                          Father
                        </label>
                      </div>

                      <div className="flex items-center gap-1">
                        <input type="checkbox" name="" id="mother" />
                        <label htmlFor="mother" className="tex-sm font-medium">
                          Mother
                        </label>
                      </div>

                      <div className="flex items-center gap-1">
                        <input type="checkbox" name="" id="friend" />
                        <label htmlFor="friend" className="tex-sm font-medium">
                          Friend
                        </label>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" name="" id="sibling" />
                        <label htmlFor="sibling" className="tex-sm font-medium">
                          Sibling
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* education info */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white px-5 lg:px-3 py-4">
                <p className="text-xl font-semibold">Education Info</p>

                {/* List Education Info */}
                <div className="mt-5">
                  {educationInfo.map((info, index) => (
                    <div key={index} className="flex justify-between">
                      <div className=" px-2  flex flex-col ">
                        <p className="font-semibold">{info.schoolName}</p>
                        <p className="text-sm font-medium text-gray-500">
                          {info.departmentName}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                          {info.period}
                        </p>
                        <hr className="my-3" />
                      </div>

                      <IoClose
                        onClick={() => onClickEducationInfoDelete(index)}
                        className="ms-20 text-red-500 text-2xl cursor-pointer "
                      />
                    </div>
                  ))}
                </div>
                {/* Add Work Education */}
                <div
                  onClick={openAddEducationInfoModal}
                  className="flex items-center gap-4 mt-3 cursor-pointer"
                >
                  <IoAddCircleSharp className="text-blue-500 text-3xl" />
                  <p className="font-medium">Add education info</p>
                </div>
              </div>
            </div>

            {/* rightside bar */}
            <div className=" flex flex-grow basis-[30vw]  flex-col gap-3 ">
              {/* bank information */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white py-4 px-4 lg:px-6">
                <p className="text-xl font-semibold">Bank information</p>

                <div className="flex flex-col gap-3 mt-4">
                  {/* bank name */}
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        onClick={() => {
                          setBankNameIsOpen(!bankNameIsOpen);
                        }}
                      >
                        BANK NAME
                      </label>
                      <p className="text-sm">Bank Name</p>
                    </div>

                    <div className="relative w-full lg:w-52 border-2 rounded-xl ps-4 border-gray-300 outline-none ">
                      <button
                        onClick={() => {
                          setBankNameIsOpen(!bankNameIsOpen);
                        }}
                        className={`w-full ${
                          selectedBankNameOption
                            ? "text-black"
                            : "text-gray-400"
                        } py-2 text-left bg-white  rounded-lg shadow-sm focus:outline-none`}
                      >
                        {selectedBankNameOption || "Choose bank name"}{" "}
                      </button>

                      {bankNameIsOpen && (
                        <div className="absolute left-0 z-10 w-full  bg-white border border-gray-300 rounded-lg shadow-lg">
                          {/* Search box */}
                          <input
                            type="text"
                            value={searchedBankName}
                            onChange={(e) =>
                              setSearchedBankName(e.target.value)
                            }
                            placeholder="Search..."
                            className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
                          />
                          {/* Dropdown options */}
                          <ul className="max-h-48 overflow-y-auto">
                            {filteredBankNametOptions.length > 0 ? (
                              filteredBankNametOptions.map((option, index) => (
                                <li
                                  key={index}
                                  onClick={() => {
                                    setSelectedBankNameOption(option); // Update selected option
                                    setBankNameIsOpen(false);
                                  }}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                  {option}
                                </li>
                              ))
                            ) : (
                              <li className="px-4 py-2 text-gray-500">
                                No results found
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* bank acc no */}
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        htmlFor="BANK ACCOUNT NO"
                      >
                        BANK ACCOUNT NO.
                      </label>
                      <p className="text-sm">Bank account NO.</p>
                    </div>
                    <input
                      id="BANK ACCOUNT NO"
                      type="number"
                      placeholder="Enter acc number"
                      className="border-2 h-10 rounded-xl ps-4 border-gray-300 outline-none w-full lg:w-52"
                    />
                  </div>

                  {/* bank ifsc code */}
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        htmlFor="IFSC CODE"
                      >
                        IFSC CODE
                      </label>
                      <p className="text-sm">IFSC CODE</p>
                    </div>
                    <input
                      id="IFSC CODE"
                      type="number"
                      placeholder="Ente IFSC code"
                      className="border-2 rounded-xl h-10 ps-4 w-full lg:w-52 border-gray-300 outline-none"
                    />
                  </div>

                  {/* branch */}
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        htmlFor="bank branch"
                      >
                        BANK BRANCH
                      </label>
                      <p className="text-sm">Bank Branch</p>
                    </div>
                    <input
                      id="bank branch"
                      type="text"
                      placeholder="Ente Bank branch"
                      className="border-2 rounded-xl h-10 ps-4 w-full lg:w-52 border-gray-300 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* salary information */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white py-4 px-4 lg:px-6">
                <p className="text-xl font-semibold">Salary Information</p>

                <div className="flex flex-col gap-3 mt-4">
                  {/* salary basis */}
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        htmlFor="SALARY BASIS"
                      >
                        SALARY BASIS
                      </label>
                    </div>

                    <input
                      id="SALARY BASIS"
                      type="number"
                      placeholder="Enter salary basis"
                      className="border-2 rounded-xl ps-4 h-10 border-gray-300 outline-none w-full lg:w-52"
                    />
                  </div>

                  {/* salary amount */}
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        htmlFor="SALARY AMOUNT"
                      >
                        SALARY AMOUNT
                      </label>
                      <p className="text-sm">Per Month</p>
                    </div>
                    <input
                      id="SALARY AMOUNT"
                      type="text"
                      placeholder="Enter Salary"
                      className="border-2 rounded-xl ps-4 h-10 border-gray-300 outline-none w-full lg:w-52"
                    />
                  </div>

                  {/* effective data */}
                  <div className="flex flex-col xl:flex-row gap-1 justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        htmlFor="EFFECTIVE DATA"
                      >
                        EFFECTIVE DATA
                      </label>
                      <p className="text-sm">Effective Date</p>
                    </div>
                    <input
                      id="EFFECTIVE DATA"
                      type="text"
                      placeholder="Enter PAN NO"
                      className="border-2 rounded-xl ps-4 h-10 border-gray-300 outline-none w-full lg:w-52"
                    />
                  </div>

                  {/* payment type */}
                  <div className="flex flex-col xl:flex-row justify-between  ">
                    <div className="flex flex-col">
                      <label
                        className="font-medium text-sm"
                        htmlFor="PAYMENT TYPE"
                      >
                        PAYMENT TYPE
                      </label>
                      <p className="text-sm">Payment Type</p>
                    </div>
                    <div className="border-2 rounded-xl flex items-center text-gray-400 ps-4 h-10 border-gray-300 outline-none w-full lg:w-52">
                      <select
                        name=""
                        id="PAYMENT TYPE"
                        className="border-none w-full outline-none"
                      >
                        <option value="">Bank Transfer</option>pt
                        <option value="">UPI</option>pt
                        <option value="">Cash in hand</option>pt
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* experience */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white py-4 px-4 lg:px-6">
                <p className="text-xl font-semibold">Experience</p>

                {workExperiences.map((experience, index) => (
                  <div
                    key={index}
                    className="flex items-start  justify-between mt-4 border rounded-lg p-4 bg-gray-50"
                  >
                    <div>
                      <p className="font-semibold">{experience.jobTitle}</p>
                      <p>{experience.companyName}</p>
                      <p>
                        {experience.startWork} - {experience.endWork}
                      </p>
                      <ul className="mt-2">
                        {experience.responsibilities.map((res, idx) => (
                          <li key={idx} className="flex items-center">
                            <p className="">
                              {" "}
                              <GoDotFill className="mr-2  inline-flex" />
                              {res}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => onClickWorkExperienceDelete(index)}
                      className="text-xl text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <div
                  onClick={openWorkExperienceModal}
                  className="flex gap-3 font-medium cursor-pointer items-center mt-5"
                >
                  <IoAddCircleSharp className="text-blue-500 text-3xl" />
                  <p>Add work experience</p>
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white py-4 px-4 lg:px-6">
                <p className="text-xl font-semibold">Skills</p>

                <div className="bg-gray-100 p-4 rounded-xl mt-3">
                  <input
                    type="text"
                    placeholder="Add a skill and press Enter"
                    className="w-full  rounded-md bg-gray-100 h-5 border-none outline-none"
                    value={skillsInputValue}
                    onChange={(e) => setSkillsInputValue(e.target.value)}
                    onKeyPress={handleSkillsKeyPress}
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white text-gray-800 px-2 py-1 rounded-full"
                      >
                        <span className="mr-2">{skill}</span>
                        <button
                          className="text-black hover:text-red-600"
                          onClick={() => handleDeleteSkill(skill)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Document Section */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white py-4 px-4 lg:px-6">
                <p className="text-xl font-semibold">Documents</p>

                {/* Display Uploaded Files Outside Modal */}
                <div className="mt-4">
                  <ul className="list-disc space-y-2">
                    {uploadedDocuments.map((fileWrapper) => (
                      <li
                        key={fileWrapper.id}
                        className="flex items-center justify-between text-sm border-2 border-green-600 rounded-2xl px-4 py-3"
                      >
                        <div className=" w-full">
                          <p className="text-gray-500">
                            Title: {fileWrapper.title}
                          </p>
                          {fileWrapper.files && fileWrapper.files.length > 0 ? (
                            fileWrapper.files.map((file) => (
                              <div
                                key={file.id}
                                className="mt-2 w-full flex justify-between "
                              >
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() => {
                                    if (file.preview) {
                                      window.open(file.preview, "_blank");
                                    } else {
                                      alert("Preview not available");
                                    }
                                  }}
                                >
                                  <p>{file.file.path}</p>
                                </button>
                                <p
                                  className="text-red-500 cursor-pointer"
                                  onClick={() =>
                                    onClickDocumentDeleteButton(file.file.path)
                                  }
                                >
                                  x
                                </p>
                              </div>
                            ))
                          ) : (
                            <p>Unknown file</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  onClick={openAddEmployeeDocumentsModal}
                  className="flex gap-3 items-center font-medium mt-5 cursor-pointer"
                >
                  <IoAddCircleSharp className="text-blue-500 text-3xl" />
                  <p>Add employee documents</p>
                </div>
              </div>

              {/* verification doc */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white py-4 px-4 lg:px-6">
                <p className="text-xl font-semibold">Verification Doc.</p>
                <div className="flex gap-5 flex-wrap items-center mt-5 cursor-pointer">
                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="Aadhar" />
                    <label htmlFor="Aadhar" className="font-medium">
                      Aadhar
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="address proof" />
                    <label htmlFor="address proof" className="font-medium">
                      Address Proof
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="10th" />
                    <label htmlFor="10th" className="font-medium">
                      10 th
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="12th" />
                    <label htmlFor="12th" className="font-medium">
                      12 th
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="degree" />
                    <label htmlFor="degree" className="font-medium">
                      Degree
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="Photo Proof" />
                    <label htmlFor="Photo Proof" className="font-medium">
                      Photo Proof
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Larger Image */}
        {openImageModal && (
          <div
            className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center"
            onClick={() => setOpenImageModal(false)} // Close modal on overlay click
          >
            <div className="relative">
              <img
                src={selectedImage}
                alt="Full Size"
                className="max-w-full h-[70vh] object-contain"
              />
              <button
                className="absolute top-2 right-2 bg-white rounded-full px-3 py-1"
                onClick={() => setOpenImageModal(false)} // Close modal on button click
              >
                Close
              </button>
            </div>
          </div>
        )}

        {addEducationalInfoModalOpen && (
          <div className="fixed inset-0 top-0 bg-black/10 backdrop-blur-sm bg-opacity-50 z-50">
            {/* Overlay */}
            <div
              className="absolute inset-0"
              onClick={closeAddEducationInfoModal}
            ></div>

            <div
              className={`fixed top-0 right-0 h-screen overflow-y-scroll w-[90vw] md:w-[70vw] bg-white shadow-lg px-5 md:px-16 py-10 transform transition-transform duration-500 ease-in-out ${
                isAnimating ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div
                className="w-6 h-6 rounded-full border-2 transition-all duration-500 bg-white border-gray-300 flex items-center justify-center cursor-pointer"
                title="Toggle Sidebar"
                onClick={closeAddEducationInfoModal}
              >
                <IoIosArrowForward className="w-3 h-3" />
              </div>

              <div className="flex flex-wrap flex-col md:flex-row justify-between">
                <p className="text-3xl font-medium mt-8">Education Info</p>
                <div className="flex justify-end gap-5 mt-8">
                  <button
                    onClick={closeAddEducationInfoModal}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-3 md:px-9 py-1 md:py-2 font-semibold rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEducationInfo}
                    className="bg-blue-600 text-white px-5 md:px-9 py-1 md:py-2 font-semibold rounded-full"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                {/* School Name */}
                <div className="flex flex-col lg:flex-row gap-1 justify-between">
                  <div className="flex flex-col">
                    <label
                      className="font-medium text-sm"
                      htmlFor="school-name"
                    >
                      SCHOOL NAME
                    </label>
                    <p className="text-sm text-gray-500">Add School Name</p>
                  </div>
                  <input
                    type="text"
                    id="school-name"
                    placeholder="School name"
                    className="border-2 rounded-xl ps-4 py-2 border-gray-300 outline-none h-10 w-full md:w-96"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>

                {/* Department Name */}
                <div className="flex flex-col lg:flex-row gap-1 justify-between">
                  <div className="flex flex-col">
                    <label
                      className="font-medium text-sm"
                      htmlFor="department-name"
                    >
                      DEPARTMENT NAME
                    </label>
                    <p className="text-sm text-gray-500">Add Department</p>
                  </div>
                  <input
                    type="text"
                    id="department-name"
                    placeholder="Department name"
                    className="border-2 rounded-xl px-4 py-2 border-gray-300 outline-none h-10 w-full md:w-96"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                  />
                </div>

                {/* Period of Year */}
                <div className="flex flex-col lg:flex-row gap-1 justify-between">
                  <div className="flex flex-col">
                    <label
                      className="font-medium text-sm"
                      htmlFor="yearofpassing"
                    >
                      YEAR OF PASSING
                    </label>
                    <p className="text-sm text-gray-500">Period of year</p>
                  </div>

                  <div className="year-picker">
                    <DatePicker
                      selected={yearOfPassing}
                      onChange={(date) => setYearOfPassing(date)}
                      showYearPicker
                      dateFormat="yyyy"
                      className="border-2 rounded-xl px-4 py-2  h-10 w-full md:w-96 border-gray-300 outline-none "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {addWorkExperienceModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm  z-50">
            {/* Overlay */}
            <div
              className="absolute inset-0 "
              onClick={closeAddWorkExperienceModal}
            ></div>
            <div
              className={`fixed top-0 right-0 h-full overflow-y-scroll w-screen sm:w-[90vw] md:w-[70vw] bg-white shadow-lg px-5 md:px-16 py-10 transform transition-transform duration-500 ease-in-out ${
                isAnimating ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div
                className="w-6 h-6 rounded-full  border-2 transition-all duration-500 bg-white border-gray-300 flex items-center justify-center cursor-pointer"
                title="Toggle Sidebar"
                onClick={closeAddWorkExperienceModal}
              >
                <IoIosArrowForward className="w-3 h-3" />
              </div>

              <div className="flex flex-col md:flex-row justify-between ">
                <p className="text-3xl font-medium mt-8">Experience</p>
                <div className="flex gap-5 justify-end mt-8">
                  <button
                    onClick={closeAddWorkExperienceModal}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-3 md:px-9 py-2 font-semibold rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveExperience}
                    className="bg-blue-600 text-white px-4 md:px-9 py-2 font-semibold rounded-full"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <div className="flex flex-col lg:flex-row gap-1 justify-between">
                  <div className="flex flex-col ">
                    <label className="font-medium text-sm" htmlFor="jobTitle">
                      JOB TITLE
                    </label>
                    <p className="text-sm">Job title</p>
                  </div>
                  <input
                    type="text"
                    id="jobTitle"
                    value={experienceForm.jobTitle}
                    onChange={(e) =>
                      setExperienceForm((prev) => ({
                        ...prev,
                        jobTitle: e.target.value,
                      }))
                    }
                    placeholder="Enter job title"
                    className="border-2 rounded-xl ps-4 py-2 h-10 border-gray-300 outline-none w-full md:w-96"
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-1 justify-between">
                  <div className="flex flex-col">
                    <label
                      className="font-medium text-sm"
                      htmlFor="companyIndustry"
                    >
                      COMPANY'S INDUSTRY
                    </label>
                    <p className="text-sm">Company's industry</p>
                  </div>
                  <input
                    type="text"
                    value={experienceForm.companyIndustry}
                    onChange={(e) =>
                      setExperienceForm((prev) => ({
                        ...prev,
                        companyIndustry: e.target.value,
                      }))
                    }
                    id="companyIndustry"
                    placeholder="Information Technology"
                    className="border-2 rounded-xl ps-4 h-10 border-gray-300 outline-none w-full md:w-96"
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-1 justify-between">
                  <div className="flex flex-col">
                    <label
                      className="font-medium text-sm"
                      htmlFor="companyName"
                    >
                      COMPANY NAME
                    </label>
                    <p className="text-sm">Company name</p>
                  </div>
                  <input
                    value={experienceForm.companyName}
                    onChange={(e) =>
                      setExperienceForm((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                    type="text"
                    id="companyName"
                    placeholder="Company name"
                    className="border-2 rounded-xl ps-4 h-10 border-gray-300 outline-none w-full md:w-96"
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-1 justify-between">
                  <div className="flex flex-col">
                    <label
                      className="font-medium text-sm"
                      htmlFor="previousSalary"
                    >
                      PREVIOUS SALARY
                    </label>
                    <p className="text-sm">Previous salary</p>
                  </div>
                  <input
                    value={experienceForm.previousSalary}
                    onChange={(e) =>
                      setExperienceForm((prev) => ({
                        ...prev,
                        previousSalary: e.target.value,
                      }))
                    }
                    type="text"
                    id="previousSalary"
                    placeholder="Previous salary"
                    className="border-2 rounded-xl ps-4 h-10 border-gray-300 outline-none w-full md:w-96"
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-1 justify-between">
                  <div className="flex flex-col">
                    <label
                      className="font-medium text-sm"
                      htmlFor="periodOfWork"
                    >
                      PERIOD OF WORK
                    </label>
                    <p className="text-sm">Period of work</p>
                  </div>
                  <div className="flex gap-3  w-full md:w-96">
                    <input
                      value={experienceForm.startWork}
                      onChange={(e) =>
                        setExperienceForm((prev) => ({
                          ...prev,
                          startWork: e.target.value,
                        }))
                      }
                      type="date"
                      id="startWork"
                      placeholder="Start work"
                      className="border-2 w-[50%] rounded-xl px-3 h-10 text-gray-400  border-gray-300 outline-none"
                    />
                    <input
                      value={experienceForm.endWork}
                      onChange={(e) =>
                        setExperienceForm((prev) => ({
                          ...prev,
                          endWork: e.target.value,
                        }))
                      }
                      type="date"
                      id="endWork"
                      placeholder="End work"
                      className="border-2 w-[50%] rounded-xl px-3 h-10 text-gray-400 border-gray-300 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-1 justify-between">
                  <div className="flex flex-col">
                    <label
                      className="font-medium text-sm"
                      htmlFor="responsibilities"
                    >
                      RESPONSIBILITIES
                    </label>
                    <p className="text-sm">Short description about job</p>
                  </div>

                  <div className=" border-2 border-gray-300 rounded-2xl  w-full md:w-96">
                    <input
                      type="text"
                      placeholder="Add responsibility and press Enter"
                      value={responsibilityInput}
                      onChange={(e) => setResponsibilityInput(e.target.value)}
                      onKeyDown={handleAddResponsibility}
                      className="w-full  h-10 rounded-md px-3 mt-3  border-none outline-none"
                    />
                    <ul className="mt-2">
                      {experienceForm.responsibilities.map((res, index) => (
                        <div className="flex items-start justify-between pe-5">
                          <li key={index}>
                            <p className="">
                              {" "}
                              <GoDotFill className="mr-2  inline-flex" />
                              {res}
                            </p>
                          </li>
                          <button
                            onClick={() => handleDeleteResponsibility(index)}
                            className="ml-2 text-red-500"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-3xl font-medium mt-8">
                  Verification Process
                </p>

                <div className="flex mt-5 gap-5">
                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Payslip 1</label>
                  </div>

                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Payslip 2</label>
                  </div>

                  <div className="flex gap-2">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Payslip 3</label>
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">last company appointment letter</label>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">last company experience letter</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {addEmployeeDocumentsModalOpen && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50">
            <div
              className="absolute inset-0"
              onClick={closeAddEmployeeDocumentsModal}
            ></div>

            <div
              className={`fixed top-0 right-0 h-full  overflow-y-scroll w-[90vw] md:w-[70vw] bg-white  px-5 md:px-16 py-10 transform transition-transform duration-500 ease-in-out ${
                isAnimating ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div
                className="w-6 h-6 rounded-full  border-2 transition-all duration-500 bg-white border-gray-300 flex items-center justify-center cursor-pointer"
                title="Toggle Sidebar"
                onClick={closeAddEmployeeDocumentsModal}
              >
                <IoIosArrowForward className="w-3 h-3" />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-medium mt-8">Documents</p>
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={closeAddEmployeeDocumentsModal}
                    className="bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-6 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveUploadedFile}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full"
                  >
                    Save
                  </button>
                </div>
              </div>
              {/* Title Input */}
              <div className="flex flex-col lg:flex-row gap-1  justify-between mt-8">
                <div className="flex flex-col">
                  <label className="font-medium text-sm" htmlFor="school-name">
                    ENTER TITLE
                  </label>
                  <p className="text-sm text-gray-500">Doc title</p>
                </div>
                <input
                  type="text"
                  id="school-name"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 rounded-xl px-4 py-2 border-gray-300 outline-none w-full md:w-96"
                />
              </div>
              {/* Drag and Drop Area */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed mt-5 rounded-lg py-10 px-5 text-center ${
                  isDragActive ? "border-blue-500" : "border-gray-300"
                } ${!title.trim() ? "opacity-50 pointer-events-none" : ""}`} // Visual indicator when disabled
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-blue-500">Drop your files here...</p>
                ) : (
                  <div className="text-gray-500">
                    <IoCloudUploadOutline className="text-6xl text-blue-500 mx-auto" />
                    <p className="mt-3">
                      Drag & drop files here, or{" "}
                      <span className="text-blue-500 underline cursor-pointer">
                        browse
                      </span>
                    </p>
                    <p>Supported formats: JPEG, PNG, PDF</p>
                    {!title.trim() && (
                      <p className="text-red-500 mt-2">
                        Enter a title to enable file upload.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5">
                {uploadedFiles.length > 0 ? (
                  <div>
                    {uploadedFiles.map((group) => (
                      <div key={group.title} className="mb-4">
                        <p className="font-medium text-lg text-gray-700">
                          {group.title}
                        </p>
                        <ul className="list-disc space-y-2 ml-4">
                          {group.files.map((fileWrapper) => (
                            <li
                              key={fileWrapper.id}
                              className="flex items-center justify-between text-sm border-2 border-green-600 rounded-2xl px-4 py-3"
                            >
                              <div>
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() =>
                                    window.open(fileWrapper.preview, "_blank")
                                  }
                                >
                                  {fileWrapper.file.path}
                                </button>
                              </div>
                              <MdDeleteForever
                                className="text-2xl text-red-400 hover:text-red-600 cursor-pointer"
                                onClick={() =>
                                  handleDelete(fileWrapper.id, group.title)
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No documents uploaded yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CreateEmployee_Mainbar;
