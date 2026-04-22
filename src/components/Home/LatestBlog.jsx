import React from 'react';
import './LatestBlog.css';
import blog1 from '../../assets/1.jpg';
import blog2 from '../../assets/2.jpg';
import blog3 from '../../assets/3.jpg';

const blogPosts = [
    {
        id: 1,
        image: blog1,
        date: { day: '14', month: '01' },
        author: 'Obrien Demo Admin',
        title: 'There Are Many Variation of Passages of Lorem Ipsum Available',
        excerpt: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making...'
    },
    {
        id: 2,
        image: blog2,
        date: { day: '14', month: '01' },
        author: 'Obrien Demo Admin',
        title: 'There Are Many Variation of Passages of Lorem Ipsum Available',
        excerpt: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making...'
    },
    {
        id: 3,
        image: blog3,
        date: { day: '14', month: '01' },
        author: 'Obrien Demo Admin',
        title: 'The Standard Chunk Of Lorem Ipsum Used Since',
        excerpt: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making...'
    }
];

const LatestBlog = () => {
    return (
        <section className="latest-blog section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">LATEST BLOG</h2>
                    <p className="section-subtitle">
                        If you want to know about the organic product then keep <br />
                        an eye on our blog.
                    </p>
                </div>

                <div className="blog-grid">
                    {blogPosts.map(post => (
                        <div key={post.id} className="blog-card">
                            <div className="blog-image">
                                <img src={post.image} alt={post.title} />
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <div className="blog-date">
                                        <span className="day">{post.date.day}</span>
                                        <span className="month">{post.date.month}</span>
                                    </div>
                                    <span className="author">Author: {post.author}</span>
                                </div>
                                <h3 className="blog-title">{post.title}</h3>
                                <p className="blog-excerpt">{post.excerpt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestBlog;
