import React, { useState, ChangeEvent } from "react";
import Design from "./datePicker.module.css";
import { Col, Row } from "react-bootstrap";

interface DatePickerProps {
  label: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <Row>
      <Col md={12}>
        <div className={Design.callbackFormSection}>
          <label className={Design.labelBadge}>{label}</label>
          <div style={{ position: "relative" }}>
            <input
              type="date"
              className={Design.input}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DatePicker;
