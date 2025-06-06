import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { forgotPasswordEmailSchema } from "../../../helpers/validation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearAuthState } from "../../../redux/auth/authSlice";
import { forgetPassword } from "../../../redux/auth/passwordSlice";

const ForgotPasswordModal = ({ setOpenForgotPasswordDialog, openForgotPasswordDialog }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordEmailSchema),
    mode: "onBlur",
  });

  const handleDialogSubmit = async (data) => {
    const isValid = await trigger(["emailId", "newPassword", "confirmNewPassword"]);
    if (!isValid) return;

    const payload = {
      emailId: data.emailId,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };

    dispatch(forgetPassword(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          closeButton: false,
          autoClose: 1000
        });
        setTimeout(() => {
          dispatch(clearAuthState());
          setOpenForgotPasswordDialog(false);
          navigate("/login");
        }, 1000);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <Dialog
      open={openForgotPasswordDialog}
      onClose={() => setOpenForgotPasswordDialog(false)}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiDialog-paper": {
          width: "500px",
          maxWidth: "80vw",
        },
      }}
    >
      <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
        <h2 className="dialog-cancel-icon">
          Change Password
          <span>
            <CloseIcon onClick={() => setOpenForgotPasswordDialog(false)} />
          </span>
        </h2>
      </DialogTitle>
      <DialogContent>
        <p className="mt-3 mb-3 fw-bold">
          "Create a secure password to protect your account from unauthorized access."
        </p>
        <form onSubmit={handleSubmit(handleDialogSubmit)}>
          <div className="mt-5 d-flex align-items-center">
            <div className="col-md-8">
              <Form.Group>
                <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">Email</Form.Label>
                  {errors.emailId && <ErrorOutlineOutlinedIcon className="text-danger ms-2" />}
                </div>
                <InputGroup className="mt-1">
                  <Form.Control
                    type="text"
                    aria-label="emailId"
                    className="custom-textfield"
                    {...register("emailId")}
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>

          <div className="mt-5 d-flex align-items-center">
            <div className="col-md-8">
              <Form.Group>
                <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">New Password</Form.Label>
                  {errors.newPassword && <ErrorOutlineOutlinedIcon className="text-danger ms-2" />}
                </div>
                <InputGroup className="mt-1">
                  <Form.Control
                    type={showNewPassword ? "text" : "password"}
                    aria-label="Password"
                    className="custom-textfield"
                    {...register("newPassword")}
                  />
                  <InputGroup.Text
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{ cursor: "pointer", background: "transparent" }}
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
                  <Form.Label className="custom-label mb-0">Confirm New Password</Form.Label>
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
                  />
                  <InputGroup.Text
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: "pointer", background: "transparent" }}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
          </div>

          <DialogActions
            sx={{
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              className="px-5"
              sx={{
                fontWeight: "normal",
                backgroundColor: "#1F3F7F",
                textTransform: "capitalize",
              }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
