import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Css/NewOrders.css";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useModal } from "./ModalContext";
import { useParams } from "react-router-dom";

export const SecondModal = ({ formData, handleChange, disabled = false }) => {
  return (
    <>
      <Row className="mb-2">
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};
export const ThirdModal = ({
  formData,
  handleChange,
  handleModelChange,
  models,
  setFormData,
  retailerNames,
  reasonCodes,
  disabled = false,
}) => {
  console.log(formData, "formDaraaaa");
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

  if (dateRegex.test(formData.dateOfPurchase)) {
    // Convert the string into a Date object
    const dateObject = new Date(formData.dateOfPurchase);

    // Format the date into the input element format (yyyy-MM-dd)
    const formattedDate = dateObject.toISOString().split("T")[0];
    formData.dateOfPurchase = formattedDate;
    // Set the formatted date as the value for your form field
  }
  return (
    <>
      <Row className="mb-2">
        <Col>
          <Form.Group>
            <Form.Label>Model</Form.Label>
            <Form.Control
              as="select"
              name="model"
              value={formData.model}
              onChange={(e) => {
                handleModelChange(e.target.value);
              }}
              disabled={disabled}
            >
              {models.map((model, index) => (
                <option value={model} key={index}>
                  {model}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              readOnly
              disabled={disabled}
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={formData.brand}
              readOnly
              disabled={disabled}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>Serial Number</Form.Label>
            <Form.Control
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>Date of Product Purchase</Form.Label>
            <Form.Control
              type="date"
              name="dateOfPurchase"
              value={formData.dateOfPurchase}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}></Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Group>
            <Form.Label>Retailer Name</Form.Label>
            <Form.Control
              as="select"
              name="retailerName"
              value={formData.retailerName}
              onChange={(e) =>
                setFormData({ ...formData, retailerName: e.target.value })
              }
              disabled={disabled}
            >
              {retailerNames.map((name, index) => (
                <option value={name} key={index}>
                  {name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Group>
            <Form.Label>Defect Reported</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="defectReported"
              value={formData.defectReported}
              onChange={handleChange}
              disabled={disabled}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Group>
            <Form.Label>Reason Code</Form.Label>
            <Form.Control
              as="select"
              name="reasonCode"
              value={formData.reasonCode}
              onChange={(e) =>
                setFormData({ ...formData, reasonCode: e.target.value })
              }
              disabled={disabled}
            >
              {reasonCodes.map((code, index) => (
                <option value={code} key={index}>
                  {code}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>In Warranty</Form.Label>
            <div className="d-flex align-items-center" style={{ gap: 12 }}>
              <Form.Check
                type="radio"
                label="Yes"
                name="inWarranty"
                value={true}
                checked={formData.inWarranty === true}
                onChange={handleChange}
                disabled={disabled}
              />
              <Form.Check
                type="radio"
                label="No"
                name="inWarranty"
                value={false}
                checked={formData.inWarranty === false}
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>Box Required from BATES</Form.Label>
            <div className="d-flex align-items-center" style={{ gap: 12 }}>
              <Form.Check
                type="radio"
                label="Yes"
                name="boxRequired"
                value={true}
                checked={formData.boxRequired === true}
                onChange={handleChange}
                disabled={disabled}
              />
              <Form.Check
                type="radio"
                label="No"
                name="boxRequired"
                value={false}
                checked={formData.boxRequired === false}
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};
const NewOrders = ({ orderData, setIsEdit }) => {
  const { openNewOrdersModal, showNewOrdersModal, closeNewOrdersModal } =
    useModal();

    const [showCaseModal, setShowCaseModal] = useState(
      showNewOrdersModal ? showNewOrdersModal : false
      );
      const [caseNumber, setCaseNumber] = useState(
        orderData?.caseNumber ? orderData.caseNumber : ""
        );
        const {id} = useParams()
        console.log(orderData, id, "orderData");
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmReleasedModal, setShowConfirmReleasedModal] =
    useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
    zipCode: "",
    state: "",
    phone: "",
    model: "",
    brand: "",
    category: "",
    serialNumber: "",
    retailerName: "",
    dateOfPurchase: "",
    defectReported: "",
    reasonCode: "",
    inWarranty: false,
    boxRequired: false,
  });
  useEffect(() => {
    if (showNewOrdersModal && orderData) {
      openNewOrdersModal();
      setFormData(orderData);
    }
  }, [showNewOrdersModal]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    console.log(currentStep, "currentStep");
    if (currentStep === 1) {
      // Save data from the first modal
      setShowSecondModal(true);
      setShowCaseModal(false);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Save data from the second modal
      setShowThirdModal(true);
      setShowSecondModal(false);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Save data from the second modal
      setShowFinalModal(true);
      setShowThirdModal(false);
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Save data from the second modal
      setShowConfirmModal(true);
      setShowFinalModal(false);
      setCurrentStep(5);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setShowSecondModal(false);
      setShowCaseModal(true);
      openNewOrdersModal();
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setShowThirdModal(false);
      setShowSecondModal(true);
      setCurrentStep(2);
    } else if (currentStep === 4) {
      // Save data from the second modal
      setShowThirdModal(true);
      setShowFinalModal(false);
      setCurrentStep(3);
    } else if (currentStep === 5) {
      // Save data from the second modal
      setShowConfirmModal(false);
      setShowFinalModal(true);
      setCurrentStep(4);
    }
  };
  const [models] = useState(["Select Model", "Model A", "Model B", "Model C"]);
  const [categories] = useState({
    "Select Model": [],
    "Model A": ["Category 1"],
    "Model B": ["Category 2"],
    "Model C": ["Category 3"],
  });
  const [brands] = useState({
    "Select Model": [],
    "Model A": ["Brand 1"],
    "Model B": ["Brand 2"],
    "Model C": ["Brand 3"],
  });
  const [retailerNames] = useState([
    "Select Retailer Name",
    "Retailer 1",
    "Retailer 2",
    "Retailer 3",
  ]);
  const [reasonCodes] = useState([
    "Select Reason Code",
    "Reason Code 1",
    "Reason Code 2",
    "Reason Code 3",
  ]);

  const handleCloseCaseModal = () => {
    setShowCaseModal(false);
    setCurrentStep(1);
    setCaseNumber("");
    setFormData({});
  };

  const handleCaseNumberSubmit = () => {
    // Add logic to verify the case number
    // If valid, show the second modal
    setShowSecondModal(true);
    setShowCaseModal(false); // Close the case modal
  };

  const handleModelChange = (selectedModel) => {
    // Set the selected model, category, and brand to formData
    setFormData({
      ...formData,
      model: selectedModel,
      category: categories[selectedModel][0],
      brand: brands[selectedModel][0],
    });
  };
  const handleSubmit = async (orderStatus) => {
    setShowConfirmReleasedModal(false);
    setShowConfirmModal(false);
    // Add logic to handle form submission
    // formData contains the form data
    // You can send this data to your backend or perform any other actions

    const data = {
      ...formData,
      status: orderStatus,
      caseNumber: caseNumber,
    };
    if (id) {
      data.orderId = id
      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateOrder`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        window.location.reload()
      } catch (error) {
        console.log(error, "Error");
      }
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/addNewOrder`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.log(error, "Error");
      }
    }

    console.log("Form Data:", data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" || type === "radio") {
      // Handle checkboxes and radio buttons
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value === "true",
      }));
    } else {
      // Handle other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="your-component">
      {!id && (
        <div className="new-order-box" onClick={() => setShowCaseModal(true)}>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29.09 32.89"
              class="nav-icon"
            >
              <path
                d="M10.79,29.47H3.21c-.44,0-.81-.41-.81-.88V3.28c0-.48,.37-.88,.81-.88H23.74c.44,0,.81,.41,.81,.88v13.24c0,.66,.53,1.2,1.2,1.2s1.2-.53,1.2-1.2V3.28c0-1.81-1.44-3.28-3.21-3.28H3.21C1.44,0,0,1.47,0,3.28V28.58c0,1.81,1.44,3.28,3.21,3.28h7.58c.66,0,1.2-.53,1.2-1.2s-.53-1.2-1.2-1.2h0ZM20.11,7.39H6.84c-.66,0-1.2,.53-1.2,1.2s.53,1.2,1.2,1.2h13.27c.66,0,1.2-.53,1.2-1.2s-.54-1.2-1.2-1.2Zm0,6.22H6.84c-.66,0-1.2,.53-1.2,1.2s.53,1.2,1.2,1.2h13.27c.66,0,1.2-.53,1.2-1.2s-.54-1.2-1.2-1.2Zm-8.15,6.22H6.85c-.66,0-1.2,.53-1.2,1.2s.53,1.2,1.2,1.2h5.1c.66,0,1.2-.53,1.2-1.2s-.53-1.2-1.2-1.2Zm15.36,.31h-6.75c-.98,0-1.78,.8-1.78,1.78v.85h-3.18c-.98,0-1.78,.8-1.78,1.78v5.18c0,.98,.8,1.78,1.78,1.78h.81c.38,.81,1.19,1.36,2.13,1.36s1.76-.56,2.13-1.36h1.78c.38,.81,1.19,1.36,2.13,1.36s1.76-.56,2.13-1.36h.58c.98,0,1.78-.8,1.78-1.78v-7.81c0-.98-.79-1.78-1.78-1.78Zm-8.76,11.34c-.53,0-.96-.43-.96-.96s.43-.96,.96-.96,.96,.43,.96,.96-.43,.96-.96,.96Zm6.05,0c-.53,0-.96-.43-.96-.96s.43-.96,.96-.96,.96,.43,.96,.96-.43,.96-.96,.96Zm2.5-1.96h-.38c-.38-.79-1.19-1.35-2.13-1.35s-1.75,.55-2.13,1.35h-1.8c-.38-.79-1.19-1.35-2.13-1.35s-1.75,.55-2.13,1.35h-.6v-4.75h3.7c.69,0,1.26-.56,1.26-1.26v-1.38h6.32v7.38h0Z"
                class="cls-1"
              ></path>
            </svg>
            <span class="nav-text">
              New <br /> Orders
            </span>
          </a>
        </div>
      )}
      <Modal
        show={showCaseModal}
        onHide={handleCloseCaseModal}
        className="case-number-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title> Case Number</Modal.Title>
          <button className="btn bg-transparent close-button">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={handleCloseCaseModal}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="caseNumber">
              <Form.Label>Case Number</Form.Label>
              <Form.Control
                type="text"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                placeholder="Enter Case Number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={handleNext}
          >
            <div className="button-container">
              <span>Next</span>
            </div>
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSecondModal}
        onHide={() => setShowSecondModal(false)}
        className="new-order-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title> New Order</Modal.Title>
          <button className="btn bg-transparent close-button">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setShowSecondModal(false);
                handleCloseCaseModal();
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
              {caseNumber}
            </p>
          </div>
          <Form>
            <SecondModal formData={formData} handleChange={handleChange} />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start border-0">
          <button
            type="button"
            className="mr-4 btn btn-icon m-1 btn-sm cancel-user-button"
            onClick={handleBack}
          >
            <div className="button-container">
              <span>Back</span>
            </div>
          </button>
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={handleNext}
          >
            <div className="button-container">
              <span>Next</span>
            </div>
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showThirdModal}
        onHide={() => setShowThirdModal(false)}
        className="new-order-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Order Information</Modal.Title>
          <button className="btn bg-transparent close-button">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setShowThirdModal(false);
                handleCloseCaseModal();
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
              {caseNumber}
            </p>
          </div>
          <Form>
            <ThirdModal
              formData={formData}
              handleChange={handleChange}
              handleModelChange={handleModelChange}
              models={models}
              setFormData={setFormData}
              retailerNames={retailerNames}
              reasonCodes={reasonCodes}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start border-0">
          <button
            type="button"
            className="mr-4 btn btn-icon m-1 btn-sm cancel-user-button"
            onClick={handleBack}
          >
            <div className="button-container">
              <span>Back</span>
            </div>
          </button>
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={handleNext}
          >
            <div className="button-container">
              <span>Next</span>
            </div>
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showFinalModal}
        onHide={() => setShowFinalModal(false)}
        className="new-order-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Review & Confirmation</Modal.Title>
          <button className="btn bg-transparent close-button">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setShowFinalModal(false);
                handleCloseCaseModal();
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
              {caseNumber}
            </p>
          </div>
          <Form>
            <SecondModal
              formData={formData}
              handleChange={handleChange}
              disabled={true}
            />
            <ThirdModal
              formData={formData}
              handleChange={handleChange}
              handleModelChange={handleModelChange}
              models={models}
              setFormData={setFormData}
              retailerNames={retailerNames}
              reasonCodes={reasonCodes}
              disabled={true}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start border-0">
          <button
            type="button"
            className="mr-4 btn btn-icon m-1 btn-sm cancel-user-button"
            onClick={handleBack}
          >
            <div className="button-container">
              <span>Back</span>
            </div>
          </button>
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={handleNext}
          >
            <div className="button-container">
              <span>Submit</span>
            </div>
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        className="confirm-status-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Release Order Confirmation</Modal.Title>
          <button className="btn bg-transparent close-button">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setShowConfirmModal(false);
                handleCloseCaseModal();
              }}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Form.Label style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
              Case Number
            </Form.Label>
            <p style={{ fontSize: 20, fontWeight: 900, marginBottom: 20 }}>
              {caseNumber}
            </p>
            <button
              type="button"
              className="mr-4 btn btn-icon m-1 btn-sm display-6 create-user-button"
              onClick={() => {
                setShowConfirmModal(false);
                setShowConfirmReleasedModal(true);
              }}
            >
              <div className="button-container" style={{ fontSize: 12 }}>
                <span>
                  Release Order to <br />
                  Service Center NOW
                </span>
              </div>
            </button>
            <button
              type="button"
              className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
              onClick={() => handleSubmit("unreleased")}
            >
              <div className="button-container" style={{ fontSize: 12 }}>
                <span>
                  Release Order to <br /> Service Center LATER
                </span>
              </div>
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showConfirmReleasedModal}
        onHide={() => setShowConfirmReleasedModal(false)}
        className="confirm-status-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
          <button className="btn bg-transparent close-button">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setShowConfirmReleasedModal(false);
                handleCloseCaseModal();
              }}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          {/* <Form.Label style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
              Case Number
            </Form.Label>
            <p style={{ fontSize: 20, fontWeight: 900, marginBottom: 20 }}>
              {caseNumber}
            </p> */}
          <p style={{ textAlign: "left", fontSize: 17, fontWeight: 400 }}>
            Release Box Picking Order to Service Center
          </p>
          {/* <button
              type="button"
              className="mr-4 btn btn-icon m-1 btn-sm display-6 create-user-button"
              onClick={handleBack}
            >
              <div className="button-container" style={{fontSize:12}}>
                <span>
                  Release Order to <br />
                  Service Center NOW
                </span>
              </div>
            </button> */}
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={() => handleSubmit("released")}
          >
            <div className="button-container" style={{ fontSize: 12 }}>
              <span>Confirm</span>
            </div>
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewOrders;
