import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './ShopFullWidth.css';
import { FiGrid, FiList, FiStar, FiShoppingBag, FiHeart, FiRefreshCw, FiSearch } from 'react-icons/fi';
import NeedHelp from '../../components/Home/NeedHelp';
import breadcrumbBg from '../../assets/1-1 (2).webp';
import productApi from '../../api/productApi';
import cartApi from '../../api/cartApi';

import ProductCard from '../../components/Product/ProductCard';

const ShopFullWidth = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productApi.getAll({ 
                    pageNumber: page,
                    category: categoryId
                });
                const productList = data.products ? data.products : (Array.isArray(data) ? data : []);
                setProducts(productList);
                setPages(data.pages || 1);
                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to load products. Please ensure the backend is running.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page, categoryId]);

    const handleAddToCart = async (product) => {
        // This is now handled within ProductCard, but keeping here for list view button if needed
        // Actually, let's just use ProductCard for both to keep logic centered.
    };

    if (loading) return <div className="container section-padding"><p>Loading shop...</p></div>;
    if (error) return <div className="container section-padding"><p className="error-message">{error}</p></div>;

    return (
        <div className="shop-page">
            {/* Breadcrumb Section */}
            <section className="shop-breadcrumb" style={{ backgroundImage: `url("${breadcrumbBg}")` }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Shop Fullwidth</h2>
                        <nav className="breadcrumb-nav">
                            <Link to="/">Home</Link>
                            <span className="separator">&gt;</span>
                            <span className="current">Shop</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Shop Main Content */}
            <div className="shop-main-area section-padding">
                <div className="container">
                    {/* Toolbar */}
                    <div className="shop-toolbar">
                        <div className="toolbar-left">
                            <div className="view-mode">
                                <button
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                    title="Grid View"
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                    title="List View"
                                >
                                    <FiList />
                                </button>
                            </div>
                            <p className="result-count">Showing {products.length} results</p>
                        </div>
                        <div className="toolbar-right">
                            <div className="sort-by">
                                <label>Short by:</label>
                                <select>
                                    <option value="default">Default sorting</option>
                                    <option value="popularity">Sort by popularity</option>
                                    <option value="rating">Sort by average rating</option>
                                    <option value="latest">Sort by latest</option>
                                    <option value="price-low">Sort by price: low to high</option>
                                    <option value="price-high">Sort by price: high to low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid/List */}
                    <div className={`product-wrapper ${viewMode}`}>
                        {products.length === 0 ? (
                            <div className="no-products"><p>No products found.</p></div>
                        ) : (
                            products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {pages > 1 && (
                        <div className="shop-pagination">
                            <ul className="pagination-list">
                                {[...Array(pages).keys()].map(x => (
                                    <li key={x + 1} className={x + 1 === page ? 'active' : ''}>
                                        <button onClick={() => setPage(x + 1)}>{x + 1}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <NeedHelp />
        </div>
    );
};

export default ShopFullWidth;
