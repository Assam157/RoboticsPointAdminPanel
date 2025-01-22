import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDelete = () => {
    const [product, setProduct] = useState({
        name: '',
        type: '',
    });
    const Navigate = useNavigate();
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

    const handleDelete = async (e) => {
        e.preventDefault();  // Prevent default form submission
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Make sure to use DELETE method here
            const response = await fetch("https://enigmatic-shelf-01881-15c9cb2f80b1.herokuapp.com/delete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: product.name,
                    type: product.type,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message || 'Failed to delete product');
            } else {
                setSuccess(true);
                setProduct({ name: '', type: '' });  // Reset form on success
            }
        } catch (err) {
            setError('An error occurred while deleting the product');
        } finally {
            setLoading(false);
        }
    };

    const goToModifyForm = () => {
        Navigate("/ProductModify");
    };

    return (
        <div className='product-form-container'>
            <h2>Delete a Product</h2>
            {success && <p style={{ color: 'green' }}>Product deleted successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleDelete}>
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete Product'}
                </button>
                <button type="button" onClick={goToModifyForm}>
                    Go to Modify Form
                </button>
            </form>
        </div>
    );
};

export default ProductDelete;
