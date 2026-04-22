import React from 'react';
import './LatestPost.css';
const blog1 = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop';
const blog2 = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop';
const blog3 = 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=600&auto=format&fit=crop';
const blog4 = 'https://images.unsplash.com/photo-1490818387583-1baba5e6382b?q=80&w=600&auto=format&fit=crop';

const posts = [
    { id: 1, title: 'There Are Many Variation of Passages of Lorem Ipsum Available', date: 'April 24, 2023', author: 'Organic', image: blog1 },
    { id: 2, title: 'There Are Many Variation of Passages of Lorem Ipsum Available', date: 'April 22, 2023', author: 'Farm', image: blog2 },
    { id: 3, title: 'The Standard Chunk Of Lorem Ipsum Used Since', date: 'April 18, 2023', author: 'Healthy', image: blog3 },
    { id: 4, title: 'There Are Many Variation of Passages of Lorem Ipsum Available', date: 'April 15, 2023', author: 'Fresh', image: blog4 },
];

const LatestPost = () => {
    return (
        <section className="latest-post section-padding">
            <div className="container">
                <div className="section-title text-center">
                    <span className="subtitle">Latest Blog</span>
                    <h2>Our <span>Latest Post</span></h2>
                </div>

                <div className="posts-grid">
                    {posts.map(post => (
                        <article key={post.id} className="post-card">
                            <div className="post-image">
                                <img src={post.image} alt={post.title} />
                            </div>
                            <div className="post-content">
                                <div className="post-meta">
                                    <span className="post-author">By {post.author}</span>
                                    <span className="post-date">{post.date}</span>
                                </div>
                                <h3 className="post-title"><a>{post.title}</a></h3>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestPost;
