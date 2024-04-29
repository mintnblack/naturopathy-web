import { Button, Col, Form, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import Design from "./settingsView.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/applicationConstants";
import LoadingScreen from "../../components/loader/LoadingScreen";
import { ToastContainer, toast } from "react-toastify";

interface User {
  name: string;
  username?: string;
  phone?: string;
}

const SettingsView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [editedName, setEditedName] = useState("");

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        const userData = response.data.data;
        setUserInfo(userData);
        setEditedName(userData.name); // Initialize form with current name
      } catch (err) {
        console.log("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleUpdateClick = async () => {
    if (!editedName.trim()) {
      alert("Please enter a valid name.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/user/${userId}`, {
        name: editedName,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, name: editedName });
        setEditMode(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Update failed. Please try again later.");
      }
    } catch (err) {
      console.error("Error updating user information:", err);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>Error fetching user information: {error}</div>;
  }

  if (!userInfo) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      <ToastContainer position="bottom-right"/>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="content-main">
          <Sidebar />
          <div className={Design.main}>
            <div className={Design.flex}>
              <h2>Settings</h2>
              <div className={`${Design.flex} ${Design.alignRight}`}>
                <div className={Design.appointmentButton}>
                  <Button
                    variant={editMode ? "secondary" : "primary"}
                    onClick={handleEditClick}
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
            </div>
            <hr className={Design.titleUnderline} />
            {editMode ? (
              <Form>
                <Form.Group as={Row} controlId="nameInput">
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
                <div className={Design.appointmentButton}>
                  <Button variant="primary" onClick={handleUpdateClick}>
                    Update Profile
                  </Button>
                </div>
              </Form>
            ) : (
              <>
                <p>
                  <span>Name:</span> {userInfo.name || "N/A"}
                </p>
                <p>
                  <span>Email:</span> {userInfo.username || "N/A"}
                </p>
                <p>
                  <span>Phone:</span> {userInfo.phone || "N/A"}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
