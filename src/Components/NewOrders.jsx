import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Css/NewOrders.css";
import { Col, Row } from "react-bootstrap";
const NewOrders = () => {
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [caseNumber, setCaseNumber] = useState("");
  const [showSecondModal, setShowSecondModal] = useState(false);
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
  const [retailerNames] = useState(["Select Retailer Name", "Retailer 1", "Retailer 2", "Retailer 3"]);
  const [reasonCodes] = useState(["Select Reason Code", "Reason Code 1", "Reason Code 2", "Reason Code 3"]);


  const handleCloseCaseModal = () => {
    setShowCaseModal(false);
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
  const handleSubmit = () => {
    // Add logic to handle form submission
    // formData contains the form data
    // You can send this data to your backend or perform any other actions
    console.log("Form Data:", formData);
  };

  const handleChange = () => {
    // Add logic to handle form submission
    // formData contains the form data
    // You can send this data to your backend or perform any other actions
    console.log("Form Data:", formData);
  };

  return (
    <div className="your-component">
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
      <Modal
        show={showCaseModal}
        onHide={handleCloseCaseModal}
        className="case-number-modal"
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
            onClick={handleCaseNumberSubmit}
          >
            <div className="button-container">
              <span>Submit</span>
            </div>
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSecondModal}
        onHide={() => setShowSecondModal(false)}
        className="new-order-modal"
      >
        <Modal.Header>
          <Modal.Title> New Order</Modal.Title>
          <button className="btn bg-transparent close-button">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => setShowSecondModal(false)}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Col md={6} sm={12}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
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
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* <Row className="mb-2">
            <Col>
              <Form.Group>
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                />
              </Form.Group>
              </Col>
            </Row> */}
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
                  <Form.Check
                    type="checkbox"
                    label="In Warranty"
                    name="inWarranty"
                    checked={formData.inWarranty}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Box Required from BATES"
                    name="boxRequired"
                    checked={formData.boxRequired}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            // onClick={handleCreateUser}
          >
            <div className="button-container">
              <span>Submit</span>
            </div>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewOrders;
