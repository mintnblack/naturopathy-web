import { Link, useLocation } from "react-router-dom";
import Design from "./sidebar.module.css";
import { BsHouse } from "react-icons/bs";
import { BsGear } from "react-icons/bs";

const Sidebar: React.FC = () => {
  
  const location = useLocation();
  return (
    <div className={Design.sidebar}>
      <ul>
        <li>
          <BsHouse  className={Design.iconWidth} />
          <Link to="/user/dashboard" className={location.pathname.includes("dashboard") ? `${Design.active} ` : ''}>Dashboard</Link>
        </li>
        <li>
          <BsGear  className={Design.iconWidth} />
          <Link to="/user/settings" className={location.pathname.includes("settings") ? `${Design.active}` : Design.link}>Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
