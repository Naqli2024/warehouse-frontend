import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import VendorCompanyInfo from "./VendorCompanyInfo"
import VendorContactInfo from "./VendorContactInfo"
import VendorBankingInfo from "./VendorBankingInfo"
import VendorCertification from "./VendorCertification"
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import VendorTaxInfo from "./VendorTaxInfo";
import VendorPersonalInfo from "./VendorPersonalInfo";

const VendorRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Personal Information",
    "Company Information",
    "Contact Information",
    "Banking Information",
    "Status/Tax Information",
    "Certification",
  ];

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return <VendorPersonalInfo setActiveStep={setActiveStep}/>;
      case 1:
        return <VendorCompanyInfo setActiveStep={setActiveStep}/>;
      case 2:
        return <VendorContactInfo setActiveStep={setActiveStep}/>;
      case 3:
        return <VendorBankingInfo setActiveStep={setActiveStep}/>;
      case 4:
        return <VendorTaxInfo setActiveStep={setActiveStep} />;
      case 5:
        return <VendorCertification setActiveStep={setActiveStep} />;
      default:
        return <VendorCompanyInfo setActiveStep={setActiveStep} />;
    }
  };

  return (
    <div>
      <div className="container-fluid vendor-register-header">
        Vendor Registration Page
      </div>
      <div className="vendor-register-stepper">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      {renderContent()}
    </div>
  );
};

export default VendorRegistration;
