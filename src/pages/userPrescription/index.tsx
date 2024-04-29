import { Table } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import Design from "./userPrescription.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/applicationConstants";
import { BsLink } from "react-icons/bs";
import LoadingScreen from "../../components/loader/LoadingScreen";

const UserPrescription: React.FC = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState<any>({});
  const [loadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    setLoadingScreen(true);
    axios
      .get(`${BASE_URL}/prescription/${id}`)
      .then((res) => {
        if (res.data.code === 200) {
          setPrescription(res.data.data);
          setLoadingScreen(false);
        } else {
          console.log(res.data.message, "error", true);
          setLoadingScreen(false);
        }
      })
      .catch((err) => {
        setLoadingScreen(false);
        console.log(err);
        console.log("Failed to fetch prescription details.", "error", true);
      });
  }, []);
  if (!prescription) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div className="content-main">
          <Sidebar />
          <div className={Design.main}>
            <div className={Design.flex}>
              <h2>
                Dashboard <span>&gt;</span> <span>Prescription</span>
              </h2>
            </div>
            <hr className={Design.titleUnderline} />
            <h3>Notes</h3>
            <p>{prescription.notes}</p>

            <h3>Prescription</h3>
            <Table bordered striped hover responsive className={Design.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Dosage</th>
                  <th>Product Link</th>
                 
                </tr>
              </thead>
              <tbody>
                {prescription.products &&
                  prescription.products.map((product: any, index: number) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.dosage}</td>
                      <td>
                        <a href={product.url}>
                          <BsLink />
                        </a>
                      </td>
                      
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          {/* <PatientDetail /> */}
        </div>
      )}
    </div>
  );
};

export default UserPrescription;
