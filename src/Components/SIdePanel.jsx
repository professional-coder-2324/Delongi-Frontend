// import React, { useState, useEffect } from 'react';
import "../Css/SidePanel.css";

// const SidePanel = ({ userRole }) => {
//   const [tabs, setTabs] = useState([]);

//   useEffect(() => {
//     // Simulate fetching tabs based on user role
//     const tabsData = {
//       superadmin: [
//         { id: 1, label: 'Dashboard' },
//         { id: 2, label: 'Manage Users' },
//         { id: 3, label: 'Settings' },
//       ],
//       admin: [
//         { id: 1, label: 'Dashboard' },
//         { id: 2, label: 'Manage Users' },
//         { id: 3, label: 'Reports' },
//       ],
//       user: [
//         { id: 1, label: 'Dashboard' },
//         { id: 2, label: 'My Profile' },
//       ],
//     };

//     setTabs(tabsData[userRole] || []);
//   }, [userRole]);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="side-panel">

//        <div className="navbar">
//       <div className="menu-icon" onClick={toggleMenu}>
//         &#9776;
//       </div>
//       <div className={`side-menu ${isOpen ? 'open' : ''}`}>
//         {tabs.map(tab => (
//         <div key={tab.id} className="side-tab">
//           {tab.label}
//         </div>
//       )
//       )}
//       </div>
//     </div>

//     </div>
//   );
// };

// export default SidePanel;

