import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { vendorPersonalInfoSchema } from "../../helpers/validation";
import PersonalInfo from "../../assets/images/contact-info.svg";
import { createVendor } from "../../redux/Vendor/PersonalInfoSlice";
import Cookies from "js-cookie";
import { companyInfoData } from "../../data/companyInforData";
import Loader from "../../helpers/Loader";

const VendorPersonalInfo = ({ setActiveStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(vendorPersonalInfoSchema) });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    country: "",
    companyName: "",
    companyType: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectedCountry = formData.country;

  const selectedCompanyData = companyInfoData.find(
    (data) => data.country === selectedCountry
  );

  const onSubmit = async (data) => {
    try {
      const payload = {
        personalInformation: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          contactNumber: data.contactNumber,
          country: data.country,
          companyName: data.companyName,
          companyType: data.companyType,
        },
        confirmPassword: data.confirmPassword,
      };
      setLoading(true);

      dispatch(createVendor(payload))
        .unwrap()
        .then((response) => {
          setLoading(false);
          toast.success(response.message, {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
          });
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            contactNumber: "",
            country: "",
            companyName: "",
            companyType: "",
          });
        });
    } catch (error) {
      setLoading(false);
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setActiveStep((prev) => (prev === 0 ? 1 : prev));
    }
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <div className="container">
        <div className="vendor-company-info-content">
          <div className="col-md-6 vendor-form-img">
            <img src={PersonalInfo} alt="company-info" className="vendor-img" />
          </div>
          <div className="col-md-6 vendor-form-field">
            <div className="vendor-heading">Personal Information</div>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column align-items-center gap-3 mt-5"
            >
              <Form.Group className="col-md-7">
                <InputGroup className="mt-2">
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    {...register("firstName")}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <InputGroup.Text>
                      {<ErrorOutlineOutlinedIcon className="text-danger" />}
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-7">
                <InputGroup className="mt-2">
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    {...register("lastName")}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <InputGroup.Text>
                      {<ErrorOutlineOutlinedIcon className="text-danger" />}
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-7">
                <InputGroup className="mt-2">
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    {...register("email")}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <InputGroup.Text>
                      {<ErrorOutlineOutlinedIcon className="text-danger" />}
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-7">
                <InputGroup className="mt-2">
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    {...register("password")}
                    onChange={handleChange}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputGroup.Text>
                  {errors.password && (
                    <InputGroup.Text>
                      {<ErrorOutlineOutlinedIcon className="text-danger" />}
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-7">
                <InputGroup className="mt-2">
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    {...register("confirmPassword")}
                    onChange={handleChange}
                  />
                  <InputGroup.Text
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </InputGroup.Text>
                  {errors.confirmPassword && (
                    <InputGroup.Text>
                      {<ErrorOutlineOutlinedIcon className="text-danger" />}
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-7">
                <InputGroup className="mt-2">
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    {...register("contactNumber")}
                    onChange={handleChange}
                  />
                  {errors.contactNumber && (
                    <InputGroup.Text>
                      {<ErrorOutlineOutlinedIcon className="text-danger" />}
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-7">
                <InputGroup className="mt-2">
                  <Form.Select
                    className="small-custom-textfield"
                    name="country"
                    value={formData.country}
                    {...register("country")}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    {companyInfoData.map((countryData) => (
                      <option
                        key={countryData.country}
                        value={countryData.country}
                      >
                        {countryData.country}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.country && (
                    <InputGroup.Text>
                      <ErrorOutlineOutlinedIcon className="text-danger" />
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-7">
                <InputGroup className="mt-2">
                  <Form.Control
                    className="small-custom-textfield"
                    placeholder="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    {...register("companyName")}
                    onChange={handleChange}
                  />
                  {errors.companyName && (
                    <InputGroup.Text>
                      {<ErrorOutlineOutlinedIcon className="text-danger" />}
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-7">
                <InputGroup className="mt-2">
                  <Form.Select
                    className="small-custom-textfield"
                    name="companyType"
                    value={formData.companyType}
                    {...register("companyType")}
                    onChange={handleChange}
                    disabled={!selectedCountry}
                  >
                    <option value="">Select Company Type</option>
                    {selectedCompanyData?.companyType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.companyType && (
                    <InputGroup.Text>
                      <ErrorOutlineOutlinedIcon className="text-danger" />
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>
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

export default VendorPersonalInfo;
