import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import fetchProducts from "../services/api";
function Home({ res, setadmin }) {
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
      <div className="navbar">
        <div className="nav-logo">InstiStore</div>
        <div className="nav-links">
          <p>{res.username}</p>
          {res.database ? (
            <button onClick={() => setadmin(true)}>Admin</button>
          ) : null}
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
  );
}

export default Home;
