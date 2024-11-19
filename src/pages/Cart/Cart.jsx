import { useCart } from "react-use-cart";
import styles from "./Cart.module.scss";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/order";
import { getUser } from "../../utils/token";
function Cart() {
  const user = getUser()
  const {
    items,
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    emptyCart,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isEmpty) return alert("Your cart is empty!");
    // Save the order to localStorage or an API
    // const orderId = Date.now(); // Unique ID
    const orderData = {
      order_products: items,
      total_price: cartTotal,
      status: "pending",
      user: user.user_id
     
    };
    // Create in Db
    const order =  async () => {
      try {
        const createSingleOrder = await createOrder(orderData)
        console.log(createSingleOrder)
      } catch (error) {
        console.log("error creating order")
        console.log(error)
        
      }
    } 

    order()
  

    // Clear the cart
    emptyCart();

    // Navigate to Order Status page
    navigate(`/orders`);
  }




  if (isEmpty) return <p className={styles.emptyMessage}>Your cart is empty</p>;

  return (
    <section className={styles.cartContainer}>
      <h1>Your Cart</h1>
      {items.map((item) => (
        <div className={styles.cartItem} key={item.id}>
          <div className={styles.itemInfo}>
            <div className={styles.itemName}>{item.name}</div>
            <div className={styles.itemPrice}>${item.price}</div>
            <span
              className={styles.removeItem}
              onClick={() => removeItem(item.id)}
            >
              Remove
            </span>
          </div>
          <div className={styles.quantityControls}>
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
            <input
              type="number"
              value={item.quantity}
              min="1"
              readOnly
            />
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
          <div className={styles.itemTotalPrice}>
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}
      <div className={styles.cartSummary}>
        <div className={styles.total}>Total: ${cartTotal.toFixed(2)}</div>
        <button onClick={handleCheckout} className={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </section>
  );
}

export default Cart;
