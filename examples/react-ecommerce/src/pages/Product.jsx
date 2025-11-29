import { useParams, Link } from 'react-router-dom';

function Product() {
    const { id } = useParams();

    return (
        <div className="product-page">
            <Link to="/" className="back-link">← Back to Home</Link>
            <div className="product-details" id="product-details">
                <h1>Product {id}</h1>
                <p>This is a detailed description of the product. It has amazing features.</p>
                <button className="btn add-to-cart" id="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    );
}

export default Product;
