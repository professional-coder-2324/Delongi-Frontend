import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PrinterUtil from "./PrinterUtil";

const BoxShipmentModals = ({
  orderData,
  BoxShipmentModal,
  setBoxShipmentModal,
  setLoading,
  setOrderData,
  setStatus,
}) => {
  console.log(orderData, "vdsfgsdjkgh");
  const [boxShipment, setBoxShipment] = useState(BoxShipmentModal);
  const [BoxShipmenConfirmation, setBoxShipmenConfirmation] = useState(false);
  const [shipperName] = useState([
    "Select Shipper Name",
    "Shipper 1",
    "Shipper 2",
    "Shipper 3",
  ]);
  const [shipper, setShipper] = useState("");
  const navigate = useNavigate();
  //   const handleStatusSubmit = async (status) => {
  //     try {
  //       const response = await axios.put(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateOrderStatus`,
  //         {
  //           orderId: id,
  //           status: status,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       setOrderData(response.data.data);
  //       setLoading(false);
  //       navigate(`${path == "boxShipments" ? "/boxShipments" : "/orderStatus"}`);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error, "Error");
  //     }
  //   };
  useEffect(() => {
    // Initialize QZ Tray when the component mounts
    PrinterUtil.initialize();

    // Cleanup QZ Tray connection when the component unmounts
    return () => {
      PrinterUtil.terminate();
    };
  }, []);

  const handlePrint = (...encodedLabels) => {
    const zplContent = '^XA^FO100,100^B3^FD>:123456^FS^XZ';
    encodedLabels.forEach((encodedLabel) => {
      const zplContent = '^XA^FO100,100^B3^FD>:123456^FS^XZ';
      PrinterUtil.printZPL(encodedLabel);
    });
  };
  const handleStatusSubmit = async (status) => {
    setLoading(true);
    try {
      const UserBody ={
        "labelResponseOptions": "LABEL",
        "requestedShipment": {
            "shipper": {
                "contact": {
                    "personName": "James Weston",
                    "phoneNumber": 9012633035,
                    "companyName": "RTC"
                },
                "address": {
                    "streetLines": [
                        "1751 THOMPSON ST"
                    ],
                    "city": "AURORA",
                    "stateOrProvinceCode": "OH",
                    "postalCode": 44202,
                    "countryCode": "US"
                }
            },
            "recipients": [
                {
                    "contact": {
                        "personName": "1505",
                        "phoneNumber": 9012633035,
                        "companyName": "RTC TEST"
                    },
                    "address": {
                        "streetLines": [
                            " Recipient Address Line 1"
                        ],
                        "city": "Toronto",
                        "stateOrProvinceCode": "ON",
                        "postalCode": "M4P1E4",
                        "countryCode": "CA"
                    }
                }
            ],
            "shipDatestamp": "2023-07-31",
            "serviceType": "FEDEX_GROUND",
            "packagingType": "YOUR_PACKAGING",
            "pickupType": "USE_SCHEDULED_PICKUP",
            "blockInsightVisibility": false,
            "customsClearanceDetail": {
                "dutiesPayment": {
                    "payor": {
                        "responsibleParty": {
                            "address": {
                                "streetLines": [],
                                "city": "Beverly Hills",
                                "stateOrProvinceCode": "CA",
                                "postalCode": "38127",
                                "countryCode": "US",
                                "residential": false
                            },
                            "contact": {
                                "personName": "John Taylor",
                                "emailAddress": "test001@fedex.com",
                                "parsedPersonName": {},
                                "phoneNumber": "1234567890",
                                "phoneExtension": "12",
                                "companyName": "Fedex",
                                "faxNumber": "fax number"
                            },
                            "accountNumber": {
                                "value": "123456789"
                            }
                        }
                    },
                    "paymentType": "SENDER"
                },
                "isDocumentOnly": true,
                "importerOfRecord": {
                    "address": {
                        "streetLines": [
                            "10 FedEx Parkway",
                            "Suite 302"
                        ],
                        "city": "Beverly Hills",
                        "stateOrProvinceCode": "CA",
                        "postalCode": "90210",
                        "countryCode": "US",
                        "residential": false
                    },
                    "contact": {
                        "personName": "John Taylor",
                        "emailAddress": "test001@fedex.com",
                        "phoneExtension": "000",
                        "phoneNumber": "XXXX345671",
                        "companyName": "Fedex"
                    },
                    "accountNumber": {
                        "value": 123456789
                    }
                },
                "commodities": [
                    {
                        "description": "PACKAGE",
                        "countryOfManufacture": "US",
                        "quantity": 1,
                        "quantityUnits": "PCS",
                        "unitPrice": {
                            "amount": 100,
                            "currency": "USD"
                        },
                        "customsValue": {
                            "amount": 100,
                            "currency": "USD"
                        },
                        "weight": {
                            "units": "LB",
                            "value": 0.5
                        },
                        "customerReferenceType": "CUSTOMER_REFERENCE",
                        "value": "CSP_TESTING",
                        "b13AFilingOption": "NOT_REQUIRED",
                        "exportComplianceStatement": "NO EEI 30.37(f)"
                    }
                ]
            },
            "shippingChargesPayment": {
                "paymentType": "SENDER",
                "payor": {
                    "responsibleParty": {
                        "address": {
                            "streetLines": [
                                "10 FedEx Parkway",
                                "Suite 302"
                            ],
                            "city": "Beverly Hills",
                            "stateOrProvinceCode": "CA",
                            "postalCode": "90210",
                            "countryCode": "US",
                            "residential": false
                        },
                        "contact": {
                            "personName": "John Taylor",
                            "emailAddress": "test001@fedex.com",
                            "parsedPersonName": {
                                "firstName": "first name",
                                "lastName": "last name",
                                "middleName": "middle name",
                                "suffix": "suffix"
                            },
                            "phoneNumber": "1234567890",
                            "phoneExtension": "phone ",
                            "companyName": "Fedex",
                            "faxNumber": "fax number"
                        },
                        "accountNumber": {
                            "value": "123456789"
                        }
                    }
                }
            },
            "rateRequestType": [
                "LIST"
            ],
            "labelSpecification": {
                "imageType": "ZPLII",
                "labelStockType": "STOCK_4X6"
            },
            "requestedPackageLineItems": [
                {
                    "insuredValue": {
                        "Currency": "USD",
                        "Amount": 250
                    },
                    "weight": {
                        "value": 30,
                        "units": "LB"
                    },
                    "dimensions": {
                        "length": 12,
                        "width": 12,
                        "height": 12,
                        "units": "IN"
                    }
                }
            ]
        },
        "accountNumber": {
            "value": "123456789"
        }
    };
      // const UserBody = {
      //   "labelResponseOptions": "URL_ONLY",
      //   "requestedShipment": {
      //     "shipper": {
      //       "contact": {
      //         "personName": "Krupal Jada",
      //         "phoneNumber": 1234567890,
      //         "companyName": "JKV"
      //       },
      //       "address": {
      //         "streetLines": [
      //           "SHIPPER STREET LINE 1"
      //         ],
      //         "city": "HARRISON",
      //         "stateOrProvinceCode": "AR",
      //         "postalCode": 72601,
      //         "countryCode": "US"
      //       }
      //     },
      //     "recipients": [
      //       {
      //         "contact": {
      //           "personName": "Deloghi",
      //           "phoneNumber": 1234567890,
      //           "companyName": "Delonghi"
      //         },
      //         "address": {
      //           "streetLines": [
      //             "RECIPIENT STREET LINE 1",
      //             "RECIPIENT STREET LINE 2"
      //           ],
      //           "city": "Collierville",
      //           "stateOrProvinceCode": "TN",
      //           "postalCode": 38017,
      //           "countryCode": "US"
      //         }
      //       }
      //     ],
      //     "shipDatestamp": "2023-12-25",
      //     "serviceType": "GROUND_HOME_DELIVERY",
      //     "packagingType": "FEDEX_ENVELOPE",
      //     "pickupType": "USE_SCHEDULED_PICKUP",
      //     "blockInsightVisibility": false,
      //     "shippingChargesPayment": {
      //       "paymentType": "SENDER"
      //     },
      //     "shipmentSpecialServices": {
      //       "specialServiceTypes": [
      //         "RETURN_SHIPMENT"
      //       ],
      //       "returnShipmentDetail": {
      //         "returnType": "PRINT_RETURN_LABEL"
      //       }
      //     },
      //     "labelSpecification": {
      //       "imageType": "ZPLII",
      //       "labelStockType": "PAPER_4X8"
      //     },
      //     "requestedPackageLineItems": [
      //       {
      //         "weight": {
      //           "value": 1,
      //           "units": "LB"
      //         }
      //       }
      //     ]
      //   },
      //   "accountNumber": {
      //     "value": "985798579857"
      //   }
      // };
      // const CompanyBody = {
      //   "labelResponseOptions": "URL_ONLY",
      //   "requestedShipment": {
      //     "shipper": {
      //       "contact": {
      //         "personName": "ABC 1",
      //         "phoneNumber": 1234567890,
      //         "companyName": "Shipper Company Name"
      //       },
      //       "address": {
      //         "streetLines": [
      //           "SHIPPER STREET LINE 1"
      //         ],
      //         "city": "HARRISON",
      //         "stateOrProvinceCode": "AR",
      //         "postalCode": 72601,
      //         "countryCode": "US"
      //       }
      //     },
      //     "recipients": [
      //       {
      //         "contact": {
      //           "personName": "DEF 23",
      //           "phoneNumber": 1234567890,
      //           "companyName": "Recipient Company Name"
      //         },
      //         "address": {
      //           "streetLines": [
      //             "RECIPIENT STREET LINE 1",
      //             "RECIPIENT STREET LINE 2"
      //           ],
      //           "city": "Collierville",
      //           "stateOrProvinceCode": "TN",
      //           "postalCode": 38017,
      //           "countryCode": "US"
      //         }
      //       }
      //     ],
      //     "shipDatestamp": "2020-07-03",
      //     "serviceType": "PRIORITY_OVERNIGHT",
      //     "packagingType": "FEDEX_ENVELOPE",
      //     "pickupType": "USE_SCHEDULED_PICKUP",
      //     "blockInsightVisibility": false,
      //     "shippingChargesPayment": {
      //       "paymentType": "SENDER"
      //     },
      //     "shipmentSpecialServices": {
      //       "specialServiceTypes": [
      //         "RETURN_SHIPMENT"
      //       ],
      //       "returnShipmentDetail": {
      //         "returnType": "PRINT_RETURN_LABEL"
      //       }
      //     },
      //     "labelSpecification": {
      //       "imageType": "ZPLII",
      //       "labelStockType": "PAPER_4X6"
      //     },
      //     "requestedPackageLineItems": [
      //       {
      //         "weight": {
      //           "value": 1,
      //           "units": "LB"
      //         }
      //       }
      //     ]
      //   },
      //   "accountNumber": {
      //     "value": "1234556789"
      //   }
      // };
      const CompanyBody = {
        "labelResponseOptions": "LABEL",
        "requestedShipment": {
            "shipper": {
                "contact": {
                    "personName": "SENDER NAME",
                    "phoneNumber": "9018328595"
                },
                "address": {
                    "city": "ROBERTSFORS",
                    "stateOrProvinceCode": "",
                    "postalCode": "8037",
                    "countryCode": "CH",
                    "residential": false,
                    "streetLines": [
                        "SENDER ADDRESS 1",
                        "SENDER ADDRESS 2"
                    ]
                }
            },
            "recipients": [
                {
                    "contact": {
                        "personName": "RECIPIENT NAME",
                        "phoneNumber": "9018328595"
                    },
                    "address": {
                        "city": "Bessemmer",
                        "stateOrProvinceCode": "",
                        "postalCode": "1217",
                        "countryCode": "CH",
                        "residential": false,
                        "streetLines": [
                            "RECIPIENT ADDRESS 1",
                            "RECIPIENT ADDRESS 2"
                        ]
                    }
                }
            ],
            "shipDatestamp": "2023-08-01",
            "pickupType": "USE_SCHEDULED_PICKUP",
            "serviceType": "PRIORITY_OVERNIGHT",
            "packagingType": "YOUR_PACKAGING",
            "shippingChargesPayment": {
                "paymentType": "SENDER"
            },
            "customsClearanceDetail": {
                "totalCustomsValue": {
                    "amount": "500",
                    "currency": "USD"
                },
                "dutiesPayment": {
                    "paymentType": "SENDER"
                },
                "commodities": [
                    {
                        "description": "DSLR Camera",
                        "countryOfManufacture": "US",
                        "numberOfPieces": "1",
                        "weight": {
                            "value": "8",
                            "units": "LB"
                        },
                        "quantity": "1",
                        "quantityUnits": "PCS",
                        "unitPrice": {
                            "amount": "500",
                            "currency": "USD"
                        },
                        "customsValue": {
                            "amount": "500",
                            "currency": "USD"
                        }
                    }
                ]
            },
            "labelSpecification": {
                "imageType": "ZPLII",
                "labelStockType": "STOCK_4X6"
            },
            "shippingDocumentSpecification": {
                "shippingDocumentTypes": [
                    "COMMERCIAL_INVOICE"
                ],
                "commercialInvoiceDetail": {
                    "documentFormat": {
                        "docType": "PDF",
                        "stockType": "PAPER_LETTER"
                    }
                }
            },
            "requestedPackageLineItems": [
                {
                    "groupPackageCount": 1,
                    "declaredValue": {
                        "currency": "USD",
                        "amount": "500"
                    },
                    "weight": {
                        "units": "LB",
                        "value": "19"
                    },
                    "dimensions": {
                        "length": "10",
                        "width": "10",
                        "height": "10",
                        "units": "IN"
                    },
                    "packageSpecialServices": {
                        "specialServiceTypes": [
                            "NON_STANDARD_CONTAINER"
                        ],
                        "signatureOptionDetail": {
                            "signatureOptionType": "DIRECT"
                        }
                    }
                }
            ]
        },
        "accountNumber": {
            "value": 123456789
        }
    };
      let firstLabel = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/fedex/shipment`, CompanyBody)
      const encodedLabel = firstLabel.data.data;
      console.log(firstLabel,"encodeddd");

      let secondLabel = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/fedex/shipment`, UserBody)
      const encodedLabel2 = secondLabel.data.data;

      // Create a new iframe
      // const iframe = document.createElement('iframe');
      // iframe.style.display = 'none';

      // // Set the content of the iframe to an HTML document with both image tags
      // iframe.srcdoc = `
      //   <html>
      //     <head>
      //       <style>
      //         body {
      //           margin: 0;
      //           transform: rotate(0deg); /* Use 270deg for landscape orientation */
      //           transform-origin: left top;
      //         }
      //         img {
      //           width: 100%;
      //           height: auto;
      //           max-width: 100vw;
      //           max-height: 90vh; /* Adjust this value as needed */
      //         }
      //       </style>
      //     </head>
      //     <body>
      //       <img src="data:image/png;base64,${encodedLabel}" />
      //       <img src="data:image/png;base64,${encodedLabel2}" />
      //     </body>
      //   </html>
      // `;

      // // Append the iframe to the body
      // document.body.appendChild(iframe);

      // // Once the iframe is loaded, trigger the print dialog
      // iframe.onload = function () {
      //   iframe.contentWindow.print();
      //     setLoading(false);
      // };

      // // Optionally, remove the iframe after printing
      // iframe.onafterprint = function () {
      //   document.body.removeChild(iframe);
      // };




      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateBoxshipment`,
        {
          orderId: orderData.id,
          status: status,
          shipperName: shipper,
          outboundTrackingNo: firstLabel.data.data.output.transactionShipments[0].masterTrackingNumber,
          receiveTrackingNo: secondLabel.data.data.output.transactionShipments[0].masterTrackingNumber
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      handlePrint(encodedLabel,encodedLabel2)
      setBoxShipmentModal(false)
      window.location.reload()
    } catch (error) {
      setLoading(false);
      console.log(error, "Error");
    }
  };
  return (
    <>
      <Modal
        show={boxShipment}
        onHide={() => setBoxShipment(false)}
        className="confirm-status-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Shipment Confirmation</Modal.Title>
          <button className="btn bg-transparent close-button p-0">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setBoxShipment(false);
                setBoxShipmentModal(false);
              }}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Form.Label style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
              Case Number
            </Form.Label>
            <p style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
              {orderData?.caseNumber}
            </p>
          </div>
          <Row className="my-3">
            <Col>
              <Form.Group>
                <Form.Label>Shipper</Form.Label>
                <Form.Control
                  as="select"
                  value={shipper}
                  onChange={(e) => setShipper(e.target.value)}
                >
                  {shipperName.map((name, index) => (
                    <option value={name} key={index}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={() => {
              setBoxShipment(false);
              setBoxShipmenConfirmation(true);
              handleStatusSubmit("boxShipped");
            }}
          >
            <div className="button-container" style={{ fontSize: 12 }}>
              <span>Confirm</span>
            </div>
          </button>
        </Modal.Body>
      </Modal>

      <Modal
        show={BoxShipmenConfirmation}
        onHide={() => setBoxShipmenConfirmation(false)}
        className="confirm-status-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Updated Notice</Modal.Title>
          <button className="btn bg-transparent close-button p-0">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setBoxShipmenConfirmation(false);
                navigate("/unreleasedOrders");
              }}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Form.Label style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
              Case Number
            </Form.Label>
            <p style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
              {orderData?.receiveTrackingNo
                ? orderData?.receiveTrackingNo
                : orderData?.caseNumber}
            </p>
          </div>
          <p
            style={{
              textAlign: "left",
              fontSize: 18,
              fontWeight: 400,
              textTransform: "uppercase",
              margin: "15px 0",
            }}
          >
            Activity Status has been updated for this order
          </p>
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={() => {
              setBoxShipmenConfirmation(false);
              setBoxShipmentModal(false);
              setStatus && setStatus("done");
              navigate("/unreleasedOrders");
            }}
          >
            <div className="button-container" style={{ fontSize: 12 }}>
              <span>Ok</span>
            </div>
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default BoxShipmentModals;
