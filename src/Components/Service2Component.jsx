import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import CreateUserModal from "./CreateUserModal";
import "../Css/ServiceComponent.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import {
  FaDownload,
  FaFileExcel,
  FaFilePdf,
  FaFilter,
  FaPlusCircle,
} from "react-icons/fa";
import ReactSwitch from "react-switch";
import DeleteUserModal from "./DeleteModal";

const DatatablePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [editData, setEditData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token")
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
    };

    token && fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(user, "dsdsdsd");
      try {
        if (user.access === "superadmin") {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/getAllUser`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setRows(response.data.data);
        }
        if (user.access === "admin") {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/getDepartmentUser`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setRows(response.data.data);
        }
      } catch (error) {
        console.log(error, "Error");
      }
    };

    user && fetchData();
  }, [user]);

  const userAttributes = [];
  filteredData.forEach((el) => {
    userAttributes.push({
      firstName: el.firstName,
      lastName: el.lastName,
      username: el.username,
      role: el?.role?.roleName,
      roleId: el?.role,
      department: el?.department,
      status: el?.active,
      id: el?._id,
    });
  });
  // Initialize filteredData with an empty array
  console.log(userAttributes, "element");
  // const filteredData = [];

  useEffect(() => {
    // Implement the filter function to filter data
    const filterData = () => {
      const filtered = rows.filter((item) => {
        // Customize your filter criteria here
        return (
          item.firstName.toLowerCase().includes(search.toLowerCase()) ||
          item.lastName.toLowerCase().includes(search.toLowerCase()) ||
          item.username.toLowerCase().includes(search.toLowerCase()) ||
          item?.role?.roleName.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredData(filtered);
    };

    filterData();
  }, [search, rows]);
  const handleStatusChange = async (user, checked) => {
    console.log(user, checked, "bothudb");
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/updateUserActiveStatus?userId=${user.id}`,
        "",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            // console.log( row,response.data.data,"Dasdsdsds")
            row._id === response.data.data._id
              ? { ...row, active: response.data.data.active }
              : row
          )
        );
      }
      handleClose();
    } catch (error) {
      console.log(error, "Error");
    }
  };
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
        field: "role", // Adjust field for department
        sort: "asc",
        width: 100,
      },
      {
        label: "Role",
        field: "role", // Adjust field for department
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "none",
        width: 100,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "none",
        width: 100,
        className: "actions-column",
      },
    ],

    rows: userAttributes.map((userData) => ({
      ...userData,
      status: (
        <ReactSwitch
          checked={userData.status}
          onChange={(checked) => handleStatusChange(userData, checked)}
        />
      ),
      actions: (
        <div>
          <button
            className="edit-button"
            onClick={() => {
              handleShow();
              setEditData(userData);
              console.log(userData, "userrr");
            }}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
          {user.access === "superadmin" && (
            <button
              className="delete-button"
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteId(userData.id);
              }}
            >
              <i className="fa-solid text-25 fa-xmark"></i>
            </button>
          )}
        </div>
      ),
    })),
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <>
      <div>
        <h2 className="pb-2 title-user">Users management</h2>
        {/* ... Your search and filter buttons ... */}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>{" "}
          {user?.role?.roleName && user?.role?.roleName !="callCenter" && <div class="c">
            <div class="mt-2 mb-3">
              <button
                type="button"
                class="btn m-1 btn-sm collapsed filter-button"
                aria-expanded="false"
                aria-controls="sidebar-right"
                style={{ overflowAnchor: "none" }}
              >
                <div className="button-container">
                  <FaFilter />
                  <span>Filter</span>
                </div>
              </button>{" "}
              <button type="button" className="mr-1 btn m-1 btn-sm pdf-button">
                <div className="button-container">
                  <FaFilePdf /> <span>PDF</span>
                </div>
              </button>{" "}
              <button className="mr-1 btn btn-sm ripple m-1 excel-button">
                <div className="button-container">
                  <FaFileExcel className="mr-1 " />
                  <span>EXCEL</span>
                </div>
              </button>{" "}
              <button
                type="button"
                className="mr-1 btn m-1 btn-sm onboard-user-button"
              >
                <div className="button-container">
                  <FaDownload />
                  <span>Onboard Users</span>
                </div>
              </button>{" "}
              <button
                type="button"
                className="mr-1 btn m-1 btn-sm offboard-user-button"
              >
                <div className="button-container">
                  <FaDownload />
                  <span>Offboard Users</span>
                </div>
              </button>{" "}
              <button
                type="button"
                className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
                onClick={() => {
                  handleShow();
                  setEditData(null);
                }}
              >
                <div className="button-container">
                  <FaPlusCircle />
                  <span>Create</span>
                </div>
              </button>
            </div>
          </div>}
        </div>
        {/* ... Your create user button ... */}
        <CreateUserModal
          show={showModal}
          handleClose={handleClose}
          user={user}
          setRows={setRows}
          rows={rows}
          editData={editData}
        />
        <DeleteUserModal
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          deleteId={deleteId}
          setRows={setRows}
        />
      </div>
      <MDBDataTable data={data} noBottomColumns />
    </>
  );
};

export default DatatablePage;
