import React, { useEffect, useState } from "react";
import TaxInfo from "../../assets/images/Tax-01.svg";
import {
  InputGroup,
  Form,
  Button,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { TbFileUpload } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { vendorTaxInfoSchema } from "../../helpers/validation";
import saudiData from "../../data/saudi";
import { toast, ToastContainer } from "react-toastify";
import { getVendorById } from "../../redux/Vendor/VendorSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const VendorTaxInfo = ({ setActiveStep }) => {
  const [dynamicFormFields, setDynamicFormFields] = useState([]);

  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.vendorReducer);
  const personalInformation = vendors?.data?.personalInformation;
  const taxInformation = vendors?.data?.taxInformation;
  const vendorCountry = personalInformation?.country;
  const vendorCompanyType = personalInformation?.companyType;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(vendorTaxInfoSchema),
    mode: "onBlur",
  });

  const watchedIsVATRegistered = watch("isVATRegistered");
  const watchedIsSaudiOwned = watch("isSaudiOwned");
  const watchedEmploysLocalStaff = watch("employsLocalStaff");

  useEffect(() => {
    const id = Cookies.get("vendorId");
    if (id) dispatch(getVendorById(id));
  }, [dispatch]);

  useEffect(() => {
    if (
      vendorCountry &&
      vendorCompanyType &&
      saudiData[vendorCountry] &&
      saudiData[vendorCountry][vendorCompanyType]
    ) {
      const taxInfoConfig =
        saudiData[vendorCountry][vendorCompanyType].taxInformation;
      setDynamicFormFields(taxInfoConfig);

      const initialFormValues = {};
      taxInfoConfig.forEach((field) => {
        if (typeof field === "string") {
          initialFormValues[field] = taxInformation?.[field] || "";
        } else if (typeof field === "object") {
          const fieldName = Object.keys(field)[0];
          if (
            ["isVATRegistered", "isSaudiOwned", "employsLocalStaff"].includes(
              fieldName
            )
          ) {
            initialFormValues[fieldName] = taxInformation?.[fieldName] || "";
          } else if (fieldName === "shareholderDetails") {
            field[fieldName].forEach((subField) => {
              initialFormValues[subField] = taxInformation?.[subField] || "";
            });
          }
        }
      });

      reset(initialFormValues);
    }
  }, [vendors, vendorCountry, vendorCompanyType, taxInformation, reset]);

  const onSubmit = async (data) => {
    setActiveStep((prev) => prev + 1);
  };

  if (!personalInformation) {
    return <div>Loading personal information...</div>;
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="container">
        <div className="vendor-company-info-content">
          <div className="col-md-6 vendor-form-img">
            <img src={TaxInfo} alt="tax-info" className="vendor-img" />
          </div>
          <div className="col-md-6 vendor-form-field">
            <div className="vendor-heading">Status/Tax Information</div>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column align-items-center gap-3"
            >
              {dynamicFormFields.map((field, index) => {
                if (typeof field === "string") {
                  return (
                    <Form.Group key={index}>
                      <Form.Label>{field}</Form.Label>
                      <Form.Control
                        className="small-custom-textfield"
                        placeholder={`Enter ${field}`}
                        {...register(field)}
                      />
                    </Form.Group>
                  );
                } else if (typeof field === "object" && !Array.isArray(field)) {
                  const [key, options] = Object.entries(field)[0];
                  return (
                    <Form.Group key={index}>
                      <Form.Label>{key}</Form.Label>
                      <Form.Select {...register(key)}>
                        <option value="">Select</option>
                        {options.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  );
                }
                return null;
              })}
              <button type="submit" style={{ display: "none" }}></button>
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

export default VendorTaxInfo;
