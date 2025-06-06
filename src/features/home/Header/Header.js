import React from "react";
import mooitLogo from "../../../assets/images/mooit-logo.svg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const Header = () => {
  return (
    <div class="top-content">
      <div class="container-fluid home">
        <nav class="navbar navbar-expand-lg">
          <Link class="navbar-brand" to="/">
            <img src={mooitLogo} alt="mooitLogo" class="logo" />
          </Link>
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
            <ul class="navbar-nav center-links fw-bold">
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="">
                  Features
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="">
                  Pricing
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="">
                  Blog
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/admin">
                  Contact
                </Link>
              </li>
            </ul>
            <div class="d-flex ms-auto flex-wrap align-items-center fw-bold button-group">
              <div class="nav-item login-btn">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </div>
              <div class="nav-item login-btn">
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button variant="contained" {...bindTrigger(popupState)}>
                        SignUp
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>
                          <Link class="nav-link" to="/signup">
                            Admin
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={popupState.close}>
                          <Link class="nav-link" to="/vendor-register">
                            Vendor
                          </Link>
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </div>
              <button class="btn btn-outline-secondary text-dark fw-bold try-it-btn">
                Try it free
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
