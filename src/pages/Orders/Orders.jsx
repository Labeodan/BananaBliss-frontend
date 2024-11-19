import { useState, useEffect } from "react";
import { getOrders } from "../../services/order";
import styles from "./Orders.module.scss"

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

  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "statusAccepted";
      case "pending":
        return "statusPending";
      case "rejected":
        return "statusRejected";
      default:
        return "";
    }
  };

  if (loading) return <p className={styles.loadingMessage}>Loading orders...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <div className={styles.orderStatusContainer}>
      <h1>Your Order Status</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <h2>Order ID: {order.id}</h2>
            {/* <p>
              <strong>Items Purchased:</strong> {order.order_products}
            </p> */}
            <p>
              <strong>Total Cost:</strong> ${order.total_price}
            </p>
            <p className={`${styles[getStatusClass(order.status)]}`}
            >
              Status: {order.status}
            </p>
            <p className={styles.orderMessage}>{order.message}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
