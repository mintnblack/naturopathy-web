import React, { useState, useEffect, useRef } from "react";
import "./home.module.css";
import blogCard from "../../assets/images/home/blogCard.png";
import About from "../../assets/images/home/homeAbout.png";
import CTA from "../../components/callToAction";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import overlayImage1 from "../../assets/images/home/1.png";
import overlayImage2 from "../../assets/images/home/2.png";
import Design from "./home.module.css";
import bannerBackground from "../../assets/images/background/bg1.png";
import arrowRight from "../../assets/images/icons/arrow-right.png";
import arrowLeft from "../../assets/images/icons/arrow-left.png";
import "bootstrap/dist/css/bootstrap.min.css";
import SocialFooter from "../../components/socialFooter";

import LoadingScreen from "../../components/loader/LoadingScreen";
import axios from "axios";
import { BASE_URL } from "../../constants/applicationConstants";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface Item {
  title: string;
  image_path: string;
  author: string;
  date: string;
  description: string;
  id: string;
}

interface CardSliderProps {
  items: Item[];
}

interface Testimonial {
  feedback: string;
  name: string;
  treatment: string;
}

const Home: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/blog/`)
      .then((res) => {
        setBlogs(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/feedback/approved/`);
        setTestimonials(response.data.data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  function isValidEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function isValidPhone(phone: string): boolean {
    const re = /^\d{10,15}$/; // Adjust regex according to your needs
    return re.test(phone);
  }

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setLoadingScreen(true);
    try {
      const data = {
        name: firstName + lastName,
        email: email,
        phone: phone,
        message: message,
      };

      const response = await axios.post(`${BASE_URL}/callback/`, data);

      console.log("Form submitted successfully", response.data);

      // Show success toast with a slight delay (optional)
      setTimeout(() => {
        toast.success("Form Submitted successfully!", {
          autoClose: 3000,
        });
      }, 1000);
      setLoadingScreen(false);
      // Optionally reset form state
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setLoadingScreen(false);
      console.error("Error submitting form:", error);
      // Include detailed error message if available
      toast.error("Error submitting form. Please try again!");
    }
  };

  const items = [
    {
      title: "Article 1",
      author: "John Doe",
      date: "2024-03-16",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Article 2",
      author: "Jane Smith",
      date: "2024-03-17",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Article 3",
      author: "Alice Johnson",
      date: "2024-03-18",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Article 3",
      author: "Alice Johnson",
      date: "2024-03-18",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Article 3",
      author: "Alice Johnson",
      date: "2024-03-18",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Article 3",
      author: "Alice Johnson",
      date: "2024-03-18",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Article 3",
      author: "Alice Johnson",
      date: "2024-03-18",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Article 3",
      author: "Alice Johnson",
      date: "2024-03-18",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const screenWidth = window.innerWidth;

  const chunkSize = screenWidth < 481 ? 1 : screenWidth < 768 ? 2 : 3;

  const chunks: Item[][] = blogs.reduce<Item[][]>(
    (resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // Start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    },
    []
  );
  const toBlog = (id: string) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div className="background content-main">
          <ToastContainer position="bottom-right" />
          <Carousel
            fade
            controls={true}
            indicators={false}
            nextIcon={
              <img src={arrowRight} className={Design.carouselControlBg} />
            }
            prevIcon={<img src={arrowLeft} />}
          >
            <Carousel.Item>
              <div className={Design.backgroundImage}>
                <img src={overlayImage1} alt="Overlay Image 1" />
              </div>

              <Carousel.Caption className={Design.captionLeft}>
                <h1 className={Design.heading}>Heading 1</h1>
                <h2 className={Design.subheading}>Subheading 1</h2>
                <button className={Design.button}>
                  Request for Registration
                </button>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className={Design.backgroundImage}>
                <img src={overlayImage2} alt="Overlay Image 1" />
              </div>
              <Carousel.Caption className={Design.captionLeft}>
                <h1 className={Design.heading}>Heading 2</h1>
                <h2 className={Design.subheading}>Subheading 2</h2>
                <button className={Design.button}>Request for Callback</button>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <div className={Design.cardSliderSection}>
            <Col xs={12} sm={12} md={2}>
              <div>
                <div className={Design.sectionHeading}>
                  <h2>Featured</h2>
                  <span>blogs</span>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={10}>
              <Carousel
                interval={null}
                controls={true}
                indicators={false}
                className={`${Design.carousel}`}
                nextIcon={
                  <img src={arrowRight} className={Design.carouselControlBg} />
                }
                prevIcon={<img src={arrowLeft} />}
              >
                {chunks.map((chunk, chunkIndex) => (
                  <Carousel.Item key={chunkIndex}>
                    <div className={Design.cards}>
                      {chunk.map((item, index) => (
                        <Card
                          key={index}
                          className={Design.paddingCard}
                          onClick={() => toBlog(item.id)}
                          style={{ height: "380px" }}
                        >
                          <div className={Design.imageContainer}>
                            <Card.Img
                              variant="top"
                              src={`${BASE_URL}/image/${item.image_path}`}
                              style={{ objectFit: "cover" }} // Ensures image fills container
                            />
                          </div>
                          <Card.Body>
                            <Card.Title>
                              {item.title.length > 55
                                ? item.title.slice(0, 55) + "..."
                                : item.title}
                            </Card.Title>
                            {/* <Card.Text>{item.description}</Card.Text> */}
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </div>

          <div className={Design.aboutSection} id="about">
            <Col
              md={{ order: 1, span: 6 }}
              xs={{ order: 2, span: 12 }}
              sm={{ order: 2, span: 12 }}
            >
              <div className={Design.aboutImage}>
                <img src={About} alt="Image" />
              </div>
            </Col>
            <Col
              md={{ order: 2, span: 6 }}
              xs={{ order: 1, span: 12 }}
              sm={{ order: 1, span: 12 }}
              className={Design.aboutContent}
            >
              <div>
                <h2>About Us</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  facilisi. In hac habitasse platea dictumst. Vivamus vel libero
                  vel lacus ultrices fringilla. Nullam auctor auctor nisi, vitae
                  consectetur nunc facilisis non. Aenean eget dui a elit aliquet
                  malesuada nec eu tortor.
                </p>
                <p>
                  Quisque blandit justo quis risus feugiat, a pulvinar elit
                  ultrices. Sed fermentum justo vel dui tincidunt, vel tincidunt
                  justo efficitur. Vestibulum vel fermentum ligula. Nunc non
                  purus vel felis consequat facilisis. Morbi ut metus felis. Sed
                  id ultrices leo.
                </p>
              </div>
            </Col>
          </div>

          <div className={Design.cta}>
            <CTA />
          </div>

          <div className={Design.callbackFormSection} id="contact">
            <Col md={8} sm={12} xs={12} className={Design.section1}>
              {/* <div className={`${Design.displayBlock} ${Design.displayNone}`}>
                <div
                  className={`${Design.sectionHeading} ${Design.callBacksectionHeading}`}
                >
                  <span>Callback</span>
                  <h2>Form</h2>
                </div>
              </div> */}
              <div className={Design.callbackTitle}>
              <div className={Design.sectionHeading}>
                <span>Callback &nbsp;</span>
                <h2>Form</h2>
              </div>
              <div className={Design.sectionHeading}>
                <p>Feel Free to contact us with any Queries!</p>
              </div>
              </div>
              <Form onSubmit={onSubmitForm}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label className={Design.labelBadge}>
                        First Name
                      </Form.Label>

                      <Form.Control
                        className={Design.input}
                        as="input"
                        type="text"
                        placeholder=""
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Label className={Design.labelBadge}>
                        Last Name
                      </Form.Label>
                      <Form.Control
                        className={Design.input}
                        as="input"
                        type="text"
                        placeholder=""
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label className={Design.labelBadge}>
                        Email
                      </Form.Label>
                      <Form.Control
                        className={Design.input}
                        as="input"
                        type="email"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label className={Design.labelBadge}>
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        className={Design.input}
                        type="tel"
                        placeholder=""
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group controlId="formEmail">
                      <Form.Label className={Design.labelBadge}>
                        Message
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        className={Design.textarea}
                        type="textarea"
                        placeholder=""
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  className={Design.button}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Col>
            <Col className={Design.section2} md={4}>
              <div className={Design.sectionHeading}>
                <span>Callback </span>
                <h2>Form</h2>
              </div>
            </Col>
          </div>

          <div className={Design.testimonial}>
            <div className={Design.testimonialQuotes}>
              <h2>Testimonial</h2>
              <Carousel>
                {testimonials.map((testimonial, index) => (
                  <Carousel.Item key={index}>
                    <p>{testimonial.feedback}</p>
                    <h3>{testimonial.name}</h3>
                    <p style={{ marginBottom: "100px" }} className={Design.sub}>
                      {testimonial.treatment}
                    </p>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
          <SocialFooter />
        </div>
      )}
    </div>
  );
};

export default Home;
