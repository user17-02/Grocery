import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';
import { useNavigate, Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await adminApi.getProducts();
            // Try to handle both structure formats (paginated vs array)
            const productList = data.products ? data.products : data;
            setProducts(productList);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await adminApi.deleteProduct(id);
                fetchProducts();
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const data = await adminApi.createProduct();
            // Redirect to the edit page of the newly created product
            navigate(`/admin/product/${data._id}/edit`);
        } catch (err) {
            alert('Failed to create product');
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-table-container">
            <div className="admin-header-actions">
                <h2>Products</h2>
                <button className="btn-create" onClick={createProductHandler}>
                    + Create Product
                </button>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td><span title={product._id}>{product._id.substring(0, 8)}...</span></td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category?.name || 'Uncategorized'}</td>
                            <td>{product.brand}</td>
                            <td>
                                <Link to={`/admin/product/${product._id}/edit`} className="btn-edit" style={{ marginRight: '10px', display: 'inline-block', textDecoration: 'none' }}>
                                    Edit
                                </Link>
                                <button
                                    className="btn-delete"
                                    onClick={() => deleteHandler(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
