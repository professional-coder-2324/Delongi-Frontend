import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Css/NewOrders.css";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useModal } from "./ModalContext";
import { useNavigate, useParams } from "react-router-dom";

const Refurbished = () => {
  const { openNewOrdersModal, showNewOrdersModal, closeNewOrdersModal } =
    useModal();

  const [showCaseModal, setShowCaseModal] = useState(true);
  const [caseNumber, setCaseNumber] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [excelData, setExcelData] = useState([]);
  // const [models, setModels] = useState(["Select Model"]);
  const [showConfirmReleasedModal, setShowConfirmReleasedModal] =
    useState(false);
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);
  const [formData, setFormData] = useState({
    model: "",
    serialNumber:"",
    retailerName:""
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/getExcleFiledata`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setExcelData(response.data.data);
        // setLoading(false)
      } catch (error) {
        // setLoading(false)
        console.log(error, "Error");
      }
    };
    fetchData();
  }, []);
  const [currentStep, setCurrentStep] = useState(1);

  console.log(currentStep, "currentStep");
  const handleNext = () => {
    if (currentStep === 1) {
      // Save data from the first modal
      setShowSecondModal(true);
      setShowCaseModal(false);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (
        formData.firstName.length <= 0 ||
        formData.lastName.length <= 0 ||
        formData.address.length <= 0 ||
        formData.city.length <= 0 ||
        formData.zipCode.length <= 0 ||
        formData.state.length <= 0 ||
        formData.phone.length <= 0 ||
        formData.email.length <= 0
      ) {
        setError("Please Enter All Details.");
      } else {
        // Save data from the second modal
        setShowThirdModal(true);
        setShowSecondModal(false);
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      if (
        formData.model?.length <= 0 ||
        formData.brand?.length <= 0 ||
        formData.category?.length <= 0 ||
        formData.serialNumber?.length <= 0 ||
        formData.retailerName?.length <= 0 ||
        formData.dateOfPurchase?.length <= 0 ||
        formData.defectReported?.length <= 0 ||
        formData.reasonCode?.length <= 0 ||
        formData.outOfWarranty?.length <= 0 
        // formData.boxRequired.length <= 0
      ) {
        setError("Please Enter All Details.");
      } else {
        // Save data from the second modal
        // setShowFinalModal(true);
        setShowFinalModal(true);
        setShowThirdModal(false);
        setCurrentStep(4);
      }
    } 
    // else if (currentStep === 4) {
    //   // Save data from the second modal
    //   setShowBATES(false);
    //   setShowConfirmModal(true);
    //   setShowFinalModal(false);
    //   setCurrentStep(5);
    // }
    else if (currentStep ===4) {
        setShowConfirmReleasedModal(true);
      setShowFinalModal(false);
    //   setCurrentStep(5);
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
  // const [models] = useState(["Select Model", "Model A", "Model B", "Model C"]);
  // const [categories] = useState({
  //   "Select Model": [""],
  //   "Model A": ["Category 1"],
  //   "Model B": ["Category 2"],
  //   "Model C": ["Category 3"],
  // });
  // const [brands] = useState({
  //   "Select Model": [""],
  //   "Model A": ["Brand 1"],
  //   "Model B": ["Brand 2"],
  //   "Model C": ["Brand 3"],
  // });
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
  const [models, setModels] = useState(["Select Model"]); // Include default value
const navigate = useNavigate()
  useEffect(() => {
    // Extract unique models from Excel data
    const uniqueModels = ["Select Model", ...new Set(excelData.map((item) => item.Model))];
    setModels(uniqueModels);
  }, [excelData]);


  const handleCloseCaseModal = () => {
    setShowCaseModal(false);
    setCurrentStep(1);
    setCaseNumber("");
  };

  const handleSubmit = async (orderStatus) => {
    setShowConfirmReleasedModal(false);
    setShowConfirmModal(false);
    if(formData.model.length == 0 || formData.serialNumber.length ==0|| formData.retailerName.length == 0) {
        setError("Fill All Fields")
        return 
    }
    // Add logic to handle form submission
    // formData contains the form data
    // You can send this data to your backend or perform any other actions

    const data = {
      ...formData,
      status: "refurbished",
      caseNumber: "REF" + caseNumber,
    };
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
        navigate("/refurbishedList")
      } catch (error) {
        console.log(error, "Error");


    console.log("Form Data:", data);
  };

}
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

  const handleModelChange = (selectedModel) => {
    // Fetch the selected row based on the chosen model
    const selectedRow = excelData.find((item) => item.Model === selectedModel);

    if (selectedRow) {
      const { Category, SAP, Brand } = selectedRow;
      setFormData({
        ...formData,
        model: selectedModel,
        // Other form fields remain unchanged
      });
    }
  };
  return (
    <div className="your-component">
     
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
              onClick={()=>{navigate("/refurbishedList")}}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="caseNumber">
              <Form.Label> Ticket Number</Form.Label>
              <Form.Control
                type="text"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                placeholder="Enter Ticket Number"
              />
            </Form.Group>
          </Form>
          <div className="text-center mt-3">
            <h5
              className=""
              style={{ color: "red", fontSize: 18, fontWeight: 700 }}
            >
              {error}
            </h5>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={async () => {
              try {
                if (caseNumber?.length <= 0) {
                  setError("Please enter a ticket number.");
                } else {
                  const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/getOrderByTrackingNo?trackingNumber=${caseNumber}&&value=2`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                  if (
                    response?.data?.data?.length == 0
                  ) {
                    handleNext();
                  } else {
                    setError(`Case Number ${caseNumber} is already in use.`);
                  }
                  // setLoading(false)
                }
              } catch (error) {
                // setLoading(false)
                console.log(error, "Error");
              }
            }}
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
        className=""
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title> Refurbished Order</Modal.Title>
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
              Ticket Number
            </Form.Label>
            <p style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
              REF {caseNumber}
            </p>
          </div>
          <div className="text-center mt-3">
            <h5
              className=""
              style={{ color: "red", fontSize: 18, fontWeight: 700 }}
            >
              {error}
            </h5>
          </div>
          <Form>
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
        <Col>
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
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Group>
            <Form.Label>Retailer Name</Form.Label>
            {/* <Form.Control
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
              ))} */}
            <Form.Control
              type="text"
              name="retailerName"
              value={formData.retailerName}
              onChange={handleChange}
              // disabled={disabled}
            />
            {/* </Form.Control> */}
          </Form.Group>
        </Col>
      </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start border-0">
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={handleSubmit}
          >
            <div className="button-container">
              <span>Submit</span>
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
          <div className="text-center mt-3">
            <h5
              className=""
              style={{ color: "red", fontSize: 18, fontWeight: 700 }}
            >
              {error}
            </h5>
          </div>
          <Form>
            {/* <ThirdModal
              formData={formData}
              handleChange={handleChange}
              handleModelChange={handleModelChange}
              models={models}
              setFormData={setFormData}
              retailerNames={retailerNames}
              reasonCodes={reasonCodes}
            /> */}
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
              className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
              onClick={() => handleSubmit("unreleased")}
              style={{ backgroundColor: "#dd3333" }}
            >
              <div className="button-container" style={{ fontSize: 12 }}>
                <span>
                  Release Order to <br /> Service Center LATER
                </span>
              </div>
            </button>
            <button
              type="button"
              className="mr-4 btn btn-icon m-1 btn-sm display-6 create-user-button"
              onClick={() => {
                setShowConfirmModal(false);
                setShowConfirmReleasedModal(true);
              }}
              style={{ backgroundColor: "green" }}
            >
              <div className="button-container" style={{ fontSize: 12 }}>
                <span>
                  Release Order to <br />
                  Service Center NOW
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
          <p style={{ textAlign: "center", fontSize: 17, fontWeight: 400 }}>
          The out of warranty item has been received
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

export default Refurbished;
