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
  const ButtonForUnReleased = ({orderData,setShowCancel,setBoxShipmentModal,openNewOrdersModal, isFlex = false,setShowConfirmReleasedModal})=>{
    return(
      orderData.status == "unreleased" && (
        <div className={`d-flex ${isFlex? "justify-content-end p-4":"my-4"}`}>
          <div
            className="new-order-box"
            onClick={() => setShowCancel(true)}
          >
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
                Cancel <br /> Order
              </span>
            </a>
          </div>
          <div
            className="new-order-box"
            onClick={() => setShowConfirmReleasedModal(true)}
          >
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
                Release <br /> Order
              </span>
            </a>
          </div>
          <div
            className="new-order-box"
            onClick={() => openNewOrdersModal()}
          >
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
                Edit <br /> Order
              </span>
            </a>
          </div>
        </div>
      )
    )
  }
  const OrderStatusDetails = ({ path }) => {

    const [orderData, setOrderData] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { openNewOrdersModal, showNewOrdersModal } = useModal();
    const [showConfirmReleasedModal, setShowConfirmReleasedModal] =
    useState(false);
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
            `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/getOneOrder?orderId=${id}`,
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

    const handleSubmit = async () => {
      setShowConfirmReleasedModal(false);
      // Add logic to handle form submission
      // formData contains the form data
      // You can send this data to your backend or perform any other actions
  
      const data = {
        ...orderData,
        status: "released",
        caseNumber: orderData.caseNumber,
      };
      if (id) {
        data.orderId = id;
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
          window.location.reload();
        } catch (error) {
          console.log(error, "Error");
        }
      }
  
      console.log("Form Data:", data);
    };
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
            <ButtonForUnReleased orderData={orderData} openNewOrdersModal={openNewOrdersModal} setBoxShipmentModal={setBoxShipmentModal} setShowCancel={setShowCancel} isFlex={true} setShowConfirmReleasedModal={setShowConfirmReleasedModal}/>
            <div className="text-center">
              <Form.Label style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
                Case Number
              </Form.Label>
              <p style={{ fontSize: 20, fontWeight: 900, marginBottom: 20 }}>
                {orderData?.caseNumber}
              </p>
            </div>
            <SecondModal formData={orderData} disabled={true} />
            <ThirdModal
              formData={orderData}
              disabled={true}
              models={models}
              retailerNames={retailerNames}
              reasonCodes={reasonCodes}
            />
        <ButtonForUnReleased orderData={orderData} openNewOrdersModal={openNewOrdersModal} setBoxShipmentModal={setBoxShipmentModal} setShowCancel={setShowCancel} setShowConfirmReleasedModal={setShowConfirmReleasedModal}/>
            {path == "boxShipments" && (
              <div className="d-flex mt-4">
                <div
                  className="new-order-box"
                  onClick={() => navigate("/boxShipments")}
                >
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
                      Exit Without <br /> Updating
                    </span>
                  </a>
                </div>
                <div
                  className="new-order-box"
                  onClick={() => setBoxShipmentModal(true)}
                >
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
                      Process <br /> Shipment Details
                    </span>
                  </a>
                </div>
              </div>
            )}
            {path == "receiving" && orderData.status == "boxShipped" && (
              <div className="d-flex mt-4">
                <div
                  className="new-order-box"
                  onClick={() => navigate("/receiving")}
                >
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
                      Exit Without <br /> Updating
                    </span>
                  </a>
                </div>
                <div
                  className="new-order-box"
                  onClick={() => setReceivingModal(true)}
                >
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
                      Process <br /> Receiving Details
                    </span>
                  </a>
                </div>
              </div>
            )}
            {path == "repairs" && orderData.status == "received" && (
              <div className="d-flex mt-4">
                <div
                  className="new-order-box"
                  onClick={() => navigate("/repairs")}
                >
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
                      Exit Without <br /> Updating
                    </span>
                  </a>
                </div>
                <div
                  className="new-order-box"
                  onClick={() => setRepairModal(true)}
                >
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
                      Process <br /> Repairs Details
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
        {orderData && showNewOrdersModal && (
          <NewOrders orderData={orderData} key={showNewOrdersModal} />
        )}
        {ReceivingModal && <ReceiveModals orderData={orderData} setOrderData={setOrderData} id={id} setLoading={setLoading} ReceivingModal={ReceivingModal} setReceivingModal={setReceivingModal} />}
        <Modal
          show={showCancel}
          onHide={() => setShowCancel(false)}
          className="confirm-status-modal"
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Cancel Confirmation</Modal.Title>
            <button className="btn bg-transparent close-button p-0">
              <i
                className="fa-solid text-25 fa-xmark"
                onClick={() => {
                  setShowCancel(false);
                }}
              ></i>
            </button>
          </Modal.Header>
          <Modal.Body>
            <p style={{ textAlign: "left", fontSize: 17, fontWeight: 400 }}>
              This will cancel your order
            </p>
            <button
              type="button"
              className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
              onClick={() => handleStatusSubmit("cancel")}
            >
              <div className="button-container" style={{ fontSize: 12 }}>
                <span>Confirm</span>
              </div>
            </button>
          </Modal.Body>
        </Modal>
        {BoxShipmentModal && <BoxShipmentModals orderData={orderData} BoxShipmentModal={BoxShipmentModal} setBoxShipmentModal={setBoxShipmentModal} setLoading={setLoading} />}
      
        {RepairModal && <RepairModals orderData={orderData} RepairModal={RepairModal} setRepairModal={setRepairModal} setLoading={setLoading}/>}
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
      </>
    );
  };

  export default OrderStatusDetails;
