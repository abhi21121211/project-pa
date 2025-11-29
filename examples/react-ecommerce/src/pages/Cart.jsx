import { Link } from 'react-router-dom';

function Cart() {
    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items" id="cart-items">
                <div className="cart-item">
                    <span>Awesome Gadget</span>
                    <span>$99</span>
                </div>
            </div>
            <div className="cart-summary">
                <p>Total: $99</p>
                <button className="btn checkout-btn" id="checkout-btn">Checkout</button>
            </div>
            <Link to="/">Continue Shopping</Link>
        </div>
    );
}

export default Cart;
