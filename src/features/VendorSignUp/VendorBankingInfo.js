import React, { useEffect, useState } from "react";
import BankInfo from "../../assets/images/bank-info.svg";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { vendorBankingInfoSchema } from "../../helpers/validation";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateBankingInfo } from "../../redux/Vendor/BankingInfoSlice";
import saudiData from "../../data/saudi";
import Cookies from "js-cookie";
import { getVendorById } from "../../redux/Vendor/VendorSlice";
import { TbFileUpload } from "react-icons/tb"

const VendorBankingInfo = ({ setActiveStep }) => {
  const [formData, setFormData] = useState({});
  const [dynamicFormFields, setDynamicFormFields] = useState([]); // State to hold dynamic fields
  const [bankDocumentFile, setBankDocumentFile] = useState("Bank Document Upload");

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
    resolver: yupResolver(vendorBankingInfoSchema),
    mode: "onBlur",
  });

  const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf", // Assuming PDF for bank documents
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
    if (vendorCountry && vendorCompanyType && saudiData[vendorCountry] && saudiData[vendorCountry][vendorCompanyType]) {
      const bankingInfoConfig = saudiData[vendorCountry][vendorCompanyType].bankingDetails;
      setDynamicFormFields(bankingInfoConfig);

      const initialFormData = {};
      bankingInfoConfig.forEach(field => {
        if (typeof field === 'string' && field !== 'bankDocumentUpload') {
          initialFormData[field] = "";
        } else if (typeof field === 'object' && (Object.keys(field)[0] === 'bankAccountType' || Object.keys(field)[0] === 'paymentCurrency')) {
          initialFormData[Object.keys(field)[0]] = ""; // Initialize radio groups
        }
      });
      setFormData(initialFormData);
      reset(initialFormData);
    }
  }, [vendors, vendorCountry, vendorCompanyType, reset]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBankDocumentFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error("Invalid file type for Bank Document. Only JPG, PNG, PDF are allowed.");
        e.target.value = null;
        setBankDocumentFile("Bank Document Upload");
        setValue("bankDocumentUpload", null);
      } else {
        setBankDocumentFile(file.name);
        setValue("bankDocumentUpload", file);
      }
    } else {
      setBankDocumentFile("Bank Document Upload");
      setValue("bankDocumentUpload", null);
    }
    trigger("bankDocumentUpload");
  };

  const onSubmit = async (data) => {
    console.log("Final Form Data (from React Hook Form):", data);

    const formDataToSend = new FormData();
    // Append only the fields that were dynamically rendered
    dynamicFormFields.forEach(field => {
        if (typeof field === 'string' && data[field]) {
            formDataToSend.append(field, data[field]);
        } else if (typeof field === 'object') {
            const fieldName = Object.keys(field)[0];
            if (data[fieldName]) { // If it's a radio group (like bankAccountType or paymentCurrency)
                formDataToSend.append(fieldName, data[fieldName]);
            }
        }
    });

    // Manually append file input if it exists in the dynamic fields and has data
    if (dynamicFormFields.some(field => typeof field === 'string' && field === 'bankDocumentUpload') && data.bankDocumentUpload) {
        formDataToSend.append("bankDocumentUpload", data.bankDocumentUpload);
    }

    try {
      const resultAction = await dispatch(updateBankingInfo(formDataToSend)); // Assuming your backend expects FormData for updates

      if (updateBankingInfo.fulfilled.match(resultAction)) {
        console.log("Submission successful:", resultAction.payload);
        setActiveStep((prev) => prev + 1);
        toast.success("Banking Information updated successfully!");
      } else if (updateBankingInfo.rejected.match(resultAction)) {
        console.error("Submission failed:", resultAction.payload);
        toast.error(`Submission failed: ${resultAction.payload?.message || "Please check server logs."}`);
      }
    } catch (error) {
      console.error("Network or Unexpected Error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  if (!personalInformation) {
    return <div>Loading personal information...</div>;
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="container">
        <div className="vendor-company-info-content">
          <div className="col-md-6 vendor-form-img">
            <img src={BankInfo} alt="bank-info" className="vendor-img" />
          </div>
          <div className="col-md-6 vendor-form-field">
            <div className="vendor-heading">Banking Details</div>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column align-items-center gap-3"
            >
              {dynamicFormFields.map((field, index) => {
                if (typeof field === "string") {
                  // Handle file upload for bankDocumentUpload
                  if (field === "bankDocumentUpload") {
                    return (
                      <Form.Group key={field} className="col-md-7 mt-3">
                        <div className="file-upload-box">
                          <label htmlFor="bank-document-upload" className="upload-label">
                            <span className="file-name">{bankDocumentFile}</span>
                            <TbFileUpload className="upload-icon" />
                          </label>
                          <input
                            id="bank-document-upload"
                            type="file"
                            onChange={handleBankDocumentFileChange}
                            className="hidden-file-input"
                          />
                        </div>
                        {errors.bankDocumentUpload && (
                          <Form.Text className="text-danger error-text">
                            {errors.bankDocumentUpload.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    );
                  } else {
                    // Render standard text input fields
                    return (
                      <Form.Group className="col-md-7" key={field}>
                        <InputGroup className="mt-2">
                          <Form.Control
                            className="small-custom-textfield"
                            placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                } else if (typeof field === "object") {
                  const fieldName = Object.keys(field)[0];
                  const options = field[fieldName];

                  // Handle Radio Groups like 'bankAccountType' and 'paymentCurrency'
                  if (fieldName === 'bankAccountType' || fieldName === 'paymentCurrency') {
                    return (
                      <Form.Group className="col-md-7" key={fieldName}>
                        <FormControl component="fieldset">
                          <FormLabel id={`${fieldName}-radio-group-label`}>
                            <div className="d-flex align-items-center gap-2">
                              {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              {errors[fieldName] && (
                                <ErrorOutlineOutlinedIcon className="text-danger" />
                              )}
                            </div>
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby={`${fieldName}-radio-group-label`}
                            className="gap-4"
                            name={fieldName}
                            value={formData[fieldName] || ""}
                            onChange={handleChange}
                          >
                            {options.map((option) => (
                              <FormControlLabel
                                key={option}
                                value={option.toLowerCase().replace(/\s/g, '-')}
                                control={<Radio />}
                                label={option}
                                {...register(fieldName)}
                              />
                            ))}
                          </RadioGroup>
                          {errors[fieldName] && (
                            <Form.Text className="text-danger error-text">
                              {errors[fieldName].message}
                            </Form.Text>
                          )}
                        </FormControl>
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


export default VendorBankingInfo;
