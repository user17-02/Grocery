import React from 'react';
import './NewsSection.css';

const blogPosts = [
    { id: 1, date: 'Feb 12, 2026', author: 'Admin', title: 'The Benefits of Eating Organic Food Daily', excerpt: 'Eating organic food can lead to a healthier lifestyle and improved well-being...' },
    { id: 2, date: 'Feb 10, 2026', author: 'Admin', title: 'Top 10 Fresh Summer Fruits to Try', excerpt: 'Discover the most refreshing and vitamin-rich fruits for the upcoming summer season...' },
    { id: 3, date: 'Feb 08, 2026', author: 'Admin', title: 'How to Store Your Vegetables Properly', excerpt: 'Keep your greens fresh for longer with these simple and effective storage tips...' },
];

const NewsSection = () => {
    return (
        <section className="news-section section-padding">
            <div className="container">
                <div className="section-title">
                    <span className="subtitle">Latest News</span>
                    <h2>From Our <span>Blog</span></h2>
                </div>

                <div className="news-grid">
                    {blogPosts.map(post => (
                        <div key={post.id} className="news-item">
                            <div className="news-img">
                                <div className="placeholder-news-img">Blog Thumbnail</div>
                            </div>
                            <div className="news-content">
                                <div className="news-meta">
                                    <span>📅 {post.date}</span>
                                    <span>👤 {post.author}</span>
                                </div>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <a className="read-more">Read More &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
