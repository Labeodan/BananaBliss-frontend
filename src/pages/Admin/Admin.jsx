import styles from './Admin.module.scss';
import { useState } from 'react';
function Admin() {
  const [isEditModalActive, setIsEditModalActive] = useState(false);

  const openEditModal = (itemId) => {
    setIsEditModalActive(true);
  };

  const closeEditModal = () => {
    setIsEditModalActive(false);
  };

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      {/* Overview Section */}
      <div className={styles.metrics}>
        <div className={styles.metricBox}>
          <p className={styles.metricTitle}>Total Sales</p>
          <p>$5,430.00</p>
        </div>
        <div className={styles.metricBox}>
          <p className={styles.metricTitle}>Total Orders</p>
          <p>150</p>
        </div>
        <div className={styles.metricBox}>
          <p className={styles.metricTitle}>Popular Products</p>
          <p>Banana Bread with Chocolate Chips</p>
        </div>
      </div>

      {/* Orders Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>Recent Orders</div>
        <div className={styles.order}>
          <div className={styles.orderDetails}>
            <p><strong>Order #1234</strong> - John Doe</p>
            <p>2x Banana Bread with Chocolate Chips - $18.00</p>
            <p>Delivery Date: November 10, 2024</p>
          </div>
          <div className={styles.orderActions}>
            <button className={`${styles.button} ${styles.approve}`}>Confirm</button>
            <button className={`${styles.button} ${styles.modify}`}>Modify</button>
            <button className={`${styles.button} ${styles.reject}`}>Reject</button>
          </div>
        </div>
        <div className={styles.order}>
          <div className={styles.orderDetails}>
            <p><strong>Order #1235</strong> - Mary Smith</p>
            <p>1x Classic Banana Bread - $15.00</p>
            <p>Delivery Date: November 12, 2024</p>
          </div>
          <div className={styles.orderActions}>
            <button className={`${styles.button} ${styles.modify}`}>Modify</button>
            <button className={`${styles.button} ${styles.delete}`}>Delete</button>
          </div>
        </div>
      </div>

      {/* Product Management Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>Product Management</div>

        {/* Existing Product Example */}
        <div className={styles.breadItem} id="bread-1">
          <div className={styles.breadDetails}>
            <p><strong>Classic Banana Bread</strong></p>
            <p>Description: Moist and delicious with a hint of vanilla.</p>
            <p>Price: $15.00</p>
          </div>
          <div className={styles.breadActions}>
            <button className={`${styles.button} ${styles.modify}`} onClick={() => openEditModal('bread-1')}>Edit</button>
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
              <button type="submit" className={`${styles.button} ${styles.save}`}>Save Changes</button>
              <button type="button" className={`${styles.button} ${styles.cancel}`} onClick={closeEditModal}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Admin
