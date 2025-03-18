import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://onemg-1.onrender.com/product/view-pro");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle Buy Now
  const handleBuyNow = (product) => {
    const user = localStorage.getItem("user"); // Check if user is logged in
    if (user) {
      navigate("/checkout", { state: { product } });
    } else {
      alert("Login first!");
    }
  };

  // Function to handle Add to Cart
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new product with quantity
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  return (
    <div className="products-container">
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.mainImage} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-brand">Brand: {product.brand}</p>
            <p className="product-price">Price: ₹{product.price}</p>
            <p className="product-description">{product.description}</p>
            <div className="product-buttons">
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button className="buy-now" onClick={() => handleBuyNow(product)}>
                Buy Now
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Home;
