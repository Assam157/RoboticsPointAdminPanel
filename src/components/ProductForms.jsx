import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
    const Navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        type: '',
        availableQuant: '' // Fix: Rename to match the field
    });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('https://roboticspointbackend-b6b7b2e85bbf.herokuapp.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message || 'Failed to submit product');
            } else {
                setSuccess(true);
                setProduct({
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    type: '',
                    availableQuant: '', // Reset the field
                });
            }
        } catch (err) {
            setError('An error occurred while submitting the product');
        } finally {
            setLoading(false);
        }
    };

    const GoToDeleteForm = () => {
        Navigate("/ProductDelete");
    };

    return (
        <div className="product-form-container">
            <h2>Add a New Product</h2>
            {success && <p style={{ color: 'green' }}>Product added successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Product Type:</label>
                    <input
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
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Max Available Amount:</label>
                    <input
                        type="number"
                        name="availableQuant" // Fix: Match the state property
                        value={product.availableQuant}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Add Product'}
                </button>
                <button type="button" onClick={GoToDeleteForm}>
                    Press here to go to ProductDeleteForm
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
