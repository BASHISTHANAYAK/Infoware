import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart } from '../store/slices/cartSlice';
import Link from 'next/link';

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart); // Use inside the component
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <Link href="/">
        <button style={{ marginTop: '20px' }}>Back to Home</button>
      </Link>
      <h1>Shopping Cart</h1>
      {cart.items.length > 0 ? (
        <div>
          {cart.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px 0',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <h2>{item.title}</h2>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
          <h2>Total: ${cart.total.toFixed(2)}</h2>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
