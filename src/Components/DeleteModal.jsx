import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { useEffect } from "react";

const DeleteUserModal = ({
  show,
  setShow,
  setRows,
  deleteId,
}) => {
const handleClose = ()=>{
    setShow(false)
}
const handleDeleteUser =async()=>{
    console.log(deleteId,"delete user");
    try {
        if(deleteId.length>0) {
          const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/deleteUser?userId=${deleteId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.status === 200) {
            setRows((prevRows) => prevRows.filter((row) => row._id !== deleteId));
        }
    }
    handleClose()
      } catch (error) {
        console.log(error, "Error");
      }
}
  return (
    <Modal show={show} onHide={handleClose} centered  className="delete-user-modal">
      {/* <Modal.Header>
        <Modal.Title>Delete User</Modal.Title>
        <button className="btn bg-transparent close-button">
          <i className="fa-solid text-25 fa-xmark" onClick={handleClose}></i>
        </button>
      </Modal.Header> */}
      <Modal.Body className="p-0">
       <h4 className="delete-modal-title">Are you sure?</h4>
       <p className="delete-modal-desc">You won't be able to revert this!</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center gap-2 border-0 pb-0">
        <button
          type="button"
          className="mr-1 btn btn-icon m-1 btn-sm delete-user-button"
          onClick={handleDeleteUser}
        >
          <div className="button-container">
            <span>Yes, delete it!</span>
          </div>
        </button>
        <button
          type="button"
          className="mr-1 btn btn-icon m-1 btn-sm cancel-user-button"
          onClick={handleClose}
        >
          <div className="button-container">
            <span>Cancel</span>
          </div>
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
