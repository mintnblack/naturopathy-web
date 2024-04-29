import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Design from "./registration.module.css";
import { ChangeEvent, useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import { toast } from "react-toastify"; // Import toast functions
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else {
      newErrors.firstName = "";
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else {
      newErrors.lastName = "";
    }

    // Validate email
    if (!formData.username.trim()) {
      newErrors.username = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.username.trim())) {
      newErrors.username = "Email is invalid";
      isValid = false;
    } else {
      newErrors.username = "";
    }

    // Validate phone number
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else {
      newErrors.phone = "";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Combine firstName and lastName into a single name field
      const fullName = `${formData.firstName} ${formData.lastName}`;

      // Create a new object with combined name and other fields
      const requestData = {
        ...formData,
        name: fullName,
        // Remove firstName and lastName from the request data
        firstName: undefined,
        lastName: undefined,
      };

      // Make a POST request to the registration API
      const response = await axios.post("https://ennar-api.onrender.com/auth/user/register/", requestData);

      // Handle successful registration
      console.log("Registration successful", response.data);

      // Show toaster message for successful registration with autoClose duration of 5 seconds
      toast.success("Registration successful!", { autoClose: 5000 });

      // Navigate to the login page
      window.location.href = "/login"; // Alternatively, you can use history.push('/login') if you are using react-router

    } catch (error) {
      // Handle registration error
      console.error("Registration error", error);
      // Show toaster message for registration error with autoClose duration of 5 seconds
      toast.error("Something went wrong. Please try again later.", { autoClose: 5000 });
    }
  };

  return (
    <div className={`${Design.background} content-main`}>
      <Container>
        <div className={Design.latestBlogTitle}>
          <h2>Register for Consultation</h2>
          <p>We will take good care of you.</p>
        </div>

        <Row className={Design.callbackFormSection}>
          <Col md={8} className={Design.section1}>
            <Form onSubmit={handleRegistration}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label className={Design.labelBadge}>First Name</Form.Label>
                    <Form.Control
                      className={Design.input}
                      type="text"
                      name="firstName"
                      placeholder=""
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && <Form.Text className="text-danger">{errors.firstName}</Form.Text>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formLastName">
                    <Form.Label className={Design.labelBadge}>Last Name</Form.Label>
                    <Form.Control
                      className={Design.input}
                      type="text"
                      name="lastName"
                      placeholder=""
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && <Form.Text className="text-danger">{errors.lastName}</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label className={Design.labelBadge}>Email</Form.Label>
                    <Form.Control
                      className={Design.input}
                      type="email"
                      name="username"
                      placeholder=""
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPhone">
                    <Form.Label className={Design.labelBadge}>Phone Number</Form.Label>
                    <Form.Control
                      className={Design.input}
                      type="tel"
                      name="phone"
                      placeholder=""
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && <Form.Text className="text-danger">{errors.phone}</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPassword">
                    <Form.Label className={Design.labelBadge}>Password</Form.Label>
                    <Form.Control
                      className={Design.input}
                      type="password"
                      name="password"
                      placeholder=""
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label className={Design.labelBadge}>Confirm Password</Form.Label>
                    <Form.Control
                      className={Design.input}
                      type="password"
                      name="confirmPassword"
                      placeholder=""
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>
              <Button className={Design.button} variant="primary" type="submit">
                Register for Consultation
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
