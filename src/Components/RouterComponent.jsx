import React from 'react';
import { BrowserRouter, Route, Link, Outlet } from 'react-router-dom';
import servicesData from '../Data/test';
import ServiceComponent from './ServiceComponent';

const RouterComponent = ({ userRole }) => {
  const services = servicesData[userRole] || {};

  // Filter services based on the boolean value
  const activeServices = Object.entries(services)
    .filter(([serviceName, isActive]) => isActive)
    .map(([serviceName]) => serviceName);

  // Define nested routes for each service
  const routes = activeServices.map((service) => ({
    path: `/${service}`,
    element: <ServiceComponent serviceName={service} />,
  }));

  // Display the tabs for the `/` route as well
  routes.push({
    index: true, // Use index to specify the root path
    element: (
      <div className="tabs-container">
        <nav>
          <ul>
            {activeServices.map((service, index) => (
              <li key={index}>
                <Link to={service}>{service}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    ),
  });

  return (
      <Outlet />
  );
};

export default RouterComponent;
