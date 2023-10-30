import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "../Css/CallCenter.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import Logo from "../Assets/logo.png";
import NewOrders, { SecondModal, ThirdModal } from "./NewOrders";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "./ModalContext";
import { Modal } from "react-bootstrap";

const OrderStatusDetails = () => {
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams()
  const navigate = useNavigate()
  const { openNewOrdersModal, showNewOrdersModal} = useModal();
  const [showReleased,setShowRealeased] = useState(false)
  const [showCancel,setShowCancel] = useState(false)
  const [models] = useState(["Select Model", "Model A", "Model B", "Model C"]);
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
  console.log("idddd", orderData);

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

  const handleStatusSubmit =async (status)=>{
    try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/callcenter/updateOrderStatus`,{
            orderId:id,
            status:status
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrderData(response.data.data);
        setLoading(false);
        navigate('/orderStatus')
      } catch (error) {
        setLoading(false);
        console.log(error, "Error");
      }
  }

  return (
    <>
      {loading && (
        <div className="spinner-container-component">
          <div className="spinner-component"></div>
        </div>
      )}
      {!loading && (
        <div>
          <SecondModal formData={orderData} disabled={true} />
          <ThirdModal
            formData={orderData}
            disabled={true}
            models={models}
            retailerNames={retailerNames}
            reasonCodes={reasonCodes}
          />
         {orderData.status == "unreleased" && <div className="d-flex mt-4">
            <div className="new-order-box" onClick={()=>setShowCancel(true)}>
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
            <div className="new-order-box" onClick={()=>setShowRealeased(true)}>
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
                  Released <br /> Order
                </span>
              </a>
            </div>
            <div className="new-order-box" onClick={() => openNewOrdersModal()}>
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
          </div>}
        </div>

      )}
       {orderData && showNewOrdersModal && (
        <NewOrders
          orderData={orderData}
          key={showNewOrdersModal}
        />
      )}
      <Modal
        show={showCancel}
        onHide={() => setShowCancel(false)}
        className="confirm-status-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Cancel Confirmation</Modal.Title>
          <button className="btn bg-transparent close-button">
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
      <Modal
        show={showReleased}
        onHide={() => setShowRealeased(false)}
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
                setShowRealeased(false);
              }}
            ></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <p style={{ textAlign: "left", fontSize: 17, fontWeight: 400 }}>
            Release Box Picking Order to Service Center
          </p>
          <button
            type="button"
            className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
            onClick={() => handleStatusSubmit("released")}
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
