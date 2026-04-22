import React from 'react';
import './BlogDetailsFullWidth.css';
import { FiCalendar, FiUser, FiMessageSquare, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import NeedHelp from '../../components/Home/NeedHelp';

import breadcrumbBg from '../../assets/1-1 (2).webp';

const blogImg = "https://template.hasthemes.com/obrien/obrien/assets/images/blog/large-size/1.jpg";
const authorImg = "https://template.hasthemes.com/obrien/obrien/assets/images/review/1.jpg";

const BlogDetailsFullWidth = () => {
    return (
        <div className="blog-details-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Blog Details Fullwidth</h2>
                        <nav className="breadcrumb-nav">
                            <a href="/">Home</a>
                            <span className="separator">&gt;</span>
                            <span className="current">Blog Details Fullwidth</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Post Details Content */}
            <section className="blog-details-area section-padding">
                <div className="container">
                    <div className="blog-details-wrapper">
                        <div className="post-header">
                            <div className="post-thumb">
                                <img src={blogImg} alt="Blog Detail" />
                            </div>
                            <div className="post-meta">
                                <span><FiCalendar /> 10 February, 2023</span>
                                <span className="divider">|</span>
                                <span><FiUser /> By Admin</span>
                                <span className="divider">|</span>
                                <span><FiMessageSquare /> 3 Comments</span>
                            </div>
                            <h2 className="post-title">There Are Many Variation of Passages of Lorem Ipsum Available</h2>
                        </div>

                        <div className="post-content">
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.</p>

                            <blockquote>
                                "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                            </blockquote>

                            <p>Richard McClintock and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>

                            <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                        </div>

                        <div className="post-footer">
                            <div className="post-share">
                                <h6>Share this article</h6>
                                <div className="social-links">
                                    <a href="#"><FiFacebook /></a>
                                    <a href="#"><FiTwitter /></a>
                                    <a href="#"><FiInstagram /></a>
                                    <a href="#"><FiLinkedin /></a>
                                </div>
                            </div>
                            <div className="post-navigation">
                                <a href="#" className="prev-post"><FiChevronLeft /> Older Post</a>
                                <a href="#" className="next-post">Newer Post <FiChevronRight /></a>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="comments-area">
                            <h3 className="comments-title">3 Comments</h3>
                            <div className="comment-list">
                                <div className="comment-item">
                                    <div className="comment-thumb">
                                        <img src={authorImg} alt="Author" />
                                    </div>
                                    <div className="comment-info">
                                        <div className="comment-header">
                                            <h5>Duy</h5>
                                            <span className="date">July 30, 2021</span>
                                            <button className="reply-btn">Reply</button>
                                        </div>
                                        <p>Praesent bibendum risus pellentesque faucibus rhoncus. Etiam a mollis odio. Integer urna nisl, fermentum eu mollis et, gravida eu elit.</p>
                                    </div>
                                </div>
                                <div className="comment-item depth-2">
                                    <div className="comment-thumb">
                                        <img src={authorImg} alt="Author" />
                                    </div>
                                    <div className="comment-info">
                                        <div className="comment-header">
                                            <h5>Jack</h5>
                                            <span className="date">July 30, 2021</span>
                                            <button className="reply-btn">Reply</button>
                                        </div>
                                        <p>Praesent bibendum risus pellentesque faucibus rhoncus. Etiam a mollis odio. Integer urna nisl, fermentum eu mollis et, gravida eu elit.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="comment-form-area">
                                <h3>Leave a Reply</h3>
                                <p>Your email address will not be published. Required fields are marked *</p>
                                <form className="comment-form">
                                    <div className="form-group">
                                        <textarea placeholder="Your comment *" required></textarea>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <input type="text" placeholder="Name *" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" placeholder="Email *" required />
                                        </div>
                                    </div>
                                    <button type="submit" className="submit-btn">POST COMMENT</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <NeedHelp />
        </div>
    );
};

export default BlogDetailsFullWidth;
