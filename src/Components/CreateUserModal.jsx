import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";

const CreateUserModal = ({ show, handleClose, user,setRows,rows }) => {
  console.log(user, "userrr");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  const handleCreateUser = async () => {
    // You can perform any necessary validation here before calling handleCreate
    // For example, check if required fields are filled.
    if (firstName && lastName && username && password && department) {
        const userData = {
            firstName,
            lastName,
            username,
            password,
            role:department ,
            department: selectedOptions.map((role) => role._id), // Extract _id values from selected roles
          };
          try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createUser`, userData,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const newUser = response.data.data
            setRows((prevRows) => [newUser,...prevRows]);
          } catch (error) {
            console.log(error, 'Error');
          }
          handleClose();
    } else {
      // Handle validation errors or display a message.
    }
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const onSelect = (selectedList, selectedItem) => {
    // Handle the selected item when an option is selected
    // Update your state or perform other actions as needed
    setSelectedOptions(selectedList);
};
console.log("Selected Item:", selectedOptions);

  const onRemove = (selectedList, removedItem) => {
    // Handle the removed item when an option is deselected
    console.log("Removed Item:", removedItem);
    // Update your state or perform other actions as needed
    setSelectedOptions(selectedList);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department</Form.Label>
           {user.access !== "user" &&  <Form.Control
              as="select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
                <option value="">Select Department</option>
                {
                user?.department?.map(((data,index)=>(
                    <option value={data._id} key={index}>{data.roleName}</option>
                )))
              }
            </Form.Control>}
          </Form.Group>
          {user.access == "superadmin" && (
            <Form.Group>
              <Form.Label>Admin Departments</Form.Label>
              <Multiselect
                options={user.department}
                selectedValues={setSelectedOptions}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="roleName"
                id="css_custom"
                // style={{ chips: { background: "red" }, searchBox: { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" } }}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateUser}>
          Create User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;
