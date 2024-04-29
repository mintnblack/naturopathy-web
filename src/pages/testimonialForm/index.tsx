import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Design from "./testimonialForm.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import LoadingScreen from "../../components/loader/LoadingScreen";
import axios from "axios";
import { BASE_URL } from "../../constants/applicationConstants";

const TestimonialForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [treatment, setTreatment] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);

  function isValidEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function isValidPhone(phone: string): boolean {
    const re = /^\d{10,15}$/; // Adjust regex according to your needs
    return re.test(phone);
  }

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setLoadingScreen(true);
    try {
      const data = {
        name: firstName + lastName,
        email: email,
        phone: phone,
        treatment: treatment,
        feedback: message,
      };

      const token = localStorage.getItem("access_token");

      const response = await axios.post(`${BASE_URL}/feedback/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Form submitted successfully", response.data);

      // Show success toast with a slight delay (optional)
      setTimeout(() => {
        toast.success("Form Submitted successfully!", {
          autoClose: 3000,
        });
      }, 1000);
      setLoadingScreen(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setTreatment("");
      setMessage("");
    } catch (error) {
      setLoadingScreen(false);
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again!");
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-right"/>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div className={`${Design.background} content-main`}>
          <Container>
            <div className={Design.latestBlogTitle}>
              <h2>Add your Testimonial</h2>
              <p>Because your words matter to us.</p>
            </div>

            <Row className={Design.callbackFormSection}>
              <Col md={8} className={Design.section1}>
                <Form onSubmit={onSubmitForm}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formFirstName">
                        <Form.Label className={Design.labelBadge}>
                          First Name
                        </Form.Label>
                        <Form.Control
                          className={Design.input}
                          as="input"
                          type="text"
                          placeholder=""
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formLastName">
                        <Form.Label className={Design.labelBadge}>
                          Last Name
                        </Form.Label>
                        <Form.Control
                          className={Design.input}
                          as="input"
                          type="text"
                          placeholder=""
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Label className={Design.labelBadge}>
                          Email
                        </Form.Label>
                        <Form.Control
                          className={Design.input}
                          as="input"
                          type="email"
                          placeholder=""
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formPhone">
                        <Form.Label className={Design.labelBadge}>
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          className={Design.input}
                          type="tel"
                          placeholder=""
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="formRreatment">
                        <Form.Label className={Design.labelBadge}>
                          Treatment Recieved
                        </Form.Label>
                        <Form.Control
                          className={Design.input}
                          as="input"
                          type="text"
                          placeholder=""
                          required
                          value={treatment}
                          onChange={(e) => setTreatment(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="formEmail">
                        <Form.Label className={Design.labelBadge}>
                          Your Message
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          className={Design.textarea}
                          type="textarea"
                          placeholder=""
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className={Design.button}
                    variant="primary"
                    type="submit"
                  >
                    Submit Testimonial
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default TestimonialForm;