import React, { useState } from "react";
import Service1Component from "./Service1Component";
import Service2Component from "./Service2Component";
import servicesData from "../Data/test";
import NewOrders from "./NewOrders";
import { useEffect } from "react";
import { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import OrderStatus from "./OrderStatus";
import ReleasedOrders from "./ReleasedOrders";
import DataFiles from "./DataFiles";
import OnAndOffBoard from "./OnAndOffBoard";
import UnReleasedOrders from "./UnreleasedOrders";
import Logs from "./Logs";
import Settings from "./Settings";
import BoxShipments from "./BoxShipment";
import Receiving from "./Receiving";
// Import other service components
export const tabData = {
  callCenter: {
    users:true,
    newOrder: true,
    orderStatus: true,
    releasedOrder: true,
    unreleasedOrders: true,
    dataFiles: true,
    search: false,
  },
  administration: {
    search: false,
  },
  ACS: {
    boxShipments: true,
    receiving: true,
    receivingList:true,
    repairs: true,
    partManagement: true,
    logs: true,
    reports: false,
    caseStatus: false,
    // partManagement: true,
    fedExMenu: false,
    refurbishment: false,
    machineShipments: false,
    search: false,
  },
  SuperAdmin: {
    board: true,
    logs: true,
    people: true,
    settings: true
  },
};

const tabDisplayNames = {
  reasonCodes: "Reason Codes",
  repairCode: "Repair Code",
  defectCodes: "Defect Codes",
  users: "Users",
  dataFiles: "Data Files",
  logs: "Logs",
  zipCodes: "ZIP Codes",
  model_Brand: "Model Brand",
  model: "Model",
  retailName: "Retail Name",
  shipper: "Shipper",
  receiver: "Receiver",
  technician: "Technician",
  newOrder: "New Orders",
  orderStatus: "Order Status",
  releasedOrder: "Released Orders",
  unreleasedOrders: "Unreleased Orders",
  search: "Search",
  reports: "Reports",
  caseStatus: "Case Status",
  partManagement: "Part Management",
  fedExMenu: "FedEx Menu",
  refurbishment: "Refurbishment",
  machineShipments: "Machine Shipments",
  repairs: "Repairs",
  receiving: "Receiving",
  boxShipments: "Box Shipments",
  receivingList: "Receiving List",
  partManagement: "Part Management",
  board: "Onboard/Offboard",
  people:"People",
  settings: "Settings",
};
function Navbar({ user, isNavOpen, setIsNavOpen }) {
  const role = user.role.roleName;
  console.log("rowelwedw", role);
  const services = servicesData[role];
 
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedSubTab, setSelectedSubTab] = useState(null);
  const [tabKey, setTabKey] = useState(0);

  const navigate = useNavigate()
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const serviceComponents = {
    Service1: Service1Component,
    People: Service2Component,
    Users:Service2Component,
    "New Orders": NewOrders,
    "Order Status":OrderStatus,
    "Released Order":ReleasedOrders,
    "Unreleased Orders":UnReleasedOrders,
    "Data Files": DataFiles,
    "Onboard/Offboard":OnAndOffBoard,
    "Logs": Logs,
    "Settings": Settings,
    "Box Shipments":BoxShipments,
    "Receiving":Receiving,

    // Add other service components
  };

  const handleServiceClick = (tabName) => {
    switch (tabName) {
      case 'newOrder':
        navigate('/new');
        break;
      case 'orderStatus':
        navigate('/order-status');
        break;
      // Add cases for other tab routes
      default:
        break;
    }
    console.log(selectedTab,"sdffdfdfdf");
      // if (selectedTab === serviceName) {
      //   setTabKey((prevKey) => prevKey + 1)
      // } else {
      //   setSelectedTab(serviceName);
      // }
      // setSelectedSubTab(null); // Reset the selected sub-tab
    };

  const handleSubTabClick = (subTab) => {
    setSelectedSubTab(subTab);
  };
  // const SelectedTabComponent = serviceComponents[selectedTab];
  // const SelectedSubTabComponent = serviceComponents[selectedSubTab];
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSetting = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (isDropdownOpen && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", closeDropdown);
    } else {
      document.removeEventListener("click", closeDropdown);
    }

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [isDropdownOpen]);
  const handleLogout =()=>{
    localStorage.removeItem("token");
    window.location.reload()
    // navigate("/login")
  }
  const renderTabs = () => {
    const tabs = [];
    Object.entries(tabData).forEach(([category, categoryData]) => {
      Object.entries(categoryData).forEach(([tabName, tabValue]) => {
        if (tabValue) {
          tabs.push(
            <>
             <li
                  key={tabName}
                  onClick={() => navigate(tabName)}
                  className={selectedTab === tabName ? "active" : ""}
                >
                  <i
                    className={`fa fa-people-arrows`}
                    aria-hidden="true"
                  ></i>
                 {tabDisplayNames[tabName]}
                </li>
            {/* <div
              key={tabName}
              onClick={() => navigate(tabName)}
              className={selectedTab === tabName ? "active" : ""}
              >
              {tabName}
            </div> */}
              </>
          );
        }
      });
    });
    return tabs;
  };

  return (
    <div className="navbar-container">
      <div className="top-nav">
        <button onClick={toggleNav} className="nav-toggle-button">
          <i class="fa-solid fa-bars" style={{ color: "black" }}></i>
        </button>
        <div className="dropbtn" ref={dropdownRef}  onClick={toggleSetting}>
          <i
            className="fa-solid fa-cog"
            style={{ color: "black", cursor: "pointer" }}
          ></i>
         {isDropdownOpen && (
          <div className="dropdown-content" id="myDropdown">
            <div class="dropdown-header"><i class="fa-solid fa-user-plus"></i><span className="text-capitalize">{ user?.firstName + " "+ user?.lastName  }</span></div>
            <a href="" class="dropdown-item">Profile</a>
            <a href="" class="dropdown-item">Settings</a>
            <a href="" class="dropdown-item" onClick={handleLogout}>Logout</a>
          </div>
        )}
        </div>
      </div>
      <div className="main-content">
        <div className={`navbar ${isNavOpen ? "open" : ""}`}>
          <ul>
            {/* {renderTabs()} */}
            {Object.entries(tabData[role]).map(([category, categoryData]) =>
              categoryData && (
                <li
                  key={category}
                  onClick={() => navigate(category)}
                  className={selectedTab === category ? "active" : ""}
                >
                  <i
                    className={`fa fa-people-arrows`}
                    aria-hidden="true"
                  ></i>
                 {tabDisplayNames[category] || category}
                </li>
              )
            
            )}
            
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
