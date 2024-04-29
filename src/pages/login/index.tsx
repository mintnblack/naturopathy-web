import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Design from "./login.module.css";
import { useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // Import useAuth hook
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingScreen from "../../components/loader/LoadingScreen";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inValid, setInValid] = useState(false);
  const { loginUser } = useAuth();
  const [loadingScreen, setLoadingScreen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!username.trim() || !password.trim()) {
        toast.error("Please enter both email and password");
        return;
      }
      setLoadingScreen(true);

      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      const response = await axios.post(
        "https://ennar-api.onrender.com/auth/user/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Login successful", response.data);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_id", response.data.user_id);
      loginUser();

      // Navigate to dashboard first
      navigate("/user/dashboard");

      // Then show success toast with a slight delay (optional)
      setTimeout(() => {
        toast.success("Login successful!", {
          autoClose: 3000,
        });
      }, 1000); // Optional delay of 1 second for better user experience

      setLoadingScreen(false);
    } catch (error) {
      setInValid(true);
      console.log("Login error");
      setLoadingScreen(false);
      toast.error("Please check login details");
    }
  };
  return (
    <div>
      <ToastContainer position="bottom-right" />
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div className={`${Design.background} content-main`}>
          <Container>
            <div className={Design.latestBlogTitle}>
              <h2>Login</h2>
              <p>
                Know your appointment timings or book a new appointment by
                logging in
              </p>
            </div>
            <p
              className={Design.credentialError}
              style={{ display: inValid ? "block" : "none" }}
            >
              Please enter Valid Credentials
            </p>{" "}
            <Form className={Design.callbackFormSection} onSubmit={handleLogin}>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formEmail">
                    <Form.Label className={Design.labelBadge}>Email</Form.Label>
                    <Form.Control
                      className={Design.input}
                      type="email"
                      placeholder=""
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required // Required field
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formPassword">
                    <Form.Label className={Design.labelBadge}>
                      Password
                    </Form.Label>
                    <Form.Control
                      className={Design.input}
                      type="password"
                      placeholder=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required // Required field
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button className={Design.button} variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Login;
