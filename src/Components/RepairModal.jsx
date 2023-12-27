import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { formatDate } from "./BoxShipment";
import { MDBDataTable } from "mdbreact";

const RepairModals = ({
  orderData,
  id,
  setOrderData,
  setLoading,
  RepairModal,
  setRepairModal,
  setStatus,
  parts
}) => {
  console.log(orderData, "orderrrr");
  const [Repair, setRepair] = useState(RepairModal);
  const [additionalRepair, setAdditionalRepair] = useState(false);
  const [inputParts, setInputParts] = useState(false);
  const [partNo, setPartNo] = useState("");
  const [error, setError] = useState("");
  const [qty, setQty] = useState(null);
  const [repairCode, setRepairCode] = useState("");
  // const[materialGroup, setMaterialGroup] = useState("")
  const date = new Date();
  const [inputPartRows, setInputPartRows] = useState([]);
  const [confirmParts, setConfirmParts] = useState(false);
  const [partEdit, setPartEdit] = useState();
  const [showTrash, setShowTrash] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);
  const [formData, setFormData] = useState({
    noOfcoffee: null,
    noOfdescale: null,
    noOfCappucini: null,
    noOfliters: null,
    technician: "",
    electricTest: "",
    coffeeTest: "",
    cappuccinoTest: "",
    systemTest: "",
    coffeeTemp: null,
    milkTemp: null,
    isTrashed: false,
    repairComment: "",
    repairCode: "",
    materialGroup: "",
  });
  const [checkedItems, setCheckedItems] = useState({});
  const [verifiedData, setVerifiedData] = useState([]);

  const [isDelete, setIsDelete] = useState(false);
  const [RepairCode] = useState([
    "Select Repair Code",
    "Repair Code 1",
    "Repair Code 2",
    "Repair Code 3",
  ]);
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(type, value, checked, "Fdfdfdf");
    if (type === "checkbox" || type === "radio") {
      if (name === "isTrashed" && checked) {
        if (inputPartRows.length > 0) {
          // Show an alert since there are parts present
          setShowTrash(true);
          return; // Stop further execution
        }
      }
      // Handle checkboxes and radio buttons
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value === "true",
      }));
    } else {
      // Handle other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: type == "number" ? Number(value) : value,
      }));
    }
  };
  console.log(formData, inputPartRows, "Dsasdasgrfhg");
  const handleInputPart = async () => {
    if (partNo.length === 0 || qty === null) {
      setError("Fill all the values");
      return;
    }
    if (qty < 1) {
      setError("Quantity must be at least one");
      return;
    }

    try {
      console.log(partNo,"dssdsdsds");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/part/getPartsBySearch?searchValue=${partNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = response.data.data;
      result[0].quantity = qty;

      const existingPartIndex = inputPartRows.findIndex(
        (row) => row.partNumber === result[0].partNumber
      );

      if (existingPartIndex !== -1) {
        console.log(partEdit, "paerrr");
        // If part already exists
        if (partEdit._id) {
          // If isEdit is true, replace the quantity
          const updatedInputPartRows = [...inputPartRows];
          updatedInputPartRows[existingPartIndex].quantity = qty;
          setInputPartRows(updatedInputPartRows);
        } else {
          // If isEdit is false, add to the existing quantity
          inputPartRows[existingPartIndex].quantity += qty;
          setInputPartRows([...inputPartRows]);
        }
      } else {
        // If part doesn't exist, add a new entry
        setInputPartRows([...inputPartRows, result[0]]);
      }

      setLoading(false);
      setInputParts(false);
      setPartNo("");
      setQty(null);
    } catch (error) {
      setLoading(false);
      console.log(error, "Error");
    }
  };

  const handleStatusSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateTrashedOrder`,
        {
          orderId: orderData.id,
          status: "trashed",
          repair: {
            repairCode: formData.repairCode,
            repairComment: formData.repairComment,
            materialGroup: formData.materialGroup,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setAdditionalRepair(false);
    } catch (error) {
      setLoading(false);
      console.log(error, "Error");
    }
  };
  const handleDeletePart = () => {
    const updatedInputPartRows = inputPartRows.filter(
      (row) => row._id !== deleteId
    );
    setInputPartRows(updatedInputPartRows);
    setIsDelete(false);
  };
  console.log(partEdit, "DFfdfdsfdf");
  const data = {
    columns: [
      {
        label: "Part No",
        field: "partNumber",
        sort: "asc",
        width: 200,
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 100,
      },
      {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "actions",
        sort: "none",
        width: 100,
        className: "process-column",
      },
    ],

    rows: inputPartRows.map((userData, index) => ({
      ...userData,
      actions: (
        <div>
          <button
            className="edit-button-parts border"
            onClick={() => {
              // handleShow();
              setInputParts(true);
              setPartNo(userData.partNumber);
              setQty(userData.quantity);
              setPartEdit(userData);
              // console.log(userData, "userrr");
            }}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button
            className="delete-button-parts border"
            onClick={() => {
              setDeleteId(userData._id);
              setIsDelete(true);
              // setShowDeleteModal(true);
              // setDeleteId(userData.id);
            }}
          >
            <i className="fa-solid text-25 fa-trash"></i>
          </button>
        </div>
      ),
    })),
  };
  const confirmData = {
    columns: [
      {
        label: "Part No",
        field: "partNumber",
        sort: "asc",
        width: 200,
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 100,
      },
      {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "actions",
        sort: "none",
        width: 100,
        className: "process-column",
      },
    ],

    rows: inputPartRows.map((userData, index) => ({
      ...userData,
      actions: (
        <div>
          <label className="d-flex align-items-center" style={{ gap: 8 }}>
            <input
              type="radio"
              name={`action-${index}`}
              checked={checkedItems[`verified-${index}`]}
              onChange={() => handleActionChange(`verified-${index}`)}
            />
            VERIFIED - Part is Correct
          </label>
          <label className="d-flex align-items-center" style={{ gap: 8 }}>
            <input
              type="radio"
              name={`action-${index}`}
              checked={checkedItems[`error-${index}`]}
              onChange={() => handleActionChange(`error-${index}`)}
            />
            ERROR - Remove from List
          </label>
        </div>
      ),
    })),
  };
  const handleActionChange = (name) => {
    const [actionType, index] = name.split("-");
    const dataIndex = parseInt(index);
    const updatedCheckedItems = { ...checkedItems };

    // Uncheck the other action type
    if (actionType === "verified") {
      updatedCheckedItems[`error-${index}`] = false;
    } else if (actionType === "error") {
      updatedCheckedItems[`verified-${index}`] = false;
    }

    updatedCheckedItems[name] = !updatedCheckedItems[name];
    setCheckedItems(updatedCheckedItems);

    if (actionType === "verified" && updatedCheckedItems[name]) {
      setVerifiedData([...verifiedData, inputPartRows[dataIndex]]);
    }
  };

  // Function to get the data of verified items when needed
  const getVerifiedData = () => {
    const verifiedRows = inputPartRows.filter(
      (_, index) => checkedItems[`verified-${index}`]
    );
    return verifiedRows;
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateRepairOrder`,
        {
          orderId: id,
          status: "repaired",
          repair: formData,
          parts: verifiedData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setConfirmParts(false);
      setAdditionalRepair(false);
      setRepair(false);
      // setOrderData(response.data.data);
      setLoading(false);
      // navigate(`${path == "boxShipments" ? "/boxShipments" : "/orderStatus"}`);
    } catch (error) {
      setLoading(false);
      console.log(error, "Error");
    }
  };

  console.log(getVerifiedData(), "fddfhdgfhdhbnju");
  return (
    <>
      <Modal
        show={Repair}
        onHide={() => setRepair(false)}
        className="confirm-status-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Repair Information</Modal.Title>
          <button className="btn bg-transparent close-button p-0">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setRepair(false);
                setRepairModal(false);
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
          <div className="my-3">
            <div
              className="text-center border border-dark border-bottom-0"
              style={{ marginLeft: "18%", width: "64%" }}
            >
              <Form.Label style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>
                ADMITTANCE DATE
              </Form.Label>
              <p style={{ fontSize: 17, fontWeight: 900, marginBottom: 0 }}>
                {formatDate(date)}
              </p>
            </div>
            {/* <div className="vl"></div> */}

            <div
              className="text-center border border-dark border-bottom-0"
              style={{ marginLeft: "18%", width: "64%" }}
            >
              <Form.Label style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>
                MODEL
              </Form.Label>
              <p style={{ fontSize: 17, fontWeight: 900, marginBottom: 0 }}>
                {orderData?.receiveShipements?.model}
              </p>
            </div>
            {/* <div className="vl"></div> */}
            <div
              className="text-center border border-dark"
              style={{ marginLeft: "18%", width: "64%" }}
            >
              <Form.Label style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>
                SERIAL NUMBER
              </Form.Label>
              <p style={{ fontSize: 17, fontWeight: 900, marginBottom: 0 }}>
                {orderData?.receiveShipements?.serialNumber}
              </p>
            </div>
          </div>
          <Row className="my-3">
            <Col>
              <Form.Group style={{ width: "75%", marginLeft: "12.5%" }}>
                <Form.Label className="font-weight-bold">Technician</Form.Label>
                <Form.Control
                  type="text"
                  name="technician"
                  value={formData.technician}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group
                className="d-flex align-items-center justify-content-between my-2"
                style={{ width: "60%", marginLeft: "20%" }}
              >
                <Form.Label className="font-weight-bold m-0">
                  Number of Coffee
                </Form.Label>
                <Form.Control
                  type="number"
                  className="text-center"
                  name="noOfcoffee"
                  style={{ width: "18%", padding: 7 }}
                  value={formData.noOfcoffee}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="d-flex align-items-center justify-content-between my-2"
                style={{ width: "60%", marginLeft: "20%" }}
              >
                <Form.Label className="font-weight-bold m-0">
                  Number of Descale
                </Form.Label>
                <Form.Control
                  type="number"
                  className="text-center"
                  name="noOfdescale"
                  style={{ width: "18%", padding: 7 }}
                  value={formData.noOfdescale}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="d-flex align-items-center justify-content-between my-2"
                style={{ width: "60%", marginLeft: "20%" }}
              >
                <Form.Label className="font-weight-bold m-0">
                  Number of Cappucini
                </Form.Label>
                <Form.Control
                  className="text-center"
                  type="number"
                  name="noOfCappucini"
                  style={{ width: "18%", padding: 7 }}
                  value={formData.noOfCappucini}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="d-flex align-items-center justify-content-between my-2"
                style={{ width: "60%", marginLeft: "20%" }}
              >
                <Form.Label className="font-weight-bold m-0">
                  Number of Liters of Water
                </Form.Label>
                <Form.Control
                  type="number"
                  className="text-center"
                  name="noOfliters"
                  style={{ width: "18%", padding: 7 }}
                  value={formData.noOfliters}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <br></br>
          <Row className="my-0">
            <Col>
              <Form.Group
                className="d-flex align-items-center justify-content-between"
                style={{ width: "60%", marginLeft: "20%", marginBottom: 16 }}
              >
                <Form.Label className="font-weight-bold m-0">
                  Electic Test
                </Form.Label>
                <div className="d-flex align-items-center" style={{ gap: 12 }}>
                  <Form.Check
                    type="radio"
                    label="OK"
                    name="electricTest"
                    value={true}
                    checked={formData.electricTest === true}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="NG"
                    name="electricTest"
                    value={false}
                    checked={formData.electricTest === false}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="d-flex align-items-center justify-content-between "
                style={{ width: "60%", marginLeft: "20%", marginBottom: 16 }}
              >
                <Form.Label className="font-weight-bold m-0">
                  Coffee Test
                </Form.Label>
                <div className="d-flex align-items-center" style={{ gap: 12 }}>
                  <Form.Check
                    type="radio"
                    label="OK"
                    name="coffeeTest"
                    value={true}
                    checked={formData.coffeeTest === true}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="NG"
                    name="coffeeTest"
                    value={false}
                    checked={formData.coffeeTest === false}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="d-flex align-items-center justify-content-between"
                style={{ width: "60%", marginLeft: "20%", marginBottom: 16 }}
              >
                <Form.Label className="font-weight-bold m-0">
                  Cappuccino Test
                </Form.Label>
                <div className="d-flex align-items-center" style={{ gap: 12 }}>
                  <Form.Check
                    type="radio"
                    label="OK"
                    name="cappuccinoTest"
                    value={true}
                    checked={formData.cappuccinoTest === true}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="NG"
                    name="cappuccinoTest"
                    value={false}
                    checked={formData.cappuccinoTest === false}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="d-flex align-items-center justify-content-between"
                style={{ width: "60%", marginLeft: "20%", marginBottom: 14 }}
              >
                <Form.Label className="font-weight-bold m-0">
                  System Test Result
                </Form.Label>
                <div className="d-flex align-items-center" style={{ gap: 12 }}>
                  <Form.Check
                    type="radio"
                    label="OK"
                    name="systemTest"
                    value={true}
                    checked={formData.systemTest === true}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="NG"
                    name="systemTest"
                    value={false}
                    checked={formData.systemTest === false}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="d-flex align-items-center justify-content-between mb-2"
                style={{ width: "60%", marginLeft: "20%" }}
              >
                <Form.Label className="font-weight-bold m-0">
                  Coffee Temprature
                </Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ width: "26%", gap: 10 }}
                >
                  <Form.Control
                    type="number"
                    className="text-center"
                    name="coffeeTemp"
                    value={formData.coffeeTemp || ""}
                    onChange={handleChange}
                  />
                  &#176;F
                </div>
              </Form.Group>
              <Form.Group
                className="d-flex align-items-center justify-content-between my-2"
                style={{ width: "60%", marginLeft: "20%" }}
              >
                <Form.Label className="font-weight-bold m-0">
                  Milk Temprature
                </Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ width: "26%", gap: 10 }}
                >
                  <Form.Control
                    type="number"
                    className="text-center"
                    name="milkTemp"
                    value={formData.milkTemp || ""}
                    onChange={handleChange}
                  />
                  &#176;F
                </div>
              </Form.Group>
            </Col>
          </Row>

          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={() => {
              setRepair(false);
              setAdditionalRepair(true);
            }}
          >
            <div className="button-container" style={{ fontSize: 12 }}>
              <span>Confirm</span>
            </div>
          </button>
        </Modal.Body>
      </Modal>
      <Modal
        show={additionalRepair}
        onHide={() => setAdditionalRepair(false)}
        className="confirm-status-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Repair Information</Modal.Title>
          <button className="btn bg-transparent close-button p-0">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setAdditionalRepair(false);
                setRepair(true);
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
          <Form.Group className="d-flex justify-content-end mt-1 mr-3">
            <Form.Check
              type="checkbox"
              name="isTrashed"
              checked={formData.isTrashed}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <Form.Label className="font-weight-bold m-0 ml-1">Trash</Form.Label>
          </Form.Group>
          <Row className="my-3">
            <Col>
              <Form.Group>
                <Form.Label>Repair Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="repairComment"
                  value={formData.repairComment}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Group
                className="d-flex align-items-center justify-content-center"
                style={{ gap: 20 }}
              >
                <Form.Label className="m-0" style={{ width: "40%" }}>
                  Material Group
                </Form.Label>
                <Form.Control
                  type="text"
                  name="materialGroup"
                  value={formData.materialGroup}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Group
                className="d-flex align-items-center justify-content-center"
                style={{ gap: 25 }}
              >
                <Form.Label className="m-0" style={{ width: "40%" }}>
                  Repair Code 1
                </Form.Label>
                <Form.Control
                  as="select"
                  name="repairCode"
                  value={formData.repairCode}
                  onChange={handleChange}
                  // style={{width:"60%"}}
                >
                  {RepairCode.map((name, index) => (
                    <option value={name} key={index}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12} className="text-right">
              <button
                type="button"
                className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
                onClick={() => {
                  // setBoxShipmentModal(false);
                  setInputParts(true);
                  setPartEdit({});
                }}
                disabled={formData.isTrashed}
              >
                <div className="button-container" style={{ fontSize: 12 }}>
                  <span>Input Parts</span>
                </div>
              </button>
            </Col>
          </Row>
          {inputPartRows.length > 0 && (
            <MDBDataTable
              data={data}
              noBottomColumns
              className="input-parts-table"
            />
          )}
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={() => {
              if (formData.isTrashed) {
                handleStatusSubmit();
              } else {
                setConfirmParts(true);
                setAdditionalRepair(false);
              }
            }}
          >
            <div className="button-container" style={{ fontSize: 12 }}>
              <span>Confirm</span>
            </div>
          </button>
        </Modal.Body>
      </Modal>
      <Modal
        show={inputParts}
        onHide={() => setInputParts(false)}
        className="case-number-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Search Selection</Modal.Title>
          <button className="btn bg-transparent close-button">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setInputParts(false);
                // setInputParts(true);
              }}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="partNO">
              <Form.Label>Part No or Description</Form.Label>
              <Form.Control
                as="select"
                value={partNo}
                onChange={(e) => setPartNo(e.target.value)}
              >
                <option value="">Select Part No or Description</option>
                {parts.map((data)=>
                <option value={data.partNumber}>{
                  data.partNumber + " - " + data.description
                }</option>
              )}
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="qty" className="mt-3">
              <Form.Label>Quanitity</Form.Label>
              <Form.Control
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
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
        <Modal.Footer className="d-flex justify-content-between border-0">
          <div>
            <button
              type="button"
              className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
              onClick={handleInputPart}
            >
              <div className="button-container">
                <span>Submit</span>
              </div>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={confirmParts}
        onHide={() => setConfirmParts(false)}
        className="confirm-part-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Confirmation Parts</Modal.Title>
          <button className="btn bg-transparent close-button">
            <i
              className="fa-solid text-25 fa-xmark"
              onClick={() => {
                setConfirmParts(false);
                setAdditionalRepair(true);
              }}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontWeight: 400 }}>
            * Parts selections must be verified so that Stock Quantities can be
            adjusted correctly.{" "}
          </p>
          <h6 style={{ fontWeight: 600 }}>PLEASE VERIFY EACH ITEM SELECTED:</h6>
          {inputPartRows.length > 0 && (
            <MDBDataTable
              data={confirmData}
              noBottomColumns
              className="confirm-parts-table"
            />
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between border-0">
          <div>
            <button
              type="button"
              className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
              onClick={handleSubmit}
            >
              <div className="button-container">
                <span>Submit</span>
              </div>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={isDelete}
        onHide={() => setIsDelete(false)}
        className="delete-user-modal"
      >
        {/* <Modal.Header>
        <Modal.Title>Delete User</Modal.Title>
        <button className="btn bg-transparent close-button">
          <i className="fa-solid text-25 fa-xmark" onClick={handleClose}></i>
        </button>
      </Modal.Header> */}
        <Modal.Body className="p-0">
          <h4 className="delete-modal-title">
            Are you sure to remove this part?
          </h4>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center align-items-center gap-2 border-0 pb-0">
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm delete-user-button"
            onClick={handleDeletePart}
          >
            <div className="button-container">
              <span>Yes, delete it!</span>
            </div>
          </button>
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm cancel-user-button"
            onClick={() => setIsDelete(false)}
          >
            <div className="button-container">
              <span>Cancel</span>
            </div>
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showTrash}
        onHide={() => setShowTrash(false)}
        className="delete-user-modal"
      >
        <Modal.Body className="p-0">
          <h4 className="delete-modal-title">
            For Trash, You have to remove all the parts
          </h4>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center align-items-center gap-2 border-0 pb-0">
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm delete-user-button"
            onClick={() => setShowTrash(false)}
          >
            <div className="button-container">
              <span>OK, got it!</span>
            </div>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default RepairModals;
