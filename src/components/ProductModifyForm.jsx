import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductModify = () => {
    const [product, setProduct] = useState({
        name: '',
        type: '',
        price: '',
        description: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleModify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Make the POST request to modify the product
            const response = await fetch('https://darkorchid-tapir-476375.hostingersite.com/api/products/modify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message || 'Failed to modify product');
            } else {
                setSuccess(true);
                setProduct({ name: '', type: '', price: '', description: '' });  // Reset form
            }
        } catch (err) {
            setError('An error occurred while modifying the product');
        } finally {
            setLoading(false);
        }
    };

    const goToModifyForm = () => {
        navigate("/ProductForm");
    };

    return (
        <div className="product-form-container">
            <h2>Modify a Product</h2>
            {success && <p style={{ color: 'green' }}>Product modified successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleModify}>
                <div className="name">
                    <input
                        placeholder="Enter the product name"
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="type">
                    <input
                        placeholder="Enter the product type"
                        type="text"
                        name="type"
                        value={product.type}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Modifying...' : 'Modify Product'}
                </button>
                <button type="button" onClick={goToModifyForm}>
                    Go to Product Form
                </button>
            </form>
        </div>
    );
};

export default ProductModify;
