import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Sidebar from "../../components/sidebar";
import Design from "./userDashboard.module.css";
import { BASE_URL } from "../../constants/applicationConstants";
import LoadingScreen from "../../components/loader/LoadingScreen";
import { ToastContainer } from "react-toastify";

// Define interfaces to type the API data
interface User {
  name: string;
}

interface Clinic {
  name: string;
}

interface Appointment {
  id: string;
  booking_date: string;
  status: number;
  scheduled_date: string | null;
  scheduled_slot: string;
  user: User;
  clinic: Clinic;
  prescription_id: string;
}

const statusMap: { [key: number]: string } = {
  0: "Pending",
  1: "Scheduled",
  2: "Rejected",
  3: "Rescheduled",
  4: "Unavailable",
  5: "Completed",
  6: "Canceled",
};

const mapStatus = (status: number): string => {
  return statusMap[status] || "Unknown";
};

const UserDashboard: React.FC = () => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Scheduled":
        return Design.scheduledColor;
      case "Cancelled":
        return Design.cancelledColor;
      case "Completed":
        return Design.completedColor;
      case "Pending":
        return Design.pendingColor;
      case "Rejected":
        return Design.rejectedColor;
      case "Rescheduled":
        return Design.rescheduledColor;
      case "Unavailable":
        return Design.unavailableColor;
      default:
        return "";
    }
  };

  const viewPrescription = (prescriptionId: any) => {
    navigate(`/user/dashboard/prescription/${prescriptionId}`);
  };

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    setLoadingScreen(true);
    if (id) {
      axios
        .get(`${BASE_URL}/appointment/user/${id}`)
        .then((res) => {
          setAppointments(res.data.data);
          setLoadingScreen(false);
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
          setAppointments([]); // Safely handle the error by resetting the state
          setLoadingScreen(false);
        });
    }
  }, []);

  const createAppointment = () => {
    navigate("/user/dashboard/create-appointment");
  };

  return (
    <div>
      <ToastContainer position="bottom-right" />
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div className="content-main">
          <Sidebar />
          <div className={Design.main}>
            <div className={Design.flex}>
              <h2 className={Design.dashboardTitle}>Dashboard</h2>
              <div className={Design.appointmentButton}>
                <Button type="submit" onClick={createAppointment}>
                  Create New Appointment
                </Button>
              </div>
            </div>
            <hr className={Design.titleUnderline} />
            <h2 className={Design.titleAppointment}>Appointments</h2>
            <Table
              hover
              responsive
              className={`${Design.table} ${Design.customTableBackground}`}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.scheduled_date || item.booking_date}</td>
                    <td>{item.scheduled_slot}</td>
                    <td>
                      <Badge
                        bg="secondary"
                        className={`${getStatusColor(
                          mapStatus(item.status)
                        )} Design.abc`}
                      >
                        {mapStatus(item.status)}
                      </Badge>
                    </td>

                    <td>
                      <a
                        onClick={(e) => {
                          if (item.status !== 5) {
                            e.preventDefault(); // Prevent the default action if status is not 5
                          } else {
                            viewPrescription(item.prescription_id);
                          }
                        }}
                        className={
                          item.status === 5
                            ? Design.linkEnabled
                            : Design.linkDisabled
                        }
                      >
                        <BsEye />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
