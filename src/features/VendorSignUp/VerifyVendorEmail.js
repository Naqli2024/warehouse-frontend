import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyVendorEmail } from "../../redux/Vendor/PersonalInfoSlice";

const VerifyVendorEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      dispatch(verifyVendorEmail({token, email}))
        .unwrap()
        .then((response) => {
          setMessage(response.message);
        })
        .catch((error) => {
          setError(error || "An error occurred.");
        });
    } else {
      setError("Invalid or missing verification token.");
    }
  }, [token]);

  return (
    <div className="verify-container">
      <h2>Email Verification</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p className="success">{message}</p>
          <button
            type="button"
            className="btn create-acc-btn p-2"
            onClick={handleClick}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default VerifyVendorEmail;
