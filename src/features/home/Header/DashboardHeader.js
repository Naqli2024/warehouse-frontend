import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import Drawer from "@mui/joy/Drawer";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { PiBuildingOffice } from "react-icons/pi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { vendorLogout } from "../../../redux/Vendor/loginSlice";

const DashboardHeader = () => {
  const [openMoreIcon, setMoreIcon] = useState(null);
  const openIcon = Boolean(openMoreIcon);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(3);
  const { loginData } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {}, [loginData]);

  const handleClick = (event) => {
    setMoreIcon(event.currentTarget);
  };

  const handleIconClose = () => {
    setMoreIcon(null);
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleAccount = () => {
    navigate("/admin/authentication", { state: { loginData } });
    dispatch(logout());
  };

  const handleEmployeeDetails = () => {
    navigate("/admin/company-details");
  };

  const handleLogOut = () => {
    dispatch(logout()); 
    dispatch(vendorLogout());
    navigate("/login");
  };

  const drawerContent = (
    <Box
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <div className="right-drawer">
          <div className="account-profile">
            <PersonIcon
              className="drawer-person-icon"
              style={{ width: "30px", height: "30px" }}
            />
            <div>
              <p>
                {loginData?.data?.user?.firstName} {loginData?.data?.user?.lastName}
              </p>
              <p className="text-secondary">{loginData?.data?.user?.emailId}</p>
            </div>
          </div>
          <p>User Id: {loginData?.data?.user?._id}</p>
        </div>
        <hr className="m-0" />
        <div className="right-drawer">
          <p className="fw-bold">Company</p>
          <div className="account-profile">
            <PiBuildingOffice className="drawer-company-icon" />
            <div>
              <p>{loginData?.data?.user?.companyName}</p>
              <div className="d-flex align-items-center gap-5">
                <p className="text-secondary">Company Id:123456789</p>
                <p
                  className="text-primary cursor-pointer"
                  onClick={handleEmployeeDetails}
                >
                  View
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="m-0" />
        <div className="right-drawer">
          <p className="text-primary" onClick={handleAccount} style={{cursor: "pointer"}}>My Account</p>
          <div className="account-profile">
            <div>
              <p>You are currently subscribed to free plan</p>
              <p className="text-primary cursor-pointer">Upgrade</p>
            </div>
          </div>
        </div>
        <hr className="m-0" />
        <ListItem className="mb-2">
          <IoIosHelpCircleOutline size={20} />
          <ListItemButton>FAQ</ListItemButton>
        </ListItem>
        <ListItem className="mb-2">
          <RiQuestionAnswerLine size={20} />
          <ListItemButton>Help</ListItemButton>
        </ListItem>
        <ListItem className="mb-2">
          <BiSupport size={20} />
          <ListItemButton>Contact Us</ListItemButton>
        </ListItem>
        <ListItem>
          <PiSignOut size={20} />
          <ListItemButton className="text-danger" onClick={handleLogOut}>
            Sign-Out
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div class="dashboard-top-content">
      <div class="container-fluid home">
        <nav class="mt-2 mb-2 navbar navbar-expand-lg">
          <div>
            <span className="navbar-user">
              {loginData?.data?.user?.firstName} {loginData?.data?.user?.lastName}
            </span>{" "}
            (Admin)
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="ms-auto dashboard-group">
              <Form.Group className="col-md-5 col-12">
                <Form.Select
                  aria-label="Default select example"
                  style={{ height: "35px" }}
                >
                  <option value="english">English</option>
                  <option value="arabic">Arabic</option>
                  <option value="hindi">Hindi</option>
                </Form.Select>
              </Form.Group>
              <div className="notification-profile">
                <div>
                  <React.Fragment>
                    <Menu
                      anchorEl={openMoreIcon}
                      open={openIcon}
                      onClose={handleIconClose}
                      aria-labelledby="with-menu-demo-breadcrumbs"
                    >
                      <MenuItem onClick={handleIconClose}>
                        No Notification
                      </MenuItem>
                    </Menu>
                    <Breadcrumbs aria-label="breadcrumbs">
                      <IconButton onClick={handleClick}>
                        <NotificationsIcon className="notification-bell" />
                        {notifications > 0 && (
                          <div pill className="notification-badge">
                            {notifications}
                          </div>
                        )}
                      </IconButton>
                    </Breadcrumbs>
                  </React.Fragment>
                </div>
                <div>
                  Hello {loginData?.data?.user?.firstName}{" "}
                  {loginData?.data?.user?.lastName}
                </div>
                <div className="dashboard-profile">
                  <PersonIcon
                    onClick={() => toggleDrawer(true)}
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Drawer
        size={"sm"}
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>
      <ToastContainer />
    </div>
  );
};

export default DashboardHeader;