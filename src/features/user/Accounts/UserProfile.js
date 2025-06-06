import React, { useEffect } from "react";
import { useState } from "react";
import AccountHeader from "../../assets/images/account-header.svg";
import PersonIcon from "@mui/icons-material/Person";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { LuSaveAll } from "react-icons/lu";
import { InputGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editAccount } from "../../Redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { data } = useSelector((state) => state.createAccount);
  const user = data?.data.user || {};

  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
  });

  // Load initial form data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        emailId: user?.emailId || "",
        phoneNumber: user?.phoneNumber || "",
        country: user?.country || "",
        state: user?.state || "",
        city: user?.city || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      const payload = { ...formData };
      await dispatch(editAccount({ id: user?._id, payload }))
        .unwrap()
        .then((response) => {
          toast.success(response.message, {position: "top-center", autoClose: 1000, closeButton: false});
          setTimeout(() => setIsEditClicked(false), 1000)
        });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="image-container">
        <img src={AccountHeader} className="employee-bg-header" alt="header" />
        <div className="account-header">
          <div className="user-account-profile">
            <PersonIcon style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="account-userid">
            <p className="fw-bold account-userid m-0">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="mt-1">User id: {user?._id}</p>
          </div>
        </div>
      </div>

      <div className="userProfile-info">
        <div>
          <div className="d-md-flex justify-content-between">
            <p className="fw-bold">Personal Information</p>
            <div
              className="userProfile-edit gap-1"
              onClick={() =>
                isEditClicked ? handleSave() : setIsEditClicked(true)
              }
            >
              {isEditClicked ? <LuSaveAll /> : <ModeEditOutlineOutlinedIcon />}
              {isEditClicked ? "Save" : "Edit"}
            </div>
          </div>

          <div className="col-md-7 user-content">
            <p className="col-md-2">Full name</p>
            <p className="col-md-1 hide-on-small">:</p>
            {isEditClicked ? (
              <Form.Group className="col-md-5 col-12">
                <InputGroup>
                  <Form.Control
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="custom-textfield"
                    type="text"
                  />
                  <Form.Control
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="custom-textfield"
                    type="text"
                  />
                </InputGroup>
              </Form.Group>
            ) : (
              <p className="col-md-2">
                {user?.firstName}.{user?.lastName}
              </p>
            )}
          </div>

          <div className="col-md-7 user-content">
            <p className="col-md-2">Display name</p>
            <p className="col-md-1 hide-on-small">:</p>
            <p className="col-md-2">
              {user?.firstName}.{user?.lastName}
            </p>
          </div>
        </div>

        <hr />

        <div>
          <p className="fw-bold">Contact Details</p>
          <div className="col-md-7 user-content">
            <p className="col-md-2">Phone number</p>
            <p className="col-md-1 hide-on-small">:</p>
            {isEditClicked ? (
              <Form.Group className="col-md-5 col-12">
                <InputGroup>
                  <Form.Control
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="custom-textfield"
                    type="text"
                  />
                </InputGroup>
              </Form.Group>
            ) : (
              <p className="col-md-2">{user?.phoneNumber}</p>
            )}
          </div>

          <div className="col-md-7 user-content">
            <p className="col-md-2">Email Id</p>
            <p className="col-md-1 hide-on-small">:</p>
            {isEditClicked ? (
              <Form.Group className="col-md-5 col-12">
                <InputGroup>
                  <Form.Control
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    className="custom-textfield"
                    type="text"
                  />
                </InputGroup>
              </Form.Group>
            ) : (
              <p className="col-md-2">{user?.emailId}</p>
            )}
          </div>
        </div>

        <hr />

        <div>
          <p className="fw-bold">Location Details</p>
          <div className="col-md-7 user-content">
            <p className="col-md-2">Country</p>
            <p className="col-md-1 hide-on-small">:</p>
            {isEditClicked ? (
              <Form.Group className="col-md-5 col-12">
                <InputGroup>
                  <Form.Control
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="custom-textfield"
                    type="text"
                  />
                </InputGroup>
              </Form.Group>
            ) : (
              <p className="col-md-2">{user?.country}</p>
            )}
          </div>

          <div className="col-md-7 user-content">
            <p className="col-md-2">State</p>
            <p className="col-md-1 hide-on-small">:</p>
            {isEditClicked ? (
              <Form.Group className="col-md-5 col-12">
                <InputGroup>
                  <Form.Control
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="custom-textfield"
                    type="text"
                  />
                </InputGroup>
              </Form.Group>
            ) : (
              <p className="col-md-2">{user?.state}</p>
            )}
          </div>

          <div className="col-md-7 user-content">
            <p className="col-md-2">City</p>
            <p className="col-md-1 hide-on-small">:</p>
            {isEditClicked ? (
              <Form.Group className="col-md-5 col-12">
                <InputGroup>
                  <Form.Control
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="custom-textfield"
                    type="text"
                  />
                </InputGroup>
              </Form.Group>
            ) : (
              <p className="col-md-2">{user?.city}</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
