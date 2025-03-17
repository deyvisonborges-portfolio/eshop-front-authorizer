"use client"

import styles from "./cart.module.css"
import { useCart } from "../use-cart"

export function CartPage() {
  const { cartItems, handleRemoveItem } = useCart()

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className={styles.productCell}>
                <img
                  src={item.miniThumbUrl}
                  alt={item.name}
                  width={50}
                  height={50}
                  className={styles.productImage}
                />
                <span>{item.name}</span>
                <span>Tamanho: {item.size}</span>
                <span>Cor: {item.color}</span>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className={styles.quantityInput}
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveItem(Number(item.id))}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.cartSummary}>
        <div className={styles.total}>
          <strong>Total: ${calculateTotal()}</strong>
        </div>
        <button className={styles.checkoutButton} onClick={() => null}>
          Ir para o checkout
        </button>
      </div>
    </div>
  )
}
