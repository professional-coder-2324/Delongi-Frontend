import axios from "axios";
import { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BoxShipmentModals = ({
  orderData,
  BoxShipmentModal,
  setBoxShipmentModal,
  setLoading,
  setOrderData,
  setStatus,
}) => {
  console.log(BoxShipmentModal, "vdsfgsdjkgh");
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
  const handleStatusSubmit = async (status) => {
    // setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateBoxshipment`,
        {
          orderId: orderData.id,
          status: status,
          shipperName: shipper,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    //   setLoading(false);
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
                setBoxShipmentModal(false)
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
