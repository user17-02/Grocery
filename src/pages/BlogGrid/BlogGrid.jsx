import React from 'react';
import './BlogGrid.css';
import { FiSearch, FiCalendar, FiUser, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import blog1 from '../../assets/1 (1).webp';
import blog2 from '../../assets/2 (1).webp';
import blog3 from '../../assets/3 (1).webp';
import blog4 from '../../assets/4.webp';
import NeedHelp from '../../components/Home/NeedHelp';

const BlogGrid = () => {
    const blogPosts = [
        {
            id: 1,
            title: "There Are Many Variation of Passages of Lorem Ipsum Available",
            date: "10 Feb, 2023",
            author: "Admin",
            image: blog1,
            excerpt: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making..."
        },
        {
            id: 2,
            title: "The Standard Chunk Of Lorem Ipsum Used Since",
            date: "12 Feb, 2023",
            author: "Admin",
            image: blog2,
            excerpt: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making..."
        },
        {
            id: 3,
            title: "The Standard Chunk Of Lorem Ipsum Used Since",
            date: "15 Feb, 2023",
            author: "Admin",
            image: blog3,
            excerpt: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making..."
        },
        {
            id: 4,
            title: "There Are Many Variation of Passages of Lorem Ipsum Available",
            date: "18 Feb, 2023",
            author: "Admin",
            image: blog4,
            excerpt: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making..."
        }
    ];

    return (
        <div className="blog-grid-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Blog Grid</h2>
                        <nav className="breadcrumb-nav">
                            <a href="/">Home</a>
                            <span className="separator">&gt;</span>
                            <span className="current">Blog Grid</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Main Blog Area */}
            <section className="blog-main-area section-padding">
                <div className="container">
                    <div className="blog-wrapper">
                        {/* Sidebar */}
                        <aside className="blog-sidebar">
                            <div className="sidebar-widget search-widget">
                                <h4 className="widget-title">Search</h4>
                                <div className="search-box">
                                    <input type="text" placeholder="Search blog..." />
                                    <button><FiSearch /></button>
                                </div>
                            </div>

                            <div className="sidebar-widget category-widget">
                                <h4 className="widget-title">Categories</h4>
                                <ul>
                                    <li><a href="#">Organic Food <span>(10)</span></a></li>
                                    <li><a href="#">Fresh Vegetables <span>(08)</span></a></li>
                                    <li><a href="#">Healthy Fruit <span>(07)</span></a></li>
                                    <li><a href="#">Dairy Products <span>(05)</span></a></li>
                                    <li><a href="#">Uncategorized <span>(02)</span></a></li>
                                </ul>
                            </div>

                            <div className="sidebar-widget recent-posts">
                                <h4 className="widget-title">Recent Posts</h4>
                                <div className="recent-posts-list">
                                    {blogPosts.slice(0, 3).map(post => (
                                        <div className="recent-p-item" key={post.id}>
                                            <div className="r-post-img">
                                                <img src={post.image} alt={post.title} />
                                            </div>
                                            <div className="r-post-content">
                                                <h6><a href="#">{post.title.substring(0, 30)}...</a></h6>
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-widget tags-widget">
                                <h4 className="widget-title">Tags</h4>
                                <div className="tag-cloud">
                                    <a href="#">Food</a>
                                    <a href="#">Healthy</a>
                                    <a href="#">Organic</a>
                                    <a href="#">Fresh</a>
                                    <a href="#">Vegetables</a>
                                    <a href="#">Fruit</a>
                                </div>
                            </div>
                        </aside>

                        {/* Post Grid */}
                        <div className="blog-grid-content">
                            <div className="posts-grid">
                                {blogPosts.map(post => (
                                    <article className="blog-card" key={post.id}>
                                        <div className="post-thumb">
                                            <a href="#"><img src={post.image} alt={post.title} /></a>
                                        </div>
                                        <div className="post-content">
                                            <div className="post-meta">
                                                <span><FiCalendar /> {post.date}</span>
                                                <span className="divider">|</span>
                                                <span><FiUser /> By {post.author}</span>
                                            </div>
                                            <h3 className="post-title"><a href="#">{post.title}</a></h3>
                                            <p className="post-excerpt">{post.excerpt}</p>
                                            <a href="#" className="read-more">Read More <FiChevronRight /></a>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="pagination">
                                <ul>
                                    <li className="prev"><a href="#"><FiChevronLeft /></a></li>
                                    <li className="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li className="next"><a href="#"><FiChevronRight /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <NeedHelp />
        </div>
    );
};

export default BlogGrid;
