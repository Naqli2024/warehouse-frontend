import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

const UserSettings = () => {
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  return (
    <div className="purchase-list">
      <h2>Settings</h2>
      <div className="profile-settings">
        <div>
          <p>Profile Picture Settings</p>
          <p className="text-secondary mt-2">
            Choose who can view your profile
          </p>
        </div>
        <Form.Group className="col-md-2">
          <Form.Select
            aria-label="Default select example"
            style={{ height: "35px" }}
          >
            <option value="onlyMe">Only me</option>
            <option value="companyStaff">Company staff</option>
            <option value="anyone">Anyone</option>
          </Form.Select>
        </Form.Group>
      </div>
      <div className="profile-settings">
        <div>
          <p>"New Login Alert"</p>
          <p className="text-secondary mt-2">
            Get email notification whenever your account is accessed from new
            device, browser, or location
          </p>
        </div>
        <Form.Group className="col-md-1">
          <Stack direction="row">
            <Android12Switch defaultChecked />
          </Stack>
        </Form.Group>
      </div>
    </div>
  );
};

export default UserSettings;
