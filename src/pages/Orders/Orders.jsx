import { useState, useEffect } from "react";
import { getOrders, deleteOrder } from "../../services/order";
import styles from "./Orders.module.scss"
import Loading from "../Loading/Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data); // Assuming API returns an array of orders
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  const handleDeleteOrder = async (id) => {
    try {
      const deletedOrder = await deleteOrder(id)
      console.log(deletedOrder)

      const newOrdersArray = orders.filter((order)=> order.id !== id )
      setOrders(newOrdersArray)

    } catch (error) {
      console.log("Error deleting order", error)
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "statusAccepted";
      case "pending":
        return "statusPending";
      case "canceled":
        return "statusRejected";
      default:
        return "";
    }
  };

  if (loading) return (
    <Loading />
  );
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <div className={styles.orderStatusContainer}>
  <h1>Your Order Status</h1>
  {orders.length > 0 ? (
    orders.map((order) => (
      <div key={order.id} className={styles.orderCard}>
        <h2>Order ID: {order.id}</h2>
        <p>
          <strong>Total Cost:</strong> ${order.total_price}
        </p>
        <p className={`${styles[getStatusClass(order.status)]}`}>
          Status: {order.status}
        </p>
        <p className={styles.orderMessage}>
          {order.message || "No message for this order."}
        </p>
        <h3>Items Purchased:</h3>
        <ul>
          {order.order_products.map((product, index) => (
            <li key={index} className={styles.orderProduct}>
              <div className={styles.productDetails}>
                <h4>{product.bread.name}</h4>
                <p>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {order.status !== "completed"? (
          <button onClick={()=> handleDeleteOrder(order.id)}>Delete Order</button>

        ):(
          <>
          
          </>
        )}
      </div>
    ))
  ) : (
    <p>No orders found.</p>
  )}
</div>

  );
};

export default Orders;
