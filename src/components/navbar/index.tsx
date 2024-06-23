import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import Logo from "../../assets/images/logo/logo.svg";
import { useAuth } from "../../auth/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close the mobile menu when the location changes
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAboutClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          window.scrollTo({
            top: aboutSection.offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        window.scrollTo({
          top: aboutSection.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }
  };

  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          window.scrollTo({
            top: contactSection.offsetTop ,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop + 70,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav>
      <div className="logo">
        <img
          src={Logo}
          alt="Ennar"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        &#9776;
      </div>

      <ul className={`nav-items ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={handleAboutClick}
            className={
              location.pathname === "/"
                ? "active navbar-button"
                : "navbar-button"
            }
          >
            About Us
          </button>
        </li>
        <li>
          <button
            onClick={handleContactClick}
            className={
              location.pathname === "/"
                ? "active navbar-button"
                : "navbar-button"
            }
          >
            Contact Us
          </button>
        </li>
        {isAuthenticated ? (
          <>
          <li>
              <Link
                to="/user/dashboard"
                className={location.pathname === "/user/dashboard" ? "active" : ""}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/user/settings"
                className={location.pathname === "/user/settings" ? "active" : ""}
              >
                Settings
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        <li>
          <Link
            to="/blogs"
            className={location.pathname === "/blogs" ? "active" : ""}
          >
            Blogs
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li className="menuItem">
          <Link
            to="/login"
            className={location.pathname === "login" ? "active" : ""}
            onClick={() => logoutUser()}
          >
            Logout
          </Link>
        </li>
          </>
        ) : (
          <>
         <li className="menuItem">
          <Link
            to="/login"
            className={location.pathname === "login" ? "active" : ""}
          >
            Login
          </Link>
        </li></>
        )}
      </ul>

      <div className="login-register">
        {isAuthenticated ? (
          <>
            <button
              className="login-btn"
              onClick={() => {
                navigate("/user/dashboard");
              }}
            >
              My Dashboard
            </button>
            <button className="register-btn" onClick={() => logoutUser()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="login-btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="register-btn"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
