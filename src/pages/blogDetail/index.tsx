import { Col, Row } from "react-bootstrap";
import CTA from "../../components/callToAction";
import Design from "./blogDetail.module.css";
import SocialFooter from "../../components/socialFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/applicationConstants";

interface Blog {
  id: string;
  title: string;
  author: string;
  image_path: string;
  image_tag: string;
  html: string;
  created: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/blog/${id}`)
      .then((res) => {
        setBlog(res.data.data);
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

  const toBlog = (id: string) => {
    navigate(`/blogs/${id}`);
  };

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

  return (
    <div className="background content-main">
      <div className={Design.blogSection}>
        {blog && (
          <>
            <div className={Design.blogMain}>
              <div className={Design.blogTitle}>
                <h2>{blog.title}</h2>
                {/* <p>Subtitle</p> */}
                <h5 style={{ marginTop: "30px" }}>
                  {blog.author}
                  <span style={{ margin: "0 20px" }}>|</span>
                  {formatDate(blog.created)}
                </h5>
              </div>
              <img
                src={`${BASE_URL}/image/${blog.image_path}`}
                style={{ width: "100%" }}
              />
              <div className={Design.blogContent}>
                <div dangerouslySetInnerHTML={{ __html: blog.html }} />
              </div>
            </div>
          </>
        )}

        <div className={Design.cta}>
          <CTA />
        </div>

        <div className={Design.latestBlogTitle}>
          <h2>Latest Posts</h2>
          <p>Read on the latest Blogs.</p>
        </div>
        <Row>
          <Col xs={12} md={12}>
            <div className={`${Design.blogSideSection} ${Design.latestBlog}`}>
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
  );
};

export default BlogDetail;
