import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceComponent = ({ serviceName }) => {
  // Use the useParams hook to get the service name from the URL
  const { service } = useParams();

  return <div>{`This is the ${service} component`}</div>;
};

export default ServiceComponent;
