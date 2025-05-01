import { useState, useEffect } from "react";
import "./App.css";
import LoginSignup from "../components/LoginSignup";
import ProductCard from "../components/ProductCard";
import fetchProducts from "../services/api";

function App() {
  const [res, setres] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      fetchProducts().then((data) => setProducts(data));
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      console.log("loaded");
    }
  }, []);

  return (
    <>
      {res !== "yes" ? (
        <LoginSignup res={res} setres={setres} />
      ) : (
        <>
          <div className="navbar">
            <div className="nav-logo">InstiStore</div>
            <div className="nav-links">
              <p>Home</p>
              <p>Admin</p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="page-formatting">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default App;
