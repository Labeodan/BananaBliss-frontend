import { useState, useEffect } from 'react';
import styles from './Admin.module.scss';
import { getOrders, updateOrder } from "../../services/order";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // For the edit modal

  // Fetch orders and categorize them
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await getOrders();
        if (allOrders) {
          const ordersData = allOrders.data;
          setOrders(ordersData);
          categorizeOrders(ordersData);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error getting orders", error);
      }
    };

    fetchOrders();
  }, []);

  const categorizeOrders = (orders) => {
    const pending = orders.filter(order => order.status === "pending");
    const accepted = orders.filter(order => order.status === "completed");
    setPendingOrders(pending);
    setAcceptedOrders(accepted);
  };

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      console.log(newStatus)
      await updateOrder(orderId, { status: newStatus });
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      categorizeOrders(updatedOrders);
    } catch (error) {
      console.log(`Error updating order ${orderId} status`, error);
    }
  };

  // Open edit message modal
  const openEditModal = (order) => {
    setSelectedOrder(order);
    setIsEditModalActive(true);
  };

  // Close edit message modal
  const closeEditModal = () => {
    setSelectedOrder(null);
    setIsEditModalActive(false);
  };

  // Save the edited message
  const saveMessage = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedMessage = formData.get("message");

    try {
      await updateOrder(selectedOrder.id, { message: updatedMessage });
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id ? { ...order, message: updatedMessage } : order
      );
      setOrders(updatedOrders);
      closeEditModal();
    } catch (error) {
      console.log("Error updating order message", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
       {/* Overview Section */}
       <div className={styles.metrics}>
        <div className={styles.metricBox}>
          <p className={styles.metricTitle}>Total Sales</p>
          <p>${acceptedOrders.reduce((total, order) => total + Number(order.total_price), 0)}</p>
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

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          {/* Pending Orders Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Pending Orders</div>
            {pendingOrders.map(order => (
              <div key={order.id} className={styles.order}>
                <div className={styles.orderDetails}>
                  <p><strong>Order #{order.id}</strong></p>
                  {order.order_products.map(product => (
                    <p key={product.bread.name}>2x {product.bread.name}</p>
                  ))}
                  <p><b>-Total: ${order.total_price}</b></p>
                  <p><b>Message:</b> {order.message || "No message"}</p>
                </div>
                <div className={styles.orderActions}>
                  <button
                    className={`${styles.button} ${styles.approve}`}
                    onClick={() => handleStatusChange(order.id, "completed")}
                  >
                    Confirm
                  </button>
                  <button
                    className={`${styles.button} ${styles.reject}`}
                    onClick={() => handleStatusChange(order.id, "canceled")}
                  >
                    Reject
                  </button>
                  <button
                    className={`${styles.button} ${styles.modify}`}
                    onClick={() => openEditModal(order)}
                  >
                    Edit Message
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Accepted Orders Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Accepted Orders</div>
            {acceptedOrders.map(order => (
              <div key={order.id} className={styles.order}>
                <div className={styles.orderDetails}>
                  <p><strong>Order #{order.id}</strong></p>
                  {order.order_products.map(product => (
                    <p key={product.bread.name}>2x {product.bread.name}</p>
                  ))}
                  <p><b>-Total: ${order.total_price}</b></p>
                  <p><b>Message:</b> {order.message || "No message"}</p>
                </div>
              </div>
            ))}
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
          {/* Edit Message Modal */}
          {isEditModalActive && selectedOrder && (
            <div className={`${styles.modal} ${styles.active}`}>
              <div className={styles.modalHeader}>
                <h3>Edit Message</h3>
                <button onClick={closeEditModal}>X</button>
              </div>
              <form className={styles.formContainer} onSubmit={saveMessage}>
                <textarea
                  name="message"
                  defaultValue={selectedOrder.message || ""}
                  required
                />
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
        </>
      )}
    </div>
  );
};

export default Admin;
