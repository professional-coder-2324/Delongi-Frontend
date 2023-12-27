import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "../Css/CallCenter.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Modal } from "react-bootstrap";
import Barcode from "../Assets/barcode.png";
import RepairModals from "./RepairModal";
const MachineShipment = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [shipmentModal, setShipmentModal] = useState(false);
  const [orderData, setOrderData] = useState([]);
  // const formatDate = (dateString) => {
  //   const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   const date = new Date(dateString);
  //   return date.toLocaleString(undefined, options);
  // };
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
          `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/getRepairedOrders?status=repaired`,
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
    const handleSubmit = async (type) => {
      // setLoading(true)
      try {
        const CompanyBody = {
          "labelResponseOptions": "URL_ONLY",
          "requestedShipment": {
            "shipper": {
              "contact": {
                "personName": "ABC 1",
                "phoneNumber": 1234567890,
                "companyName": "Shipper Company Name"
              },
              "address": {
                "streetLines": [
                  "SHIPPER STREET LINE 1"
                ],
                "city": "HARRISON",
                "stateOrProvinceCode": "AR",
                "postalCode": 72601,
                "countryCode": "US"
              }
            },
            "recipients": [
              {
                "contact": {
                  "personName": "DEF 23",
                  "phoneNumber": 1234567890,
                  "companyName": "Recipient Company Name"
                },
                "address": {
                  "streetLines": [
                    "RECIPIENT STREET LINE 1",
                    "RECIPIENT STREET LINE 2"
                  ],
                  "city": "Collierville",
                  "stateOrProvinceCode": "TN",
                  "postalCode": 38017,
                  "countryCode": "US"
                }
              }
            ],
            "shipDatestamp": "2020-07-03",
            "serviceType": "PRIORITY_OVERNIGHT",
            "packagingType": "FEDEX_ENVELOPE",
            "pickupType": "USE_SCHEDULED_PICKUP",
            "blockInsightVisibility": false,
            "shippingChargesPayment": {
              "paymentType": "SENDER"
            },
            "shipmentSpecialServices": {
              "specialServiceTypes": [
                "RETURN_SHIPMENT"
              ],
              "returnShipmentDetail": {
                "returnType": "PRINT_RETURN_LABEL"
              }
            },
            "labelSpecification": {
              "imageType": "ZPLII",
              "labelStockType": "PAPER_85X11_TOP_HALF_LABEL"
            },
            "requestedPackageLineItems": [
              {
                "weight": {
                  "value": 1,
                  "units": "LB"
                }
              }
            ]
          },
          "accountNumber": {
            "value": "1234556789"
          }
        };
       
        let firstLabel = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/fedex/shipment`, CompanyBody)
        const encodedLabel = firstLabel.data.data.output.transactionShipments[0].pieceResponses[0].packageDocuments[0].encodedLabel;

  
        // Create a new iframe
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
  
        // Set the content of the iframe to an HTML document with both image tags
        iframe.srcdoc = `
          <html>
            <head>
              <style>
                body {
                  margin: 0;
                  transform: rotate(0deg); /* Use 270deg for landscape orientation */
                  transform-origin: left top;
                }
                img {
                  width: 100%;
                  height: auto;
                  max-width: 100vw;
                  max-height: 90vh; /* Adjust this value as needed */
                }
              </style>
            </head>
            <body>
              <img src="data:image/png;base64,${encodedLabel}" />
            </body>
          </html>
        `;
  
        // Append the iframe to the body
        document.body.appendChild(iframe);
  
        // Once the iframe is loaded, trigger the print dialog
        iframe.onload = function () {
          iframe.contentWindow.print();
            setLoading(false);
        };
  
        // Optionally, remove the iframe after printing
        iframe.onafterprint = function () {
          document.body.removeChild(iframe);
        };
         await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateOrderStatus`,
          {
            orderId: orderData.id,
            status: "shipped"
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ).then(()=>{
          navigate('/machineShipped')
        });
      } catch (error) {
        // setLoading(false)
        console.log(error, "Error");
      }
    };

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
  const navigate = useNavigate();
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
      {
        label: "Action",
        field: "process",
        sort: "none",
        width: 100,
        className: "process-column",
      },
      {
        label: "Details",
        field: "actions",
        sort: "none",
        width: 100,
        className: "actions-column",
      },
    ],

    rows: userAttributes.map((userData) => ({
      ...userData,
      actions: (
        <div>
          <button
            className="detail-button"
            onClick={() => {
              navigate(
                !location.pathname.includes("/repairs")
                  ? `/receiving/${userData.id}`
                  : `/repairs/${userData.id}`
              );
            }}
          >
            <a class="" title="detail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 19 22"
                class="action-btn text-success"
              >
                <path
                  d="M1.17,0H17.83c.9,.41,1.18,1.17,1.17,2.19-.02,5.91-.01,11.83-.01,17.74,0,.23,0,.46-.04,.68-.11,.79-.75,1.38-1.5,1.38-5.3,0-10.59,0-15.89,0-.19,0-.4-.05-.58-.13-.73-.34-.97-.99-.97-1.8C.01,14.11,.02,8.15,0,2.19,0,1.17,.27,.41,1.17,0Zm.51,1.74V20.25h15.64V1.74H1.68Z"
                  class="cls-1"
                ></path>{" "}
                <path d="M7.12,7.62v-1.71h7.89v1.71H7.12Z" class="cls-1"></path>{" "}
                <path
                  d="M7.13,14.37h7.88v1.71H7.13v-1.71Z"
                  class="cls-1"
                ></path>{" "}
                <path
                  d="M15.01,10.17v1.67H7.13v-1.67h7.88Z"
                  class="cls-1"
                ></path>{" "}
                <path
                  d="M3.99,7.62v-1.71h1.57v1.71h-1.57Z"
                  class="cls-1"
                ></path>{" "}
                <path d="M5.56,14.39v1.7h-1.56v-1.7h1.56Z" class="cls-1"></path>{" "}
                <path
                  d="M4.01,10.16h1.55v1.68h-1.55v-1.68Z"
                  class="cls-1"
                ></path>
              </svg>
            </a>
          </button>
        </div>
      ),
      process: (
        <div>
          {/* <button
            className="action-button"
            onClick={() => {
              setOrderData(userData);
              setRepairs(true);
            }}
            style={{
              background: "white",
              border: "none",
              cursor:
                userData.status !== "received" ? "not-allowed" : "pointer",
            }}
            disabled={userData.status !== "received"}
          >
            <i
              class="fa-regular fa-clone fa-xl"
              style={{
                color: "#10b981",
                opacity: userData.status !== "received" ? 0.4 : 1,
              }}
            ></i>
          </button> */}
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={() => {
              setOrderData(userData);
              setShipmentModal(true);
            }}
            // disabled={userData.status !== "received"}
          >
            <div className="button-container" style={{ fontSize: 12 }}>
              <span>Continue</span>
            </div>
          </button>
        </div>
      ),
    })),
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
            <h2 className="pb-2 title-user">Machine Shipments</h2>
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
          { 
             <Modal
             show={shipmentModal}
             onHide={() => setShipmentModal(false)}
             className="confirm-status-modal"
             backdrop="static"
             keyboard={false}
           >
             <Modal.Header>
               <Modal.Title>Shipment Confirmation</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <div className="text-center">
                 <Form.Label style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
                  Are you sure you want to ship this shipment
                 </Form.Label>
                 <p style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
                   {orderData?.caseNumber}
                 </p>
               </div>
             </Modal.Body>
             <Modal.Footer className="d-flex justify-content-between border-0">
              <div>
                <button
                  type="button"
                  className="mr-4 btn btn-icon m-1 btn-sm cancel-user-button"
                  onClick={() => {
                    setShipmentModal(false);
                  }}
                >
                  <div className="button-container">
                    <span>No</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
                  onClick={handleSubmit}
                >
                  <div className="button-container">
                    <span>Yes</span>
                  </div>
                </button>
              </div>
            </Modal.Footer>
           </Modal>
        }
        </>
      )}
    </>
  );
};

export default MachineShipment;
