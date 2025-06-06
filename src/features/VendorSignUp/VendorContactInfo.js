import React, { useEffect, useState } from "react";
import ContactInfo from "../../assets/images/contact-info.svg";
import { InputGroup, Form, Button } from "react-bootstrap";
import { TbFileUpload } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { vendorContactInfoSchema } from "../../helpers/validation";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { updateContactInfo } from "../../redux/Vendor/ContactInfoSlice";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import saudiData from "../../data/saudi";
import { getVendorById } from "../../redux/Vendor/VendorSlice";

const VendorContactInfo = ({ setActiveStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signatureFile, setSignatureFile] = useState("Authority Signature");
  const [companyFile, setCompanyFile] = useState("Company Logo");
  const [dynamicFormFields, setDynamicFormFields] = useState([]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();

  const { vendors } = useSelector((state) => state.vendorReducer);
  const personalInformation = vendors?.data?.personalInformation;
  const vendorCountry = personalInformation?.country;
  const vendorCompanyType = personalInformation?.companyType;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(vendorContactInfoSchema),
    mode: "onBlur",
  });

  const [formData, setFormData] = useState({}); // Initialize as empty object

  const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
  ];

  // Effect to fetch vendor data
  useEffect(() => {
    const id = Cookies.get("vendorId");
    if (id) {
      dispatch(getVendorById(id));
    }
  }, [dispatch]);

  // Effect to set dynamic form fields based on country and company type
  useEffect(() => {
    if (
      vendorCountry &&
      vendorCompanyType &&
      saudiData[vendorCountry] &&
      saudiData[vendorCountry][vendorCompanyType]
    ) {
      const contactInfoConfig =
        saudiData[vendorCountry][vendorCompanyType].contactInformation;
      setDynamicFormFields(contactInfoConfig);

      // Initialize formData and reset react-hook-form with dynamic fields
      const initialFormData = {};
      contactInfoConfig.forEach((field) => {
        // Exclude file inputs from initial string fields, handle them separately
        if (
          typeof field === "string" &&
          field !== "authoritySignature" &&
          field !== "companyLogo"
        ) {
          initialFormData[field] = "";
        }
      });
      setFormData(initialFormData);
      reset(initialFormData); // Reset form with dynamic default values
    }
  }, [vendors, vendorCountry, vendorCompanyType, reset]); // Re-run when vendor data changes

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignatureFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(
          "Invalid file type for Authority Signature. Only JPG, PNG, SVG, JPEG are allowed."
        );
        e.target.value = null;
        setSignatureFile("Authority Signature");
        setValue("authoritySignature", null);
      } else {
        setSignatureFile(file.name);
        setValue("authoritySignature", file);
      }
    } else {
      setSignatureFile("Authority Signature");
      setValue("authoritySignature", null);
    }
    trigger("authoritySignature");
  };

  const handleCompanyFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(
          "Invalid file type for Company Logo. Only JPG, PNG, SVG, JPEG are allowed."
        );
        e.target.value = null;
        setCompanyFile("Company Logo");
        setValue("companyLogo", null);
      } else {
        setCompanyFile(file.name);
        setValue("companyLogo", file);
      }
    } else {
      setCompanyFile("Company Logo");
      setValue("companyLogo", null);
    }
    trigger("companyLogo");
  };

  const onSubmit = async (data) => {
    setActiveStep((prev) => prev + 1);
    // console.log("Final Form Data (from React Hook Form):", data);

    // const formDataToSend = new FormData();
    // // Append only the fields that were dynamically rendered
    // dynamicFormFields.forEach((field) => {
    //   if (typeof field === "string" && data[field]) {
    //     formDataToSend.append(field, data[field]);
    //   }
    // });

    // // Manually append file inputs if they exist in the dynamic fields and have data
    // if (
    //   dynamicFormFields.includes("authoritySignature") &&
    //   data.authoritySignature
    // ) {
    //   formDataToSend.append("authoritySignature", data.authoritySignature);
    // }
    // if (dynamicFormFields.includes("companyLogo") && data.companyLogo) {
    //   formDataToSend.append("companyLogo", data.companyLogo);
    // }

    // try {
    //   const resultAction = await dispatch(updateContactInfo(formDataToSend));

    //   if (updateContactInfo.fulfilled.match(resultAction)) {
    //     console.log("Submission successful:", resultAction.payload);
    //     const vendorId =
    //       resultAction.payload?.vendorInformation?._id ||
    //       resultAction.payload?.companyInformation?._id;

    //     if (vendorId) {
    //       Cookies.set("vendorId", vendorId, { expires: 7 });
    //       console.log("Stored vendorId in cookies:", vendorId);
    //     }
    //     setActiveStep((prev) => prev + 1);
    //     toast.success("Contact Information submitted successfully!");
    //   } else if (updateContactInfo.rejected.match(resultAction)) {
    //     console.error("Submission failed:", resultAction.payload);
    //     toast.error(
    //       `Submission failed: ${
    //         resultAction.payload?.message || "Please check server logs."
    //       }`
    //     );
    //   }
    // } catch (error) {
    //   console.error("Network or Unexpected Error:", error);
    //   toast.error("An unexpected error occurred. Please try again later.");
    // }
  };

  if (!personalInformation) {
    return <div>Loading personal information...</div>;
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container">
        <div className="vendor-company-info-content">
          <div className="col-md-6 vendor-form-img">
            <img src={ContactInfo} alt="contact-info" className="vendor-img" />
          </div>
          <div className="col-md-6 vendor-form-field">
            <div className="vendor-heading">Contact Information</div>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column align-items-center gap-3"
            >
              {dynamicFormFields.map((field) => {
                if (typeof field === "string") {
                  if (field === "authoritySignature") {
                    return (
                      <Form.Group key={field} className="col-md-7 mt-3">
                        <div className="file-upload-box">
                          <label
                            htmlFor="authority-signature"
                            className="upload-label"
                          >
                            <span className="file-name">{signatureFile}</span>
                            <TbFileUpload className="upload-icon" />
                          </label>
                          <input
                            id="authority-signature"
                            type="file"
                            onChange={handleSignatureFileChange}
                            className="hidden-file-input"
                          />
                        </div>
                        {errors.authoritySignature && (
                          <Form.Text className="text-danger error-text">
                            {errors.authoritySignature.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    );
                  } else if (field === "companyLogo") {
                    return (
                      <Form.Group key={field} className="col-md-7 mt-3">
                        <div className="file-upload-box">
                          <label
                            htmlFor="company-logo"
                            className="upload-label"
                          >
                            <span className="file-name">{companyFile}</span>
                            <TbFileUpload className="upload-icon" />
                          </label>
                          <input
                            id="company-logo"
                            type="file"
                            onChange={handleCompanyFileChange}
                            className="hidden-file-input"
                          />
                        </div>
                        {errors.companyLogo && (
                          <Form.Text className="text-danger error-text">
                            {errors.companyLogo.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    );
                  } else if (field === "password") {
                    return (
                      <Form.Group className="col-md-7" key={field}>
                        <InputGroup className="mt-2">
                          <Form.Control
                            className="small-custom-textfield"
                            placeholder={field
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            name={field}
                            type={showPassword ? "text" : "password"}
                            value={formData[field] || ""}
                            {...register(field)}
                            onChange={handleChange}
                          />
                          <InputGroup.Text
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </InputGroup.Text>
                          {errors[field] && (
                            <InputGroup.Text>
                              <ErrorOutlineOutlinedIcon className="text-danger" />
                            </InputGroup.Text>
                          )}
                        </InputGroup>
                      </Form.Group>
                    );
                  } else {
                    // Default text input for other fields
                    return (
                      <Form.Group className="col-md-7" key={field}>
                        <InputGroup className="mt-2">
                          <Form.Control
                            className="small-custom-textfield"
                            placeholder={field
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            name={field}
                            value={formData[field] || ""}
                            {...register(field)}
                            onChange={handleChange}
                          />
                          {errors[field] && (
                            <InputGroup.Text>
                              <ErrorOutlineOutlinedIcon className="text-danger" />
                            </InputGroup.Text>
                          )}
                        </InputGroup>
                      </Form.Group>
                    );
                  }
                }
                return null;
              })}
            </Form>
          </div>
        </div>
      </div>
      <div className="vendor-bottom-navigate">
        <CiCircleChevLeft
          size={50}
          onClick={() => setActiveStep((prev) => prev - 1)}
          style={{ cursor: "pointer" }}
        />
        <CiCircleChevRight
          size={50}
          onClick={handleSubmit(onSubmit)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default VendorContactInfo;
