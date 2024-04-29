import { Image } from "react-bootstrap";
import Design from "./socialFooter.module.css";

import SocialOrange1 from "../../assets/images/footer/socialSection1.png";
import SocialOrange2 from "../../assets/images/footer/socialSection2.png";
import Twitter from "../../assets/images/footer/twitter-icon.png";
import Facebook from "../../assets/images/footer/facebook-icon.png";
import Instagram from "../../assets/images/footer/instagram-icon.png";
import Discord from "../../assets/images/footer/discord-icon.png";
import Linkedin from "../../assets/images/footer/linkedin-icon.png";

const SocialFooter = () => {
  return (
    <div className={Design.socialIconsSection}>
      <div className={Design.socialIconsBanner}>
        <Image src={SocialOrange1} alt="" className={Design.socialOrange1} />
        <h2 className={Design.socialTitle}>Also find us on:</h2>
        <Image src={SocialOrange2} alt="" className={Design.socialOrange2} />
      </div>
      <div className={Design.socialIconsRow}>
        <Image src={Twitter} alt="" className={Design.socialIcon} />
        <Image src={Instagram} alt="" className={Design.socialIcon} />
        <Image src={Facebook} alt="" className={Design.socialIcon} />
        <Image src={Discord} alt="" className={Design.socialIcon} />
        <Image src={Linkedin} alt="" className={Design.socialIcon} />
      </div>
    </div>
  );
};

export default SocialFooter;
