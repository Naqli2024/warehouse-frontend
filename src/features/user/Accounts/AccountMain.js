import React, { useState } from "react";
import mooitLogo from "../../assets/images/mooit-logo.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { accountItems } from "../../Data/AccountSideBarData";

const AccountMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigateToDashboard = () => {
    navigate("/admin/dashboard");
  };

  return (
    <>
      <div className="menu-icon" onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <FaTimes className="icon" />
        ) : (
          <FaBars className="icon" />
        )}
      </div>

      <div className="layout-container">
        <div
          className={`sidebar ${isSidebarOpen ? "open" : ""} ${
            isCollapsed ? "collapsed" : ""
          }`}
          style={{ flex: isCollapsed ? "0 0 4%" : "0 0 20%" }}
        >
          <div className="d-flex">
          <p className="login-text">
            <IoArrowBackCircleOutline size={30} className="text-primary cursor-pointer" onClick={navigateToDashboard}/></p>
          {!isCollapsed && <p className="side-account-text ">Accounts</p>}
          </div>
          <ul className="nav flex-column">
            {accountItems.map((item) => (
              <React.Fragment key={item.path}>
                <li
                  className={`side-links ${
                    !item.submenus &&
                    location.pathname === `/admin/account/${item.path}`
                      ? "active"
                      : ""
                  }`}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  {
                    <Link
                      className="nav-link"
                      to={`/admin/account/${item.path}`}
                      onClick={toggleSidebar}
                    >
                      {item.icon} {!isCollapsed && item.item}
                    </Link>
                  }
                </li>
              </React.Fragment>
            ))}
          </ul>

          <div className="sidebar-footer">
            <hr style={{ margin: "0px 20px" }} />
            <div className="sidebar-logo">
              {!isCollapsed && <img src={mooitLogo} alt="mooit-logo" />}
              <div onClick={toggleCollapse}>
                {isCollapsed ? <IoIosArrowDropright /> : <IoIosArrowDropleft />}
              </div>
            </div>
          </div>
        </div>

        <div className="mainbar">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AccountMain;
