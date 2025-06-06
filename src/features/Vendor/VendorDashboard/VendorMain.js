import React, { useState } from "react";
import warehouse from "../../../assets/images/warehouse-logo.svg";
import mooitLogo from "../../../assets/images/mooit-logo.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { vendorItems } from "../../../data/VendorSidebarData";

const VendorMain = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuToggle = (menuPath) => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setOpenMenu((prevMenu) => (prevMenu === menuPath ? null : menuPath));
  };

  return (
       <>
      {/* Sidebar Toggle Button */}
      <div
        className={`menu-icon ${isSidebarOpen ? "open" : ""}`} // Add the `open` class when the sidebar is open
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <FaTimes className="cancel-icon" />
        ) : (
          <FaBars className="icon" />
        )}
      </div>
      <div className="layout-container">
        {/* Sidebar */}
        <div
          className={`sidebar ${isSidebarOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}
          style={{ flex: isCollapsed ? "0 0 4%" : "0 0 16%" }}
        >
          <div className="warehouse">
            <img src={warehouse} alt="warehouse" />
            {!isCollapsed && <h2>Vendor</h2>}
          </div>
          <hr style={{ margin: "0px 10px" }} />
          <ul className="nav flex-column">
            {vendorItems.map((item) => (
              <React.Fragment key={item.path}>
                <li
                  className={
                    isCollapsed
                      ? `collapsed-side-links ${
                          !item.submenus &&
                          location.pathname === `/vendor/${item.path}`
                            ? "active"
                            : ""
                        }`
                      : `main-sideLinks ${
                          !item.submenus &&
                          location.pathname === `/vendor/${item.path}`
                            ? "active"
                            : ""
                        }`
                  }
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  {item.submenus ? (
                    <>
                      <div
                        className="d-flex justify-content-between align-items-center w-100"
                        onClick={() => handleMenuToggle(item.path)}
                      >
                        <span className="nav-link">
                          <img src={item.image} width={30} height={35} />{" "}
                          {!isCollapsed && item.item}
                        </span>
                        {!isCollapsed && (
                          <span className="dropdown-arrow">
                            {openMenu === item.path ? (
                              <FaCaretDown />
                            ) : (
                              <FaCaretRight />
                            )}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <Link
                      className="nav-link"
                      to={`/vendor/${item.path}`}
                      onClick={toggleSidebar}
                    >
                      <img src={item.image} width={35} height={35} />{" "}
                      {!isCollapsed && item.item}
                    </Link>
                  )}
                </li>

                {item.submenus && openMenu === item.path && !isCollapsed && (
                  <ul className="nav flex-column sub-menus ms-3">
                    {item.submenus.map((submenu) => (
                      <li
                        key={submenu.path}
                        className={`side-links ${
                          location.pathname === `/vendor/${submenu.path}`
                            ? "active"
                            : ""
                        }`}
                      >
                        <Link
                          className="nav-link"
                          to={`/vendor/${submenu.path}`}
                          onClick={toggleSidebar}
                        >
                          {submenu.item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>

          {/* Sidebar Footer with Collapse Button */}
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

        {/* Main Content */}
        <div className="mainbar">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default VendorMain;
