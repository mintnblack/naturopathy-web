import { Row, Col, Image } from "react-bootstrap";
import Design from "./footer.module.css";

import Logo from "../../assets/images/logo/logo.svg";
import Address from "../../assets/images/footer/Address.png";
import Phone from "../../assets/images/footer/Phone.png";
import Email from "../../assets/images/footer/Email.png";

const Footer = () => {
  return (
    <footer>
      <div className={Design.footerMain}>
        <Row style={{ width: "100%" }}>
          <Col
            md={6}
            className={`${Design.footerColumn} ${Design.firstColumn}`}
          >
            <Image src={Logo} alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto esse excepturi non velit, consectetur similique eveniet
            </p>
          </Col>
          <Col
            md={3}
            className={`${Design.footerColumn} ${Design.secondColumn}`}
          >
            <div className={Design.iconTextContainer}>
              <Image src={Address} alt="" className={`${Design.icon} ${Design.location}`} />
              <p className={Design.text}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Architecto esse excepturi non velit, consectetur similique
                eveniet
              </p>
            </div>
          </Col>
          <Col
            md={3}
            className={`${Design.footerColumn} ${Design.thirdColumn}`}
          >
            <div className={Design.iconTextContainer}>
              <Image src={Phone} alt="" className={Design.icon} />
              <div className={`${Design.text} mb-3`}>
                <p>+00 0000 00 00</p>
                <p>+00 0000 00 00</p>
              </div>
            </div>
            <div className={Design.iconTextContainer}>
              <Image src={Email} alt="" className={Design.icon} />
              <div className={Design.text}>
                <p>abcd@gmail.com</p>
                <p>abcd@gmail.com</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
