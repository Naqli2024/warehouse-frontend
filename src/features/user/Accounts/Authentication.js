import { React, useState } from "react";
import AuthenticationBg from "../../../assets/images/authentication.svg";
import MooitLogo from "../../../assets/images/mooit-logo.svg";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import Loader from "../../../helpers/Loader";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { userLogin } from "../../../redux/auth/loginSlice";
import ForgotPasswordModal from "./ForgotPasswordModal";

const Authentication = () => {
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const data = location.state?.data?.data?.user;
  const [loginData, setLoginData] = useState({
    emailId: data?.emailId,
    password: "",
  });
  const dispatch = useDispatch();

  const backToHome = () => {
    navigate("/admin/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    dispatch(userLogin(loginData))
      .unwrap()
      .then((response) => {
        setLoading(false);
        navigate("/admin/account");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    <div>
      <div className="login">
        {loading && <Loader isLoading={loading} />}
        <div className="emp-cancel-icon" onClick={backToHome}>
          <CloseIcon className="fs-5 text-secondary" />
        </div>
        <div className="updatePassword-overlay">
          <div className="updatePassword-container">
            <div className="login-form">
              <div className="text-center mt-4">
                {<img src={MooitLogo} alt="mooit-logo" />}
              </div>
              <p className="login-text">Authentication Required</p>
              <p>
                To proceed please verify your identity by entering your password
              </p>
              <div className="d-flex justify-content-center mt-3 mb-3 gap-3">
                <MdAccountCircle size={20} />
                <p>
                  UserId: <span className="text-primary">{data?.emailId}</span>
                </p>
              </div>
              <Form.Group className="col-12 mb-3">
                <InputGroup>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    className="custom-textfield"
                    name="password"
                    placeholder="Enter your Password"
                    type={showNewPassword ? "text" : "password"}
                    value={loginData.password}
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
              <div className="text-primary cursor-pointer text-end" onClick={() => setOpenForgotPasswordDialog(true)}>
                Forgot Password?
              </div>
              <div className="mt-5 mb-5 d-flex col-12 justify-content-center">
                <button
                  type="submit"
                  className="btn flex-grow-1 p-2"
                  style={{ color: "white", backgroundColor: "#1F3F7F" }}
                  onClick={handleSubmit}
                >
                  Verify & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
        <img
          src={AuthenticationBg}
          alt="Auth Background"
          className="login-background"
        />
        <ToastContainer />
        {openForgotPasswordDialog && (
        <ForgotPasswordModal
          openForgotPasswordDialog={openForgotPasswordDialog}
          setOpenForgotPasswordDialog={setOpenForgotPasswordDialog}
        />
      )}
      </div>
    </div>
  );
};

export default Authentication;
