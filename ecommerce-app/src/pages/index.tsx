import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import Link from "next/link";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <div>
      <h1>Products</h1>
      {/* Updated Link */}
      <Link href="/video">Go to Video Player</Link>
      <br />
      <Link href="/cart">Go to Cart</Link>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.length>0 ? products.map((product: any) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", height: "100px" }}
            />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        )):<h1>Loading..</h1>}
      </div>
    </div>
  );
};

export default Home;
