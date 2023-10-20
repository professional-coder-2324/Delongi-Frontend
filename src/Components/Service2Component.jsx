import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import CreateUserModal from "./CreateUserModal";
import "../Css/ServiceComponent.css";
import axios from "axios";
import {
  FaDownload,
  FaFileExcel,
  FaFilePdf,
  FaFilter,
  FaPlusCircle,
} from "react-icons/fa";
const DatatablePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
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
        // Handle the response data here, e.g., set it to state
      } catch (error) {
        console.log(error, "Error");
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/${
            user.access === "superadmin" ? "getAllUser" : "getDepartmentUser"
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRows(response.data.data);
        // Handle the response data here, e.g., set it to state
      } catch (error) {
        console.log(error, "Error");
      }
    };

    fetchData(); // Invoke the async function
  }, []);

  const data = {
    columns: [
      {
        label: "First Name",
        field: "firstName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Last Name",
        field: "lastName",
        sort: "asc",
        width: 270,
      },
      {
        label: "User Name",
        field: "username",
        sort: "asc",
        width: 200,
      },
      {
        label: "Department",
        field: "role.roleName",
        sort: "asc",
        width: 100,
      },
      // {
      //   label: 'Role',
      //   field: 'role.roleName',
      //   sort: 'asc',
      //   width: 150,
      //   content: (row) => (row.role && row.role.roleName ? row.role.roleName : 'N/A'),
      // },
    ],
    rows: rows,
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <div>
        <div class="service-component">
          <div class="global-search">
            <label for="search" className="m-0">
              <span aria-hidden="true" class="input__icon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>{" "}
              <span class="sr-only">Search</span>
            </label>{" "}
            <input
              id="search"
              type="text"
              placeholder="Search this table"
              class="vgt-input vgt-pull-left"
            />
          </div>{" "}
          <div class="global-search-actions">
            <div class="mt-2 mb-3">
              <button
                type="button"
                class="btn btn-outline-info m-1 btn-sm collapsed filter-btn"
                aria-expanded="false"
                aria-controls="sidebar-right"
                style={{ overflowAnchor: "none" }}
              >
                <div className="button-container">
                  <FaFilter style={{ color: "#3b82f6" }} />
                  <span>Filter</span>
                </div>
              </button>{" "}
              <button
                type="button"
                className="mr-1 btn btn-outline-success m-1 btn-sm pdf-button"
              >
                <div className="button-container">
                  <FaFilePdf style={{ color: "#10b981" }} /> <span>PDF</span>
                </div>
              </button>{" "}
              <button className="mr-1 btn btn-sm btn-outline-danger ripple m-1 excel-btn">
                <div className="button-container">
                  <FaFileExcel className="mr-1 " />
                  <span>EXCEL</span>
                </div>
              </button>{" "}
              <button
                type="button"
                className="mr-1 btn btn-info m-1 btn-sm onboard-user-btn"
              >
                <div className="button-container">
                  <FaDownload />
                  <span>Onboard Users</span>
                </div>
              </button>{" "}
              <button
                type="button"
                className="mr-1 btn btn-warning m-1 btn-sm offboard-user-btn"
              >
                <div className="button-container">
                  <FaDownload />
                  <span>Offboard Users</span>
                </div>
              </button>{" "}
              <button
                type="button"
                className="mr-1 btn btn-btn btn-primary btn-icon m-1 btn-sm create-user-btn"
              >
                <div className="button-container">
                  <FaPlusCircle />
                  <span onClick={handleShow}>Create</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* <button >Create User</button> */}
        <CreateUserModal show={showModal} handleClose={handleClose} user={user} setRows={setRows} rows ={rows}/>
      </div>
      <MDBDataTable
        // striped
        // bordered
        // small
        data={data}
        noBottomColumns
      />
    </>
  );
};

export default DatatablePage;
