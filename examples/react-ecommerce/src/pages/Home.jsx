import { Link } from 'react-router-dom';

function Home() {
    const products = [
        { id: 1, name: 'Awesome Gadget', price: '$99' },
        { id: 2, name: 'Cool Widget', price: '$49' },
        { id: 3, name: 'Super Tool', price: '$199' },
    ];

    return (
        <div className="home">
            <h1>Welcome to ShopPA</h1>
            <div className="product-grid" id="product-grid">
                {products.map(p => (
                    <div key={p.id} className="product-card">
                        <h3>{p.name}</h3>
                        <p>{p.price}</p>
                        <Link to={`/product/${p.id}`} className="btn view-btn">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
