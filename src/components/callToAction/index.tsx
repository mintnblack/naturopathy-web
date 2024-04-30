import { useNavigate } from "react-router-dom";
import Design from "./cta.module.css";

const CTA: React.FC = () => {

  const navigate = useNavigate();
  const toRegistration = () =>{
    navigate('/register');
  }

  return (
    <div>
    <div className={Design.ctaBanner}>
      <div className={Design.ctaContent}>
        <h2>Get an Appointment </h2> <span>NOW !</span>
      </div>
      <button className={Design.ctaButton} onClick={toRegistration}>
        Register for consultation
      </button>
    </div>
  </div>
  );
};

export default CTA;
