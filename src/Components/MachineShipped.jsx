import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "../Css/CallCenter.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
const MachineShipped = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/getRepairedOrders?status=shipped`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRows(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error, "Error");
      }
    };
    fetchData();
  }, []);

  const userAttributes = [];
  filteredData.forEach((el) => {
    userAttributes.push({
      firstName: el.firstName,
      lastName: el.lastName,
      caseNumber: el.caseNumber,
      status: el?.status,
      createdAt: formatDate(el?.createdAt),
      id: el?._id,
      receiveShipements: el?.receiveShipements,
    });
  });
  console.log(filteredData, "rererererra");
  useEffect(() => {
    // Implement the filter function to filter data
    const filterData = () => {
      const filtered = rows.filter((item) => {
        // Customize your filter criteria here
        return (
          item.firstName.toLowerCase().includes(search.toLowerCase()) ||
          item.lastName.toLowerCase().includes(search.toLowerCase()) ||
          item.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
          item?.status.toLowerCase().includes(search.toLowerCase()) ||
          item?.createdAt.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredData(filtered);
    };
    filterData();
  }, [search, rows]);
  const data = {
    columns: [
      {
        label: "Case Number",
        field: "caseNumber",
        sort: "asc",
        width: 200,
      },
      {
        label: "Order Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Case Date",
        field: "createdAt",
        sort: "asc",
        width: 100,
      },
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
    ],

    rows: userAttributes,
  };

  return (
    <>
      {loading && (
        <div className="spinner-container-component">
          <div className="spinner-component"></div>
        </div>
      )}
      {!loading && (
        <>
          <div>
            <h2 className="pb-2 title-user">Machine Shipped</h2>
            {/* ... Your search and filter buttons ... */}
            <div class="service-component">
              <div class="global-search mt-4 mb-3">
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
            </div>
          </div>
          <MDBDataTable data={data} noBottomColumns />
          
        </>
      )}
    </>
  );
};

export default MachineShipped;
