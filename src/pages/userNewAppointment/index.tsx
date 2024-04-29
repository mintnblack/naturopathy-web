import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import Design from "./userNewAppointment.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/applicationConstants";
import LoadingScreen from "../../components/loader/LoadingScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserNewAppointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [clinicId, setClinicId] = useState();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const navigate = useNavigate();
  const navigatetoDshbrd = () => {
    navigate("/user/dashboard");
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const LOADING_SCREEN = 5000; // Constant for loading screen duration (in milliseconds)
  const createAppointment = async () => {
    const userId = localStorage.getItem("user_id");
    const data = {
      clinic_id: clinicId,
      booking_date: selectedDate,
      user_id: userId,
    };
  
    setLoadingScreen(true);
  
    try {
      const response = await axios.post(`${BASE_URL}/appointment/`, data);
  
      if (response.status === 200) {
        // Navigate to dashboard first
        navigate("/user/dashboard");
  
        // Then show success toast with a slight delay (optional)
        setTimeout(() => {
          toast.success("Appointment created successfully!", {
            autoClose: 5000,
          });
        }, 1000); // Optional delay of 1 second for better user experience
      } else {
        toast.error("Appointment creation failed!");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoadingScreen(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/clinic/`)
      .then((res) => {
        setClinicId(res.data.data[0].id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
       <ToastContainer position="bottom-right"/>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div className="content-main">
          <Sidebar />
          <div className={Design.main}>
           

            <div className={Design.flex}>
              <h2>
                <span onClick={() => navigatetoDshbrd()}>Dashboard</span>{" "}
                <span>&gt;</span> <span>Create Appointment</span>
              </h2>
            </div>
            <hr className={Design.titleUnderline} />
            <Row className={Design.callbackFormSection}>
              <Col md={8} className={Design.section1}>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="formAppointmentDate">
                        <Form.Label className={Design.labelBadge}>
                          Date for Appointment
                        </Form.Label>
                        <Form.Control
                          className={Design.input}
                          type="date"
                          placeholder=" "
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className={Design.flex}>
                    <Button
                      className={Design.button}
                      variant="primary"
                      type="submit"
                      onClick={createAppointment}
                    >
                      Create New Appointment
                    </Button>
                    <div className={`${Design.flex} ${Design.alignRight}`}>
                      <a
                        style={{ color: "#5E9007", textDecoration: "none" }}
                        href="/user/dashboard"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>

          {/* <PatientDetail /> */}
        </div>
      )}
    </div>
  );
};

export default UserNewAppointment;
