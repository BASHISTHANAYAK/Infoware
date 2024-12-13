import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import Link from 'next/link';

type ProductOffer = {
  id: number;
  title: string;
  price: number;
  image: string;
  timestamp: number;
};

const InteractiveVideoPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentOffer, setCurrentOffer] = useState<ProductOffer | null>(null);
  const dispatch = useDispatch();

  // Define product offers
  const offers: ProductOffer[] = [
    {
      id: 1,
      title: 'Product A',
      price: 19.99,
      image: 'https://via.placeholder.com/100',
      timestamp: 10, // Show at 10 seconds
    },
    {
      id: 2,
      title: 'Product B',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
      timestamp: 20, // Show at 20 seconds
    },
  ];

  // Handle video playback progress
  const handleProgress = (state: { playedSeconds: number }) => {
    const currentTime = state.playedSeconds;
    setCurrentTime(currentTime);

    const offer = offers.find(
      (offer) => Math.abs(offer.timestamp - currentTime) < 2 // Show overlay if within 2 seconds
    );

    if (offer && currentOffer?.id !== offer.id) {
      setCurrentOffer(offer);
      setTimeout(() => setCurrentOffer(null), 5000); // Hide overlay after 5 seconds
    }
  };

  // Add product to cart
  const handleAddToCart = (product: ProductOffer) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    alert(`${product.title} added to cart!`);
  };

  return (
    <div style={{ position: 'relative', width: '80%', margin: 'auto' }}>
      <ReactPlayer
        url="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
        controls
        onProgress={handleProgress}
        width="100%"
        height="100%"
      />
      {/* Overlay for product offer */}
      {currentOffer && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #ccc',
            padding: '10px',
            zIndex: 10,
          }}
        >
          <h3>{currentOffer.title}</h3>
          <img
            src={currentOffer.image}
            alt={currentOffer.title}
            style={{ width: '50px', height: '50px' }}
          />
          <p>${currentOffer.price}</p>
          <button onClick={() => handleAddToCart(currentOffer)}>Add to Cart</button>
        </div>
      )}
      {/* Back to Home Button */}
      <Link href="/">
        <button style={{ marginTop: '20px' }}>Back to Home</button>
      </Link>
    </div>
  );
};

export default InteractiveVideoPlayer;
