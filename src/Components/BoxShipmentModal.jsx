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
  // function printZpl(zpl) {
  //   console.log("Starting print process..."); // Log start of print process
  //   var printWindow = window.open();
  //   printWindow.document.open('text/plain');
  //   printWindow.document.write(zpl);
  //   printWindow.document.close();
  //   printWindow.focus();
  //   printWindow.print();
  //   printWindow.close();
  //   console.log("Print process completed."); // Log end of print process
  //  }
  const handlePrint = (...encodedLabels) => {
    console.log(encodedLabels,"encodedLabels");
    encodedLabels.forEach((encodedLabel) => {
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
                "address": {
                    "streetLines": [
                        "9522 E 30th St"
                    ],
                    "city": "Indianapolis",
                    "stateOrProvinceCode": "IN",
                    "postalCode": "46229",
                    "countryCode": "US"
                },
                "contact": {
                    "personName": "shipper personName",
                    "phoneNumber": "1234567891",
                    "companyName": "shipper companyName"
                }
            },
            "recipients": [
                {
                    "address": {
                        "streetLines": [
                            "1840 N Tamiami Trail",
                            "L13"
                        ],
                        "city": "Naples",
                        "stateOrProvinceCode": "FL",
                        "postalCode": "34102",
                        "countryCode": "US"
                    },
                    "contact": {
                        "personName": null,
                        "phoneNumber": "1234567891",
                        "companyName": "recipients companyName"
                    }
                }
            ],
            "pickupType": "USE_SCHEDULED_PICKUP",
            "serviceType": "FEDEX_GROUND",
            "packagingType": "YOUR_PACKAGING",
            "shippingChargesPayment": {
                "paymentType": "SENDER",
                "payor": {
                    "responsibleParty": {
                        "accountNumber": {
                            "value": "123456789"
                        }
                    }
                }
            },
            "labelSpecification": {
                "labelStockType": "STOCK_4X6",
                "imageType": "ZPLII"
            },
            "requestedPackageLineItems": [
                {
                    "sequenceNumber": "1",
                    "customerReferences": [
                        {
                            "customerReferenceType": "CUSTOMER_REFERENCE",
                            "value": "00000912017692725421"
                        },
                        {
                            "customerReferenceType": "P_O_NUMBER",
                            "value": "99110369"
                        }
                    ],
                    "weight": {
                        "units": "LB",
                        "value": 24.023500000000002
                    }
                }
            ]
        },
        "mergeLabelDocOption": "LABELS_ONLY",
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
                    "personName": "SHIPPER NAME",
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
                        "personName": "RECIPIENT NAME",
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
            "shipDatestamp": "2023-05-17",
            "serviceType": "STANDARD_OVERNIGHT",
            "packagingType": "FEDEX_PAK",
            "pickupType": "USE_SCHEDULED_PICKUP",
            "blockInsightVisibility": false,
            "shippingChargesPayment": {
                "paymentType": "SENDER"
            },
            "labelSpecification": {
                "imageType": "ZPLII",
                "labelStockType": "STOCK_4X6"
            },
            "requestedPackageLineItems": [
                {
                    "groupPackageCount": 1,
                    "weight": {
                        "value": 10,
                        "units": "LB"
                    }
                },
                {
                    "groupPackageCount": 2,
                    "weight": {
                        "value": 5,
                        "units": "LB"
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
      
      let secondLabel = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/fedex/shipment`, UserBody)
      const encodedLabel2 = secondLabel.data.data;
      
      
      console.log(encodedLabel,encodedLabel2,"encodeddd");
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateBoxshipment`,
        {
          orderId: orderData.id,
          status: status,
          shipperName: shipper,
          outboundTrackingNo: firstLabel.data.trackingNumber,
          receiveTrackingNo: secondLabel.data.trackingNumber
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
