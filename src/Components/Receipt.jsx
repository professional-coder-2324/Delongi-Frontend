import { Col, Form, Row } from "react-bootstrap";
import Logo from "../Assets/delonghi.svg";
import "../Css/Receipt.css";
import { formatDate } from "./BoxShipment";
import { useState } from "react";
const Receipt = () => {
  const [formData, setFormData] = useState({
    electricTest: true,
    coffeeTest: false,
    cappuccinoTest: false,
    systemTest: true,
    coffeeTemp: null,
    milkTemp: null,
  });
  return (
    <div className="container">
      <div
        className=" d-flex flex-column justify-content-between w-75"
        style={{ gap: 10 }}
      >
        <div
          className="d-flex justify-conter-between align-items-center"
          style={{ gap: 45 }}
        >
          <div>
            <img src={Logo} style={{ width: 150 }} />
          </div>
          <div className="w-100">
            <h1 className="font-weight-bold">REPAIR DATA SHEET</h1>
            <div className="my-3 d-flex" style={{ gap: 20 }}>
              <div className="text-center">
                <Form.Label className="label-detais">
                  Admittance Date
                </Form.Label>
                <p className="mx-auto details-value">
                  {/* {formatDate(date)} */}
                  2/17/2023
                </p>
              </div>
              {/* <div className="vl"></div> */}

              <div className="text-center">
                <Form.Label className="label-detais">Technician</Form.Label>
                <p className="mx-auto details-value">
                  {/* {orderData?.receiveShipements?.model} */}
                  REYA
                </p>
              </div>
              {/* <div className="vl"></div> */}
              <div className="text-center">
                <Form.Label className="label-detais">Case Number</Form.Label>
                <p className="mx-auto details-value">
                  {/* {orderData?.receiveShipements?.serialNumber} */}
                  OOW-0098486
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex" style={{ gap: 10 }}>
          <div className="text-center border border-dark w-100 ">
            <Form.Label className="label-detais">MODEL</Form.Label>
            <p className="label-detais">EC9935M</p>
          </div>
          <div className="text-center border border-dark w-100">
            <Form.Label className="label-detais">SERIAL NUMBER</Form.Label>
            <p className="label-detais">2131151123156415115541</p>
          </div>
        </div>
        <div className="d-flex" style={{ gap: 10 }}>
          <div className="text-center border border-dark w-100 ">
            <Form.Label className="label-detais">NR. COFFEE</Form.Label>
            <p className="label-detais">1</p>
          </div>
          <div className="text-center border border-dark w-100">
            <Form.Label className="label-detais">NR. DESCALE</Form.Label>
            <p className="label-detais">2</p>
          </div>
          <div className="text-center border border-dark w-100">
            <Form.Label className="label-detais">NR. CAPPUCINI</Form.Label>
            <p className="label-detais">1</p>
          </div>
          <div className="text-center border border-dark w-100">
            <Form.Label className="label-detais">
              NR. LITERS OF WATER
            </Form.Label>
            <p className="label-detais">10</p>
          </div>
        </div>
        <div>
          <h6 className="p-1 w-100 bg-dark text-white text-center">
            INFORMATION FROM CUSTOMER
          </h6>
          <div className="information">
            <div className="details-info">
              <label className="m-0 font-weight-normal">Name:</label>
              <p className="m-0 font-weight-bold">JOSHEPH CHANG</p>
            </div>
            <div className="details-info">
              <label className="m-0 font-weight-normal">Phone:</label>
              <p className="m-0 font-weight-bold">(714) 728-6337</p>
            </div>
          </div>
          <div className="information mt-2">
            <div className="details-info">
              <label className="m-0 font-weight-normal">Address:</label>
              <p className="m-0 font-weight-bold">3 ICEBERG ROSE</p>
            </div>
            <div className="details-info">
              <label className="m-0 font-weight-normal">Email:</label>
              <p className="m-0 font-weight-bold">test@gmail.com</p>
            </div>
          </div>
          <div className="information mt-2">
            <div className="details-info">
              <label className="m-0 font-weight-normal">City:</label>
              <p className="m-0 font-weight-bold">IRVINE</p>
            </div>
            <div className="details-info">
              <label className="m-0 font-weight-normal">Zip Code:</label>
              <p className="m-0 font-weight-bold">92620</p>
            </div>
            <div className="details-info">
              <label className="m-0 font-weight-normal">State:</label>
              <p className="m-0 font-weight-bold">CA</p>
            </div>
          </div>
          <div className="information mt-2">
            <div className="w-100">
              <label className="m-0 font-weight-normal">Customer Claim:</label>
              <p
                className="m-0 font-weight-bold border border-dark p-2"
                style={{ height: 120 }}
              >
                leaking
              </p>
            </div>
          </div>
        </div>
        <div>
          <h6 className="p-1 w-100 bg-dark text-white text-center">
            TESTING RESULTS
          </h6>
          <Row className="my-0">
            <Col>
              <Form.Group className="form-group-details">
                <Form.Label className="font-weight-bold m-0">
                  Electic Test
                </Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: 12, pointerEvents: "none" }}
                >
                  <Form.Check
                    type="radio"
                    label="OK"
                    name="electricTest"
                    value={true}
                    checked={formData.electricTest === true}
                  />
                  <Form.Check
                    type="radio"
                    label="NG"
                    name="electricTest"
                    value={false}
                    checked={formData.electricTest === false}
                  />
                </div>
              </Form.Group>
              <Form.Group className="form-group-details">
                <Form.Label className="font-weight-bold m-0">
                  Coffee Test
                </Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: 12, pointerEvents: "none" }}
                >
                  <Form.Check
                    type="radio"
                    label="OK"
                    name="coffeeTest"
                    value={true}
                    checked={formData.coffeeTest === true}
                  />
                  <Form.Check
                    type="radio"
                    label="NG"
                    name="coffeeTest"
                    value={false}
                    checked={formData.coffeeTest === false}
                  />
                </div>
              </Form.Group>
              <Form.Group className="form-group-details">
                <Form.Label className="font-weight-bold m-0">
                  Cappuccino Test
                </Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: 12, pointerEvents: "none" }}
                >
                  <Form.Check
                    type="radio"
                    label="OK"
                    name="cappuccinoTest"
                    value={true}
                    checked={formData.cappuccinoTest === true}
                  />
                  <Form.Check
                    type="radio"
                    label="NG"
                    name="cappuccinoTest"
                    value={false}
                    checked={formData.cappuccinoTest === false}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="form-group-details">
                <Form.Label className="font-weight-bold m-0">
                  System Test Result
                </Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: 12, pointerEvents: "none" }}
                >
                  <Form.Check
                    type="radio"
                    label="OK"
                    name="systemTest"
                    value={true}
                    checked={formData.systemTest === true}
                  />
                  <Form.Check
                    type="radio"
                    label="NG"
                    name="systemTest"
                    value={false}
                    checked={formData.systemTest === false}
                  />
                </div>
              </Form.Group>
              <Form.Group className="form-group-details">
                <Form.Label className="font-weight-bold m-0">
                  Coffee Temprature
                </Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ width: "20%", gap: 10 }}
                >
                  56 &#176;F
                </div>
              </Form.Group>
              <Form.Group className="form-group-details">
                <Form.Label className="font-weight-bold m-0">
                  Milk Temprature
                </Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ width: "20%", gap: 10 }}
                >
                  10 &#176;F
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex mt-3" style={{ gap: 10 }}>
            <div className="text-center border border-dark w-25">
              <Form.Label className="label-detais">DATE OF REPAIR</Form.Label>
              <p className="label-detais">7/27/2023</p>
            </div>
            <div className="text-center border border-dark w-25">
              <Form.Label className="label-detais">DATE OF SHIPPING</Form.Label>
              <p className="label-detais"></p>
            </div>
            <div className="text-center border border-dark w-50">
              <Form.Label className="label-detais">TRACKING</Form.Label>
              <p className="label-detais"></p>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex gap-3">
            <div className="w-100">
              <h6 className="p-1 w-100 bg-dark text-white text-center">
                DEFECT FOUND
              </h6>
              <div className="text-center d-flex justify-content-center">
                <Form.Label className="label-detais font-weight-normal" style={{width:"40%"}}>Repair Code 1:</Form.Label>
                <p className="label-detais text-left"  style={{width:"40%"}}>121212121213</p>
              </div>
              <div className="text-center d-flex justify-content-center">
              <Form.Label className="label-detais font-weight-normal" style={{width:"40%"}}>Repair Code 2:</Form.Label>
              <p className="label-detais text-left"  style={{width:"40%"}}>1212548413</p>
              </div>
              <div className="text-center d-flex justify-content-center">
              <Form.Label className="label-detais font-weight-normal" style={{width:"40%"}}>Repair Code 3:</Form.Label>
              <p className="label-detais text-left"  style={{width:"40%"}}>128798748</p>
              </div>
            </div>
            <div className="w-100">
              <h6 className="p-1 w-100 bg-dark text-white text-center">
                PARTS REPLACED
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Receipt;
