import React from "react";
import Design from "./patientDetail.module.css";

const Sidebar: React.FC = () => {
  return (
    <div className={Design.sidebar}>
      <h2>Patient Details</h2>
      <div className={Design.details}>
        <div>
          <strong>First name:</strong>
        </div>
        <div>John</div>
      </div>
      <div className={Design.details}>
        <div>
          <strong>Last name:</strong>
        </div>
        <div>Doe</div>
      </div>
      <div className={Design.details}>
        <div>
          <strong>Email:</strong>
        </div>
        <div>Johndoe@gmail.com</div>
      </div>
      <div className={Design.details}>
        <div>
          <strong>Phone No:</strong>
        </div>
        <div>+00 12345678</div>
      </div>
      <div className={Design.details}>
        <div>
          <strong>Location:</strong>
        </div>
        <div>Netherland</div>
      </div>
    </div>
  );
};

export default Sidebar;
