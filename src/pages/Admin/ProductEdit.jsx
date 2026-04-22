import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import adminApi from '../../api/adminApi';
import productApi from '../../api/productApi';
import './AdminDashboard.css'; // Reusing admin styles

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [discountPrice, setDiscountPrice] = useState(0);
    const [isFeatured, setIsFeatured] = useState(false);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch product details
                const product = await productApi.getById(id);

                setName(product.name || '');
                setPrice(product.price || 0);
                setImage(product.image || '');
                setBrand(product.brand || '');
                setCategory(product.category?._id || product.category || '');
                setCountInStock(product.countInStock || 0);
                setDescription(product.description || '');
                setDiscountPrice(product.discountPrice || 0);
                setIsFeatured(product.isFeatured || false);

                // Fetch categories
                const categoriesData = await productApi.getCategories();
                setCategories(categoriesData || []);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const uploadedPath = await adminApi.uploadImage(formData);
            setImage(uploadedPath);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await adminApi.updateProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
                discountPrice,
                isFeatured,
            });
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Failed to update product');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-container">
            <Link to="/admin/dashboard" className="btn-back">Go Back</Link>

            <div className="form-container">
                <h1>Edit Product</h1>
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={price ?? 0}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Image</label>
                        <div className="image-input-container" style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                            <input
                                type="text"
                                placeholder="Enter image url"
                                value={image || ''}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <input
                                type="file"
                                id="image-file"
                                onChange={uploadFileHandler}
                            />
                        </div>
                        {uploading && <p>Uploading...</p>}
                    </div>

                    <div className="form-group">
                        <label>Brand</label>
                        <input
                            type="text"
                            placeholder="Enter brand"
                            value={brand || ''}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={category || ''}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Count In Stock</label>
                        <input
                            type="number"
                            placeholder="Enter countInStock"
                            value={countInStock ?? 0}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Discount Price</label>
                        <input
                            type="number"
                            placeholder="Enter discount price"
                            value={discountPrice ?? 0}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group checkbox-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="checkbox"
                            id="isFeatured"
                            checked={!!isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                        />
                        <label htmlFor="isFeatured">Is Featured Product?</label>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            placeholder="Enter description"
                            value={description || ''}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn-primary">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;
