import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./Components/Login";
import SidePanel, { tabData } from "./Components/SIdePanel";
import SideNav from "./Components/SIdePanel";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import React, { useEffect } from "react";
import { useState } from "react";
import Logo from "./Assets/logo.png";
import axios from "axios";
import OrderStatus from "./Components/OrderStatus";
import Service1Component from "./Components/Service1Component";
import DatatablePage from "./Components/Service2Component";
import NewOrders from "./Components/NewOrders";
import ReleasedOrders from "./Components/ReleasedOrders";
import UnReleasedOrders from "./Components/UnreleasedOrders";
import DataFiles from "./Components/DataFiles";
import Logs from "./Components/Logs";
import OrderStatusDetails from "./Components/OrderStatusDetails";
import BoxShipments from "./Components/BoxShipment";
import Receiving from "./Components/Receiving";
import ReceivingList from "./Components/ReceivingList";
const isAuthenticated = !!localStorage.getItem("token");

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false); // Add a loading state
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const token = localStorage.getItem("token")
  console.log(token,"dfdfdfdfdfdf");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/getOneUser`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.data[0]);
        setLoading(false);
      } catch (error) {
        console.log(error, "Error");
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchData();
  }, [token]);
  function getComponentForRoute(routeName) {
    console.log(routeName, "fsdfhgdshf");
    // You can map route names to components here, e.g., by convention
    return {
      users: DatatablePage,
      newOrder: NewOrders,
      orderStatus: OrderStatus,
      releasedOrder: ReleasedOrders,
      unreleasedOrders: UnReleasedOrders,
      dataFiles: DataFiles,
      boxShipments:BoxShipments,
      // "Onboard/Offboard":OnAndOffBoard,
      logs: Logs,
      receiving: Receiving,
      receivingList: ReceivingList,
      // Define other mappings as needed
    }[routeName];
  }

  // Create the route configuration based on tabData
  const routeConfig = Object.keys(tabData).reduce((routes, role) => {
    const roleRoutes = Object.entries(tabData[role])
      .filter(([route, access]) => access)
      .map(([route]) => ({
        path: route,
        element: (
          <ProtectedRoute>
            {React.createElement(getComponentForRoute(route))}
          </ProtectedRoute>
        ),
      }));

    return [...routes, ...roleRoutes];
  }, []);
  console.log(routeConfig, "userrrr");
  return (
    <>
      {user && user.role ? (
        <SideNav
          user={user}
          setIsNavOpen={setIsNavOpen}
          isNavOpen={isNavOpen}
        />
      ) : null}
      <div
        className={`${
          location.pathname == "/login"
            ? " "
            : `tab-content ${
                isNavOpen ? window.innerWidth > 768 && "shifted" : ""
              }`
        }`}
      >
        {loading ? (
          <div className="spinner-container">
            <img src={Logo} alt="Loading..." />
            <div className="spinner"></div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {" "}
                  <Dashboard />{" "}
                </ProtectedRoute>
              }
            />
            {routeConfig.map((route) => (
              <>
                <Route
                  key={route.path}
                  path={`/${route.path}`}
                  element={route.element}
                />
                {route.path == "orderStatus" && (
                  <Route
                    path="/orderStatus/:id"
                    element={<OrderStatusDetails />}
                  />
                )}
                 {route.path == "boxShipments" && (
                  <Route
                    path="/boxShipments/:id"
                    element={<OrderStatusDetails path="boxShipments" />}
                  />
                )}
                 {route.path == "receiving" && (
                  <Route
                    path="/receiving/:id"
                    element={<OrderStatusDetails path="receiving" />}
                  />
                )}
              </>
            ))}

            {/* <Route
                      path="/manage-users"
                      element={
                        <ProtectedRoute>
                          <DatatablePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/new-orders"
                      element={
                        <ProtectedRoute>
                          {" "}
                          <NewOrders />{" "}
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/order-status"
                      element={
                        <ProtectedRoute>
                          {" "}
                          <OrderStatus />
                        </ProtectedRoute>
                      }
                    /> */}
            {/* <Route path="/released-orders" element={ReleasedOrders} />
                    <Route path="/unreleased-orders" element={UnReleasedOrders} />
                    <Route path="/data-files" element={DataFiles} />
                    <Route path="/on-and-off-board" element={OnAndOffBoard} />
                    <Route path="/logs" element={Logs} />
                    <Route path="/settings" element={Settings} /> */}
            <Route
              path="/*"
              element={
                localStorage.getItem("token") ? (
                  <>
                    {loading ? (
                      <div className="spinner-container">
                        <img src={Logo} alt="Loading..." />
                        <div className="spinner"></div>
                      </div>
                    ) : null}
                    <Navigate to="/dashboard" />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
