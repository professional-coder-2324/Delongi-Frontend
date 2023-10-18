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
// Import other service components

function Navbar({ role }) {
  const services = servicesData[role];
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedSubTab, setSelectedSubTab] = useState(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };



  const serviceComponents = {
    Service1: Service1Component,
    Service2: Service2Component,
    // Add other service components
  };

  const handleServiceClick = (serviceName) => {
    if (selectedTab === serviceName) {
      setSelectedTab(null);
    } else {
      setSelectedTab(serviceName);
    }
    setSelectedSubTab(null); // Reset the selected sub-tab
  };

  const handleSubTabClick = (subTab) => {
    setSelectedSubTab(subTab);
  };
  const SelectedTabComponent = serviceComponents[selectedTab];
  const SelectedSubTabComponent = serviceComponents[selectedSubTab];

  return (
    <div className="navbar-container">
    <div className="top-nav">
      <button onClick={toggleNav} className="nav-toggle-button">
      <i class="fa-solid fa-bars" style={{color:"black"}}></i>  
      </button>
    </div>
    <div className="main-content">
      <div className={`navbar ${isNavOpen ? "open" : ""}`}>
        <ul>
          {Object.entries(services).map(([serviceName, serviceData]) => (
            serviceData.isEnabled && (
              <li
                key={serviceName}
                onClick={() => handleServiceClick(serviceName)}
                className={selectedTab === serviceName ? "active" : ""}
              >
                <i className={`fa ${serviceData.icon}`} aria-hidden="true"></i>
                {serviceName}
              </li>
            )
          ))}
        </ul>
      </div>
      {/* <div className="tab-content"> */}
        {selectedTab && !selectedSubTab &&services[selectedTab]?.subTabs?.length && (
          <ul className="tab-content-subtabs">
            {services[selectedTab]?.subTabs?.map((subTab) => (
              <li
                key={subTab.label}
                onClick={() => handleSubTabClick(subTab)}
                className={selectedSubTab === subTab ? "active" : ""}
              >
                {subTab.label}
              </li>
            ))}
          </ul>
        )}
        {selectedSubTab && (
        <div className={`tab-content ${isNavOpen ? "shifted" : ""}`}>
          <div>{selectedSubTab.content}</div>
          </div>
        )}
         {SelectedTabComponent && !services[selectedTab]?.subTabs?.length  && (
          <div className={`tab-content ${isNavOpen ? "shifted" : ""}`}>
            <SelectedTabComponent />
          </div>
        )}
      {/* </div> */}
    </div>
  </div>
  );
}

export default Navbar;
