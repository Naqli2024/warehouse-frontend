import React, { useEffect } from "react";
import { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Slide,
} from "@mui/material";
import { resetPasswordSchema } from "../../Helper/validation";
import timeAgo from "../../Helper/updatePasswordTime";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { updatePassword } from "../../Redux/auth/updatePassword";

const UserPassword = () => {
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data } = useSelector((state) => state.createAccount);
  const user = data?.data.user || {};
  const [passwordChangedAt, setPasswordChangedAt] = useState(
    user?.passwordChangedAt || ""
  );
  const [timeAgoText, setTimeAgoText] = useState("");
  const [updatedData, setUpdatedData] = useState({
    userId: user?._id || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  const handleDialogSubmit = async () => {
    const isValid = await trigger([
      "currentPassword",
      "newPassword",
      "confirmNewPassword",
    ]);
    if (!isValid) return;
    dispatch(updatePassword(updatedData))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setTimeout(() => setOpenChangePasswordDialog(false), 1000);
      })
      .catch((error) => toast.error(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user?.passwordChangedAt) {
      setPasswordChangedAt(user.passwordChangedAt);
    }
  }, [data]);

  useEffect(() => {
      const validDate = new Date(passwordChangedAt);
      if (!isNaN(validDate.getTime())) {
        setTimeAgoText(timeAgo(validDate));
      } else {
        setTimeAgoText("No date available");
      }
  }, [passwordChangedAt]);

  return (
    <div className="purchase-list">
      <h2>Password</h2>
      <div className="user-password">
        <div className="col-md-8 d-md-flex mb-3">
          <p className="col-md-4">Password last update</p>
          <p className="col-md-1">:</p>
          <p className="col-md-4">{timeAgoText}</p>
        </div>
        <button
          type="button"
          className="btn flex-grow-1"
          style={{ color: "white", backgroundColor: "#1F3F7F" }}
          onClick={() => setOpenChangePasswordDialog(true)}
        >
          Change Password
        </button>
        <Dialog
          open={openChangePasswordDialog}
          onClose={() => setOpenChangePasswordDialog(false)}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-paper": {
              width: "600px",
              maxWidth: "80vw",
            },
          }}
        >
          <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
            <h2>Change Password</h2>
          </DialogTitle>
          <DialogContent>
            <p className="mt-3 mb-3 fw-bold">
              "Create a secure password to protect your account from
              unauthorized access."
            </p>
            <div className="mt-4 d-flex align-items-center">
              <div className="col-md-8">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Current Password
                    </Form.Label>
                    {errors.currentPassword && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-1">
                    <Form.Control
                      type={showCurrentPassword ? "text" : "password"}
                      aria-label="Password"
                      className="custom-textfield"
                      {...register("currentPassword")}
                      name="currentPassword"
                      value={updatedData.currentPassword}
                      onChange={handleChange}
                    />
                    <InputGroup.Text
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      style={{
                        cursor: "pointer",
                        background: "transparent",
                      }}
                    >
                      {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                    </InputGroup.Text>
                  </InputGroup>
                  <div className="mt-3 text-primary">Forget Password?</div>
                </Form.Group>
              </div>
            </div>
            <div className="mt-5 d-flex align-items-center">
              <div className="col-md-8">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      New Password
                    </Form.Label>
                    {errors.newPassword && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-1">
                    <Form.Control
                      type={showNewPassword ? "text" : "password"}
                      aria-label="Password"
                      className="custom-textfield"
                      {...register("newPassword")}
                      name="newPassword"
                      value={updatedData.newPassword}
                      onChange={handleChange}
                    />
                    <InputGroup.Text
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        cursor: "pointer",
                        background: "transparent",
                      }}
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="mt-5 mb-5 d-flex align-items-center">
              <div className="col-md-8">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Confirm New Password
                    </Form.Label>
                    {errors.confirmNewPassword && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-1">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      aria-label="Password"
                      className="custom-textfield"
                      {...register("confirmNewPassword")}
                      name="confirmNewPassword"
                      value={updatedData.confirmNewPassword}
                      onChange={handleChange}
                    />
                    <InputGroup.Text
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        cursor: "pointer",
                        background: "transparent",
                      }}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              gap: "8px",
              padding: "16px",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleDialogSubmit}
              sx={{
                fontWeight: "normal",
                paddingTop: "5px",
                paddingBottom: "3px",
                backgroundColor: "#1F3F7F",
                textTransform: "capitalize",
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => setOpenChangePasswordDialog(false)}
              sx={{
                backgroundColor: "#CFCFCF",
                color: "black",
                fontWeight: "normal",
                paddingTop: "5px",
                paddingBottom: "3px",
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserPassword;
