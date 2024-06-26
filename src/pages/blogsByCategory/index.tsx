import Design from "./blogsByCategory.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import blogCard from "../../assets/images/home/blogCard.png";
import CTA from "../../components/callToAction";
import SocialFooter from "../../components/socialFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/applicationConstants";
import LoadingScreen from "../../components/loader/LoadingScreen";

interface Item {
  title: string;
  author: string;
  date: string;
  description: string;
}

interface CardSliderProps {
  items: Item[];
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

const BlogsByCategory: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryBlogs, setCategoryBlogs] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loadingScreen, setLoadingScreen] = useState(false);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxCardHeight, setMaxCardHeight] = useState<number>(0);

  useEffect(() => {
    setLoadingScreen(true);
    axios
      .get(`${BASE_URL}/blog/category`, { params: { category_id: id } })
      .then((res) => {
        setCategoryBlogs(res.data.data);
        setLoadingScreen(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoadingScreen(false);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/category/${id}`)
      .then((res) => {
        setCategoryName(res.data.data.name);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

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
    if (cardRefs.current.length > 0) {
      const heights = cardRefs.current.map(ref => ref?.clientHeight || 0);
      setMaxCardHeight(Math.max(...heights));
    }
  }, [categoryBlogs, blogs]);

  const toBlog = (id: string) => {
    navigate(`/blogs/${id}`)
  }
  function stripHtmlAndTruncate(html: string, length: number) {
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
            <div className={Design.sectionHeading}>
              <h2>More on <span>{categoryName}</span></h2>
            </div>
            <div className={Design.sectionHeading}>
              <p>Find featured blogs on diabetics.</p>
            </div>
            <div className={Design.blogsSection}>
              <Row className="row-cols-1 row-cols-md-4 g-4 mt-4">
                {categoryBlogs.map((blog, index) => (
                  <Col xs={12} sm={6} md={3} key={index}>
                    <div className={Design.cardsRow}>
                      <Card 
                        ref={(el: HTMLDivElement | null) => cardRefs.current[index] = el} 
                        style={{ width: "20rem", minHeight: `${maxCardHeight}px` }} 
                        onClick={() => toBlog(blog.id)}
                      >
                        <Card.Img
                          variant="top"
                          src={blogCard}
                          style={{ padding: "14px" }}
                        />
                        <Card.Body>
                        <Card.Title className=".card-title-custom">
                              {blog.title.length > 55
                                ? blog.title.slice(0, 55) + "..."
                                : blog.title}
                            </Card.Title>
                          <Card.Text>{blog.author}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            <div className={Design.cta}>
              <CTA />
            </div>

            <div className={Design.latestBlogTitle}>
              <h2>Latest Posts</h2>
              <p>Read on the latest Blogs.</p>
            </div>
            <Row>
              <Col xs={12} md={12}>
                <div className={Design.latestBlog}>
                  {blogs.slice(0, 4).map((blog, index) => (
                    <div
                      key={index}
                      className={Design.latestBlogItem}
                      onClick={() => toBlog(blog.id)}
                    >
                      <div className={Design.latestBlogImageWrapper}>
                        <img
                          src={`${BASE_URL}/image/${blog.image_path}`}
                          alt={blog.title}
                          className={Design.latestBlogImage}
                        />
                      </div>
                      <div className={Design.latestBlogContent}>
                        <p className={Design.latestBlogTitle}>{blog.title}</p>
                        <p className={Design.latestBlogAuthor}>{blog.author}</p>
                        <p>
                          {stripHtmlAndTruncate(blog.html, 600)} &nbsp;{" "}
                          <a onClick={() => toBlog(blog.id)}>Read More</a>
                        </p>
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

export default BlogsByCategory;
