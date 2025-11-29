import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <header className="app-header" id="main-header">
                    <div className="logo">ShopPA</div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/cart" id="cart-link">Cart</Link>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
