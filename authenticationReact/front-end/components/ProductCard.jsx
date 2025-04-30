import "./card.css";
function ProductCard({ product }) {
  return (
    <>
      <div className="card">
        <img
          src={product.images[0]}
          alt="You caught us off-guard!"
          className="product-img"
        ></img>
        <div className="product-info">
          <p className="product-title-price">name: {product.title}</p>
          <p className="product-title-price">price: {product.price}</p>
          <p className="product-description">
            description: {product.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
