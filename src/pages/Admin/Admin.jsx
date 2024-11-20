import { useState, useEffect } from "react";
import styles from "./Admin.module.scss";
import { getOrders } from "../../services/order";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalActive, setIsEditModalActive] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await getOrders();
        if (allOrders) {
          const fetchedOrders = allOrders.data;

          // Filter pending orders and those with order_products
          const filteredPendingOrders = fetchedOrders.filter(
            (order) => order.status === "pending" && order.order_products.length > 0
          );

          setOrders(fetchedOrders);
          setPendingOrders(filteredPendingOrders);
        }
      } catch (error) {
        console.error("Error getting orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openEditModal = (itemId) => {
    setIsEditModalActive(true);
  };

  const closeEditModal = () => {
    setIsEditModalActive(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      {/* Overview Section */}
      <div className={styles.metrics}>
        <div className={styles.metricBox}>
          <p className={styles.metricTitle}>Total Sales</p>
          <p>${orders.reduce((total, order) => total + Number(order.total_price), 0)}</p>
        </div>
        <div className={styles.metricBox}>
          <p className={styles.metricTitle}>Total Orders</p>
          <p>{orders.length}</p>
        </div>
        <div className={styles.metricBox}>
          <p className={styles.metricTitle}>Pending Orders</p>
          <p>{pendingOrders.length}</p>
        </div>
      </div>

      {/* Orders Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>Recent Pending Orders</div>
        {pendingOrders.length === 0 ? (
          <p>No pending orders to display.</p>
        ) : (
          pendingOrders.map((order) => (
            <div key={order.id} className={styles.order}>
              <div className={styles.orderDetails}>
                <p>
                  <strong>Order #{order.id}</strong>
                </p>
                {order.order_products.map((product) => (
                  <p key={product.bread.name}>
                    {product.quantity}x {product.bread.name}
                  </p>
                ))}
                <p>
                  <b>-Total: ${order.total_price}</b>
                </p>
              </div>
              <div className={styles.orderActions}>
                <button className={`${styles.button} ${styles.approve}`}>Confirm</button>
                <button className={`${styles.button} ${styles.modify}`}>Modify</button>
                <button className={`${styles.button} ${styles.reject}`}>Reject</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Product Management Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>Product Management</div>

        {/* Existing Product Example */}
        <div className={styles.breadItem} id="bread-1">
          <div className={styles.breadDetails}>
            <p>
              <strong>Classic Banana Bread</strong>
            </p>
            <p>Description: Moist and delicious with a hint of vanilla.</p>
            <p>Price: $15.00</p>
          </div>
          <div className={styles.breadActions}>
            <button
              className={`${styles.button} ${styles.modify}`}
              onClick={() => openEditModal("bread-1")}
            >
              Edit
            </button>
            <button className={`${styles.button} ${styles.delete}`}>Delete</button>
          </div>
        </div>

        {/* Add New Product Form */}
        <div className={styles.formContainer}>
          <h3>Add New Product</h3>
          <input type="text" placeholder="Product Name" required />
          <textarea placeholder="Description" required />
          <input type="number" placeholder="Price" step="0.01" required />
          <input type="file" accept="image/*" />
          <button className={`${styles.button} ${styles.add}`}>Add Product</button>
        </div>
      </div>

      {/* Edit Product Modal */}
      {isEditModalActive && (
        <div className={`${styles.modal} ${styles.active}`}>
          <div className={styles.modalHeader}>
            <h3>Edit Product</h3>
            <button onClick={closeEditModal}>X</button>
          </div>
          <form className={styles.formContainer}>
            <input id="editName" type="text" placeholder="Product Name" required />
            <textarea id="editDescription" placeholder="Description" required />
            <input id="editPrice" type="number" placeholder="Price" step="0.01" required />
            <input type="file" accept="image/*" />
            <div className={styles.modalFooter}>
              <button type="submit" className={`${styles.button} ${styles.save}`}>
                Save Changes
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.cancel}`}
                onClick={closeEditModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
