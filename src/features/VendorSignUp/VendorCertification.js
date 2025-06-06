import React, { useState, useEffect } from "react";
import Certification from "../../assets/images/certificate-info.svg";
import { InputGroup, Form, FormText } from "react-bootstrap";
import { TbFileUpload } from "react-icons/tb";
import { LuCirclePlus } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { updateCertificateInfo } from "../../redux/Vendor/CertificateInfoSlice";

const SUPPORTED_FORMATS = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const certificationItemSchema = yup.object().shape({
  fileName: yup.string().required("File Name is required"),
  file: yup
    .mixed()
    .required("File upload is required")
    .test(
      "fileType",
      "Only PDF and DOC/DOCX formats are allowed",
      (value) => {
        return !value || (value instanceof File && SUPPORTED_FORMATS.includes(value.type));
      }
    ),
});

export const vendorCertificationSchema = yup.object().shape({
  certifications: yup
    .array()
    .of(certificationItemSchema)
    .min(1, "At least one certification entry is required"),
});

const VendorCertification = ({ setActiveStep, existingCertifications = [] }) => {
  const dispatch = useDispatch();

  const initialCertifications = existingCertifications.length > 0
    ? existingCertifications.map(cert => ({
        fileName: cert.fileName || "",
        file: cert.document || null
      }))
    : [{ fileName: "", file: null }];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(vendorCertificationSchema),
    mode: "onBlur",
    defaultValues: {
      certifications: initialCertifications,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const [displayedFileNames, setDisplayedFileNames] = useState([]);

  useEffect(() => {
    const names = fields.map(field => {
      if (field.file instanceof File && field.file.name) {
          return field.file.name;
      }
      if (field.file && typeof field.file === 'object' && field.file.fileName) {
          return field.file.fileName;
      }
      return "Attach a Pdf";
    });
    setDisplayedFileNames(names);
  }, [fields]);


  const handleAddField = () => {
    append({ fileName: "", file: null });
    setDisplayedFileNames((prev) => [...prev, "Attach a Pdf"]);
  };

  const handleDeleteField = (index) => {
    remove(index);
    setDisplayedFileNames((prev) => {
      const newNames = [...prev];
      newNames.splice(index, 1);
      return newNames;
    });
  };

  const handleFileUpload = (index, event) => {
    const file = event.target.files[0];

    setValue(`certifications.${index}.file`, null);
    setDisplayedFileNames((prev) => {
      const newNames = [...prev];
      newNames[index] = "Attach a Pdf";
      return newNames;
    });

    if (file) {
      if (SUPPORTED_FORMATS.includes(file.type)) {
        setValue(`certifications.${index}.file`, file);
        setDisplayedFileNames((prev) => {
          const newNames = [...prev];
          newNames[index] = file.name;
          return newNames;
        });
        toast.success(`File "${file.name}" selected successfully!`);
      } else {
        toast.error("Invalid file type. Please upload a PDF or DOC/DOCX file.");
      }
    }
    trigger(`certifications.${index}.file`);
  };

const onSubmit = async (data) => {
  const formData = new FormData();
  const vendorId = Cookies.get("vendorId");

  if (!vendorId) {
    toast.error("Vendor ID not found.");
    return;
  }

  const certificationArray = [];

  for (let i = 0; i < data.certifications.length; i++) {
    const cert = data.certifications[i];
    const entry = {
      fileName: cert.fileName,
      document: null,
    };

    if (cert.file instanceof File) {
      // Append file separately to FormData
      formData.append("files", cert.file);

      // Just send the original name for now; backend will handle metadata
      entry.document = {
        originalName: cert.file.name,
      };
    } else if (
      cert.file &&
      typeof cert.file === "object" &&
      cert.file._id
    ) {
      // Reuse existing document object
      entry.document = cert.file;
    }

    certificationArray.push(entry);
  }

  // Add vendorId and JSON-serialized certification array
  formData.append("vendorId", vendorId);
  formData.append("certification", JSON.stringify(certificationArray)); // 👈 Important

  try {
    const result = await dispatch(updateCertificateInfo(formData));

    if (updateCertificateInfo.fulfilled.match(result)) {
      toast.success("Submitted successfully!");
      setActiveStep((prev) => prev + 1);
    } else {
      toast.error(result.payload?.message || "Submission failed.");
    }
  } catch (err) {
    toast.error("Unexpected error occurred.");
    console.error(err);
  }
};




  return (
    <div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="container">
        <div className="vendor-company-info-content">
          <div className="col-md-6 vendor-form-img">
            <img src={Certification} alt="certificate" className="vendor-img" />
          </div>
          <div className="col-md-6 vendor-form-field">
            <div className="vendor-heading">Certification</div>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column align-items-center gap-3"
            >
              {errors.certifications && (
                <FormText className="text-danger">
                  {errors.certifications.message}
                </FormText>
              )}

              {fields.map((item, index) => (
                <div key={item.id} className="col-md-7 d-flex flex-column gap-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <Form.Group className="col-md-10">
                      <InputGroup>
                        <Form.Control
                          className="small-custom-textfield"
                          placeholder="File Name"
                          {...register(`certifications.${index}.fileName`)} // This is the only line needed for React Hook Form
                          isInvalid={!!errors.certifications?.[index]?.fileName}
                        />
                        {errors.certifications?.[index]?.fileName && (
                          <InputGroup.Text>
                            {<ErrorOutlineOutlinedIcon className="text-danger" />}
                          </InputGroup.Text>
                        )}
                      </InputGroup>
                      {errors.certifications?.[index]?.fileName && (
                        <FormText className="text-danger error-text">
                          {errors.certifications[index].fileName.message}
                        </FormText>
                      )}
                    </Form.Group>
                    {index === 0 && (
                      <LuCirclePlus
                        size={20}
                        onClick={handleAddField}
                        style={{ cursor: "pointer", color: "#407bff" }}
                      />
                    )}
                    {index !== 0 && (
                      <RiDeleteBin6Line
                        size={20}
                        onClick={() => handleDeleteField(index)}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    )}
                  </div>
                  <Form.Group>
                    <div className="file-upload-box">
                      <label htmlFor={`file-upload-${index}`} className="upload-label">
                        <span className="file-name">
                          {displayedFileNames[index]}
                        </span>
                        <TbFileUpload className="upload-icon" />
                      </label>
                      <input
                        id={`file-upload-${index}`}
                        type="file"
                        onChange={(e) => handleFileUpload(index, e)}
                        className="hidden-file-input"
                      />
                    </div>
                    {errors.certifications?.[index]?.file && (
                      <FormText className="text-danger error-text">
                        {errors.certifications[index].file.message}
                      </FormText>
                    )}
                  </Form.Group>
                </div>
              ))}
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
        <div className="vendor-submit-btn cursor-pointer" onClick={handleSubmit(onSubmit)}>Submit</div>
      </div>
    </div>
  );
};

export default VendorCertification;