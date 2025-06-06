import { useEffect, useState } from "react";
import CompanyInfo from "../../assets/images/company-info.svg";
import { InputGroup, Form, Button, FormLabel } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { vendorCompanyInfoSchema } from "../../helpers/validation";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { CiCircleChevRight } from "react-icons/ci";
import { companyInfoData } from "../../data/companyInforData";
import { getAllVendors, getVendorById } from "../../redux/Vendor/VendorSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { createCompanyInfo } from "../../redux/Vendor/CompanyInfoSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Cookies from "js-cookie";
import saudiData from "../../data/saudi";

const VendorCompanyInfo = ({ setActiveStep }) => {
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.vendorReducer);
  console.log(vendors);
  const personalInformation = vendors?.data?.vendor?.personalInformation;
  const vendorCountry = personalInformation?.country;
  const vendorCompanyType = personalInformation?.companyType;

  const [dynamicFormFields, setDynamicFormFields] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(vendorCompanyInfoSchema),
  });

  useEffect(() => {
    const id = Cookies.get("_id");
    if (id) {
      dispatch(getVendorById(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      vendorCountry &&
      vendorCompanyType &&
      saudiData[vendorCountry] &&
      saudiData[vendorCountry][vendorCompanyType]
    ) {
      const companyInfoConfig =
        saudiData[vendorCountry][vendorCompanyType].companyInformation;

      setDynamicFormFields(companyInfoConfig);

      const initialFormData = {};
      companyInfoConfig.forEach((field) => {
        if (typeof field === "string") {
          initialFormData[field] = "";
        } else if (typeof field === "object") {
          const key = Object.keys(field)[0];
          initialFormData[key] = "";
        }
      });

      reset(initialFormData);
    }
  }, [vendors, vendorCountry, vendorCompanyType, reset]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(createCompanyInfo(data));
      if (createCompanyInfo.fulfilled.match(resultAction)) {
        toast.success("Company Information submitted successfully!");
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        toast.error(resultAction.payload || "Failed to create Company");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="vendor-company-info-content">
          <div className="col-md-6 vendor-form-img">
            <img src={CompanyInfo} alt="company-info" className="vendor-img" />
          </div>

          <div className="col-md-6 vendor-form-field">
            <div className="vendor-heading">Company Information</div>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column align-items-center gap-3"
            >
              {dynamicFormFields.map((field, index) => {
                if (typeof field === "string") {
                  return (
                    <Form.Group className="col-md-7" key={field}>
                      <InputGroup className="mt-2">
                        <Form.Control
                          className="small-custom-textfield"
                          placeholder={field
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          type={
                            field.toLowerCase().includes("date")
                              ? "date"
                              : "text"
                          }
                          {...register(field)}
                        />
                        {errors[field] && (
                          <InputGroup.Text>
                            <ErrorOutlineOutlinedIcon className="text-danger" />
                          </InputGroup.Text>
                        )}
                      </InputGroup>
                      {errors[field] && (
                        <Form.Text className="error-message text-danger error-text">
                          {errors[field].message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  );
                } else if (typeof field === "object") {
                  const key = Object.keys(field)[0];
                  const options = field[key];

                  if (key === "businessActivity") {
                    return (
                      <Form.Group key={key}>
                        <FormControl component="fieldset">
                          <Controller
                            control={control}
                            name={key}
                            render={({ field }) => (
                              <RadioGroup {...field} row>
                                {options.map((option) => (
                                  <FormControlLabel
                                    key={option}
                                    value={option
                                      .toLowerCase()
                                      .replace(/\s/g, "-")}
                                    control={<Radio />}
                                    label={option}
                                    sx={{
                                      "& .MuiFormControlLabel-label": {
                                        fontSize: "12px !important",
                                        color: "#6F6363",
                                      },
                                    }}
                                  />
                                ))}
                              </RadioGroup>
                            )}
                          />
                          {errors[key] && (
                            <Form.Text className="error-message text-danger error-text">
                              {errors[key].message}
                            </Form.Text>
                          )}
                        </FormControl>
                      </Form.Group>
                    );
                  } else {
                    return (
                      <Form.Group className="col-md-7" key={key}>
                        <Form.Label className="form-label">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </Form.Label>
                        <Form.Select
                          className="small-custom-textfield"
                          {...register(key)}
                        >
                          <option value="">Select {key}</option>
                          {options.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                        {errors[key] && (
                          <Form.Text className="error-message text-danger error-text">
                            {errors[key].message}
                          </Form.Text>
                        )}
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
        <div></div>
        <CiCircleChevRight
          size={50}
          onClick={handleSubmit(onSubmit)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default VendorCompanyInfo;
