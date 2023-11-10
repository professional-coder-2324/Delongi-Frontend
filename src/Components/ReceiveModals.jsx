import axios from "axios";
import { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";

const ReceiveModals = ({ orderData, id, setOrderData , setLoading, ReceivingModal, setReceivingModal,setStatus}) => {
  console.log(ReceivingModal,"vdsfgsdjkgh");
  const [Receive, setReceive] = useState(ReceivingModal);

  const [BoxShipmenConfirmation, setBoxShipmenConfirmation] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [modal, setModal] = useState("");
  const [receiverName] = useState([
    "Select Receiver Name",
    "Receiver 1",
    "Receiver 2",
    "Receiver 3",
  ]);
  const [modals] = useState(["Select Modal", "Modal 1", "Modal 2", "Modal 3"]);
  console.log("idddd", orderData);
  const handleReceived = async () => {
    const data = {
            orderId: id,
            status: "received",
            receiver: receiver,
            serialNumber: serialNumber,
            model: modal,
          }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateReceivedOrders`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrderData(response.data.data);
      setLoading(false);
      // navigate(`${path.length > 0 ? path : "/orderStatus"}`);
    } catch (error) {
      setLoading(false);
      console.log(error, "Error");
    }
  };
  return (
    <>
      <Modal
        show={Receive}
        onHide={() => setReceive(false)}
        className="confirm-status-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Receiving Confirmation</Modal.Title>
          <button className="btn bg-transparent close-button p-0">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setReceive(false);
                setReceivingModal(false)
              }}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Form.Label style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
              Tracking Number
            </Form.Label>
            <p style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
              {orderData?.receiveTrackingNo}
            </p>
          </div>
          <Row className="my-3">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Receiver</Form.Label>
                <Form.Control
                  as="select"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                >
                  {receiverName.map((name, index) => (
                    <option value={name} key={index}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="serialNumber" className="mb-3">
                <Form.Label>Confirm Serial Number</Form.Label>
                <Form.Control
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Modal</Form.Label>
                <Form.Control
                  as="select"
                  value={modal}
                  onChange={(e) => setModal(e.target.value)}
                >
                  {modals.map((name, index) => (
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
              setReceive(false);
              setBoxShipmenConfirmation(true);
              handleReceived("received");
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
              setReceivingModal(false)
              setStatus && setStatus("done")
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
export default ReceiveModals;
