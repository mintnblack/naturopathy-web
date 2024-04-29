import Design from "./blogs.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CTA from "../../components/callToAction";
import SocialFooter from "../../components/socialFooter";
import { Key, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/applicationConstants";
import LoadingScreen from "../../components/loader/LoadingScreen";
import { useNavigate } from "react-router-dom";

interface Item {
  title: string;
  author: string;
  date: string;
  description: string;
}

interface FeaturedBlogs {
  id: string;
  title: string;
  image_path: string;  
  author: string; 
  created: string;
}

interface Blog {
  name: string;
  id: string;
  blogs: Blog[];
  category_id: string;
  category_name: string;
  title: string;
  author: string;
  image_path: string;
  image_tag: string;
  html: string;
  featured: boolean;
  created: string;
  updated: string;
}

interface Category {
  id: string;
  name: string;
  created: string;
  updated: string;
}

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const [featuredBlogs, setFeaturedBlogs] = useState<FeaturedBlogs[]>([]);
  const [latestFeatureBlog, setlatestFeatureBlog] = useState<FeaturedBlogs | null>(null);
  const [categoryBlogs, setcategoryBlogs] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    setLoadingScreen(true);
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blog/featured`);
        const blogs = response.data.data;
        setlatestFeatureBlog(blogs[0]);
        setFeaturedBlogs(blogs.slice(1, 5));
        console.log(featuredBlogs);
        setLoadingScreen(false);
      } catch (err) {
        console.error("Error fetching featured blogs:", err);
        setLoadingScreen(false);
      }
    };
    fetchFeaturedBlogs();
  }, []);

  useEffect(() => {
    setLoadingScreen(true);
    axios
      .get(`${BASE_URL}/category/blogs/`)
      .then((response) => {
        setcategoryBlogs(response.data.data);
        setLoadingScreen(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the blog categories!",
          error
        );
        setLoadingScreen(false);
      });
  }, []);

  useEffect(() => {
    setLoadingScreen(true);
    axios
      .get(`${BASE_URL}/blog/`)
      .then((res) => {
        setBlogs(res.data.data);
        setLoadingScreen(false);
      })
      .catch((err) => {
        setLoadingScreen(false);
        console.log(err.message);
      });
  }, []);

  function formatDate(dateString: string | number | Date) {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const toBlog = (id: string) => {
    navigate(`/blogs/${id}`);
  };

  const screenWidth = window.innerWidth;

  const getChunkSize = () => {
    if (screenWidth < 481) return 1;
    else if (screenWidth < 768) return 2;
    else return 4;
  };

  // Function to create chunks based on the current screen width
  const createChunks = (items: any[]) => {
    const chunkSize = getChunkSize();
    return items.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // Start a new chunk
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
  };

  function stripHtmlAndTruncate(html: string, length = 50) {
    // Remove HTML tags using a regular expression
    const plainText = html.replace(/<[^>]*>/g, "");

    // Truncate the plain text to the specified length
    return plainText.length > length
      ? plainText.substring(0, length) + "..."
      : plainText;
  }

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div className="background content-main">
          <div className={Design.blogMainSection}>
            {featuredBlogs.length >= 4 ? (
              <div>
                <Row>
                  <Col xs={12} sm={12} md={8}>
                    {latestFeatureBlog && (
                      <>
                        <Card
                          className={`${Design.customCard} ${Design.blogMainSection}`}
                          onClick={() => toBlog(latestFeatureBlog.id)}
                        >
                          <Card.Img
                            src={`${BASE_URL}/image/${latestFeatureBlog.image_path}`}
                            alt="Card image"
                          />
                          <div className={Design.cardOverlay}>
                            <Card.Title>{latestFeatureBlog.title}</Card.Title>
                            <p style={{ marginBottom: "40px" }}>
                              <span>{latestFeatureBlog.author}</span>
                              <span
                                style={{
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                }}
                              >
                                |{" "}
                              </span>
                              <span>
                                {formatDate(latestFeatureBlog.created)}
                              </span>
                            </p>

                            {/* <p>Blog Desc</p> */}
                          </div>
                        </Card>
                      </>
                    )}
                  </Col>
                  <Col xs={12} sm={12} md={4}>
                    <div
                      className={`${Design.blogSideSection} ${Design.thumbnail}`}
                    >
                      {featuredBlogs.map((blog, index) => (
                        <div
                          key={index}
                          className={Design.thumbnailItem}
                          onClick={() => toBlog(blog.id)}
                        >
                          <img
                            src={`${BASE_URL}/image/${blog.image_path}`}
                            alt="Blog thumbnail"
                          />
                          <div className={Design.thumbnailContent}>
                            <p className={Design.thumbnailTitle}>
                              {blog.title.length > 10
                                ? `${blog.title.slice(0, 10)}...`
                                : blog.title}
                            </p>
                            <p className={Design.thumbnailAuthor}>
                              {blog.author}
                            </p>{" "}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              <></>
            )}

            <div className={Design.sectionHeading}>
              <h2>Browse blogs by Category</h2>
            </div>

            {categoryBlogs.map((category) => (
              <div key={category.id}>
                {category.blogs && category.blogs.length > 0 ? (
                  <div>
                    <Row key={category.id} className={Design.cardSliderSection}>
                      <Col xs={12} sm={12} md={2}>
                        <div>
                          <div className="sectionHeading">
                            <span>More On</span>
                            <h2>{category.name}</h2>
                            <p>
                              Find featured blogs on{" "}
                              {category.name.toLowerCase()}.
                            </p>
                            <a href={`/blogs/category/${category.id}`} style={{textDecoration: "none",color:"#67782d"}}>
                              View all
                            </a>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={10}>
                        <Carousel
                          interval={null}
                          controls={true}
                          indicators={false}
                          className="carousel"
                        >
                          {createChunks(category.blogs).map(
                            (chunk: any[], index: Key | null | undefined) => (
                              <Carousel.Item key={index}>
                                <div className="d-flex justify-content-around">
                                  {chunk.map((blog, blogIndex) => (
                                    <Card
                                      key={blogIndex}
                                      style={{ width: "16rem" }}
                                      className="paddingCard"
                                      onClick={() => toBlog(blog.id)}
                                    >
                                      <div className={Design.imageContainer}>
                                        <Card.Img
                                          variant="top"
                                          src={`${BASE_URL}/image/${blog.image_path}`}
                                          style={{
                                            padding: "12px 6px 0 6px",
                                            width: "238px",
                                            height: "261px",
                                          }}
                                        />
                                      </div>
                                      <Card.Body>
                                        <Card.Title>{blog.title}</Card.Title>
                                        <Card.Text>
                                          {stripHtmlAndTruncate(blog.html)}
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  ))}
                                </div>
                              </Carousel.Item>
                            )
                          )}
                        </Carousel>
                      </Col>
                    </Row>
                    <hr className={Design.bt}></hr>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}

            <div className={Design.cta}>
              <CTA />
            </div>
            <div className={Design.latestBlogTitle}>
              <h2>Latest Posts</h2>
              <p>Read on the latest Blogs.</p>
            </div>
            <Row>
              <Col xs={12} md={12}>
                <div
                  className={`${Design.blogSideSection} ${Design.latestBlog}`}
                >
                  {blogs.slice(0, 4).map((blog, index) => (
                    <div
                      key={index}
                      className={Design.latestBlogItem}
                      onClick={() => toBlog(blog.id)}
                    >
                      <img
                        src={`${BASE_URL}/image/${blog.image_path}`}
                        alt={blog.title}
                        style={{ width: "350px", height: "200px" }}
                      />
                      <div className={Design.latestBlogContent}>
                        <p className={Design.latestBlogTitle}>{blog.title}</p>
                        <p className={Design.latestBlogAuthor}>{blog.author}</p>
                        {/* <p className="latestBlogDescription">
                        {blog.description || "No description available."}
                      </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
          <SocialFooter />
        </div>
      )}
    </div>
  );
};

export default Blogs;
