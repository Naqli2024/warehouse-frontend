import { React, useState } from "react";
import loginBackground from "../../../assets/images/loginBackground.svg";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/login");
  };

  const handleSkip = () => {
    navigate("/admin/dashboard");
  }

  return (
    <div className="login">
      <div className="emp-cancel-icon" onClick={backToHome}>
        <CloseIcon className="fs-5 text-secondary" />
      </div>
      <div className="updatePassword-overlay">
        <div className="updatePassword-container">
          <div className="login-form">
            <p className="login-text">Update Password</p>
            <Form.Group className="col-12 mb-3">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="password"
                  type={showNewPassword ? "text" : "password"}
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
            <Form.Group className="col-12 mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield"
                  name="password"
                  type={showConfirmPassword ? "text" : "password"}
                />
                <InputGroup.Text
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                  }}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <div className="mt-4 d-flex col-12 justify-content-center">
              <button
                type="submit"
                className="btn flex-grow-1 p-2"
                style={{ color: "white", backgroundColor: "#1F3F7F" }}
              >
                Set Password
              </button>
            </div>
            <p className="mt-4 text-primary text-center cursor-pointer text-decoration-underline"
            onClick={handleSkip}>
              Skip
            </p>
          </div>
        </div>
      </div>
      <img
        src={loginBackground}
        alt="Login Background"
        className="login-background"
      />
    </div>
  );
};

export default UpdatePassword;
