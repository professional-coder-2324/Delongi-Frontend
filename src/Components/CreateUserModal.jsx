import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { useEffect } from "react";

const CreateUserModal = ({
  show,
  handleClose,
  user,
  setRows,
  row,
  editData,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("");
  useEffect(() => {
    console.log(user,editData,"Dsdsds");
    if (editData) {
      const editDetails = user?.department?.find((data, index)=>data.roleName == editData.role) 

      console.log(editDetails,"Sdsdsdsd");
      setFirstName(editData.firstName);
      setLastName(editData.lastName);
      setUsername(editData.username);
      setPassword(editData.password);
      setDepartment(editDetails?._id);
      setSelectedOptions(editData?.department);
    }
    else {
      setFirstName("")
      setLastName("")
      setUsername("")
      setPassword("")
      setDepartment("");
      setSelectedOptions("");
    }
  }, [editData]);
  
  console.log(username,"userrrr");
  // State variables to hold error messages
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [selectedOptionsError, setSelectedOptionsError] = useState("");
const findRoleName = (roleId) => {
  console.log(roleId,'roleId');
  const department = user?.department;
  const role = department.find((data) => data._id === roleId);
  return role ? role.roleName : "Role Not Found";
};
  const handleCreateUser = async () => {
    // Reset all error messages
    setFirstNameError("");
    setLastNameError("");
    setUsernameError("");
    setPasswordError("");
    setDepartmentError("");
    setSelectedOptionsError("");

    // Perform your custom validation here
    let hasError = false;

    if (!firstName) {
      setFirstNameError("First Name is required");
      hasError = true;
    }

    if (!lastName) {
      setLastNameError("Last Name is required");
      hasError = true;
    }

    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (!department) {
      setDepartmentError("Department is required");
      hasError = true;
    }

    if (user.access === "superadmin" && !selectedOptions) {
      setSelectedOptionsError("Admin Departments are required");
      hasError = true;
    }

    if (hasError) {
      // If there are errors, do not proceed with the form submission
      return;
    }

    // Validation passed, proceed with form submission
    const userData = {
      firstName,
      lastName,
      username,
      password,
      role: department,
      department: user.access === "superadmin"? selectedOptions.map((role) => role._id) : [],
    };

    try {
      if(editData) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/updateUser?userId=${editData?.id}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedUser = response.data.data;
        
        setRows((prevRows) => {
          console.log(prevRows,"prevdfdkj");
          // Create a new array with the updated user, replacing the old user
          const updatedRows = prevRows.map((row) =>
            row._id === updatedUser._id ? updatedUser : row
          );
          return updatedRows;
        });
      }
      else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/createUser`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const newUser = response.data.data;
        const newUserRole = {roleName : findRoleName(newUser.role),_id: newUser.role}
        console.log(newUserRole,"sdsdfdfdfdf");
        console.log(newUser,"newUser");
        const userWithRole = { ...newUser, role:newUserRole };
          console.log(userWithRole,"SDsdsdsdsddsvcscdvd");
        // Add the updated user object to the table
        setRows((prevRows) => [userWithRole, ...prevRows]);
        

      }
    } catch (error) {
      console.log(error, "Error");
    }

    handleClose();
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedOptions(selectedList);
    setSelectedOptionsError(""); // Clear the error when selection is made
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedOptions(selectedList);
    setSelectedOptionsError(""); // Clear the error when a selection is removed
  };
  function formatRoleName(roleName) {
    if (roleName === roleName.toUpperCase()) {
      // If all characters are in uppercase, return the roleName as is
      return roleName;
    } else {
      // Split the roleName by capital letters or space and join with space
      return roleName
        .replace(/([A-Z])/g, ' $1') // insert space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // capitalize the first letter
    }
  }
  
  return (
    <Modal show={show} onHide={handleClose} className="create-user-modal">
      <Modal.Header>
        <Modal.Title> {editData ? 'Edit' :"Create"} User</Modal.Title>
        <button className="btn bg-transparent close-button">
          <i className="fa-solid text-25 fa-xmark" onClick={handleClose}></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-2">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFirstNameError(""); // Clear the error on change
                  }}
                  className="input-for-user"
                />
                <Form.Text className="text-danger">{firstNameError}</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setLastNameError(""); // Clear the error on change
                  }}
                  className="input-for-user"
                />
                <Form.Text className="text-danger">{lastNameError}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(""); // Clear the error on change
                  }}
                  className="input-for-user"
                  autoComplete="new-username"
                />
                <Form.Text className="text-danger">{usernameError}</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(""); // Clear the error on change
                  }}
                  className="input-for-user"
                  autoComplete="new-password"
                />
                <Form.Text className="text-danger">{passwordError}</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={department}
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setDepartmentError(""); // Clear the error on change
                  }}
                >
                  <option value="">Select Department</option>
                  {user?.department?.map((data, index) => (
                    <option value={data._id} key={index}>
                      {formatRoleName(data.roleName)}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="text-danger">{departmentError}</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              {user.access === "superadmin" && (
                <Form.Group>
                  <Form.Label>Admin Departments</Form.Label>
                  <Multiselect
                    options={user.department}
                    selectedValues={selectedOptions}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    displayValue="roleName"
                    id="css_custom"
                  />
                  <Form.Text className="text-danger">
                    {selectedOptionsError}
                  </Form.Text>
                </Form.Group>
              )}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-start">
        <button
          type="button"
          className="mr-1 btn btn-icon m-1 btn-sm create-user-button"
          onClick={handleCreateUser}
        >
          <div className="button-container">
            <span>Submit</span>
          </div>
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;
