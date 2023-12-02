import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import Notiflix from "notiflix";
import "../Css/Login.css";
import Logo from "../Assets/delonghi.svg";
import Mail from "../Assets/mail.svg";
import Lock from "../Assets/lock.svg";
import Eye from "../Assets/eye.svg";
import CloseEye from "../Assets/closeEye.svg";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checkUserNameCond, setCheckUserNameCond] = useState(null);
  const [checkPwCond, setCheckPwCond] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    if (isAuthenticated) {
      // Redirect to the dashboard if the user is already logged in.
      // Use the `Navigate` component to do the redirection.
      return <Navigate to="/dashboard" />;
    }
  }, []);
  const SubmitLogin = async () => {
    console.log(checkUserNameCond, checkPwCond, "CVsdcsand");
    if (password && username) {
      setIsLoading(true);

      const payload = {
        username,
        password,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
          payload
        );
        if (response.data.status === false) {
          Notiflix.Notify.failure("Login Failed!");
        } else {
          const token = response.data.token;
          const userType = response.data.type;
          const userName = response.data.username;

          // Dispatch the login action here
          // this.props.login({ token, userType, userName });
          localStorage.setItem("token", token);
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error, "Error");
        Notiflix.Notify.failure("Login Failed!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const checkEmail = () => {
    if (username.trim().length < 1) {
      setCheckUserNameCond(false);
    } else {
      setCheckUserNameCond(true);
    }
  };

  const checkPw = () => {
    if (password.trim().length < 1) {
      setCheckPwCond(false);
    } else {
      setCheckPwCond(true);
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    SubmitLogin();
  };

  return (
    <div className="login-container">
      {/* <Container> */}
      <div className="login-wrap">
        <Row>
          <Col md={12}>
            {" "}
            {/* Centered column of width 6 */}
            <div className="login-box">
              <div className="auth-logo text-center mb-30">
                <img src={Logo} alt="Logo" />
                <h3 className="login-text">Delonghi Repair Management</h3>
                <h1 className="mb-3 text-18" style={{ textAlign: "center" }}>
                  Sign In
                </h1>
              </div>

              <Form onSubmit={handleFormSubmit}>
                <Form.Label>Username</Form.Label>
                <Form.Group controlId="setUserName" className="text-12 input-container mb-2">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={checkEmail}
                    isInvalid={checkUserNameCond?.length > 0}
                    placeholder="Enter Your Username"
                  />
                  <img src={Mail} />

                  {checkUserNameCond?.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      username is required
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                  <Form.Label>Password</Form.Label>
                <Form.Group controlId="setUserName" className="text-12 input-container">
                  <Form.Control
                    type={isPassword?"password": "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={checkPw}
                    isInvalid={checkPwCond?.length > 0}
                    placeholder="Enter Your Password"
                  />
                  <img src={Lock} />
                  <img src={isPassword ? Eye : CloseEye} className="password-eye" onClick={()=>setIsPassword(prev=> !prev)} />

                  {checkPwCond?.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      Password is required
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <div style={{ textAlign: "center" }}>
                  {isLoading && (
                    <Spinner animation="border" size="sm" variant="primary" />
                  )}
                </div>
              {/* <div className="text-center forgot-password">
                <a href="/password/reset" className="text-muted">
                  <u>Forgot Password ?</u>
                </a>
              </div> */}

                <Button
                  type="submit"
                  className="btn-block mt-2"
                  variant="primary"
                  disabled={isLoading}
                  // onClick={SubmitLogin}
                >
                  Sign In
                </Button>
              </Form>

            </div>
          </Col>
        </Row>
      </div>
      {/* </Container> */}
    </div>
  );
}

export default Login;
