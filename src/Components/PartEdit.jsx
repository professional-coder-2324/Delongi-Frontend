import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "../Css/CallCenter.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import Logo from "../Assets/delonghi.svg";
import NewOrders, { SecondModal, ThirdModal } from "./NewOrders";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "./ModalContext";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { formatDate } from "./BoxShipment";
import ReceiveModals from "./ReceiveModals";
import BoxShipmentModals from "./BoxShipmentModal";
import RepairModals from "./RepairModal";

const PartEdit = ({ path }) => {

  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { openNewOrdersModal, showNewOrdersModal } = useModal();
 
  const [showCancel, setShowCancel] = useState(false);
  const [BoxShipmentModal, setBoxShipmentModal] = useState(false);
  const [ReceivingModal, setReceivingModal] = useState(false); 

  const [models] = useState(["Select Model", "Model A", "Model B", "Model C"]);
  
  const [RepairModal, setRepairModal] = useState(false);
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
  


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/part/getPart?partId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrderData(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error, "Error");
      }
    };
    fetchData();
  }, []);

 
  const handleStatusSubmit = async (status) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateOrderStatus`,
        {
          orderId: id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrderData(response.data.data);
      setLoading(false);
      navigate(`${path == "boxShipments" ? "/boxShipments" : "/orderStatus"}`);
    } catch (error) {
      setLoading(false);
      console.log(error, "Error");
    }
  };
    
  console.log(ReceivingModal, "Fsfffsdf");

  return (
    <>
      {loading && (
        <div className="spinner-container-component">
          <div className="spinner-component"></div>
        </div>
      )}
      {!loading && (
        <div>
          <button
            className="btn bg-transparent back-button d-flex align-items-center"
            style={{ fontSize: 16, fontWeight: 500, gap: 8, margin: "15px 0 " }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <i class="fa-solid fa-chevron-left" style={{ marginBottom: 2 }}></i>
            Back
          </button>
          <div className="text-center">
            <Form.Label style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
              Part Number
            </Form.Label>
            <p style={{ fontSize: 20, fontWeight: 900, marginBottom: 20 }}>
              {orderData?.partNumber}
            </p>
          </div>
        </div>
      )}
    
      </>
  );
};

export default PartEdit;
