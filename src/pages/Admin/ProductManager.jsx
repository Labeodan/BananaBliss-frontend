import { useState, useEffect } from "react";
import styles from "./ProductManager.module.scss"; // Import your SCSS file
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/products";
import { uploadImageToCloudinary } from "../../services/upload";
import Bread from "../../components/Bread/Bread";
import Loading from "../Loading/Loading";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts.data || []);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalActive(true);
  };

  const closeEditModal = () => {
    setIsEditModalActive(false);
    setSelectedProduct(null);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;

      // Upload image to Cloudinary if an image is provided
      if (newProduct.image) {
        imageUrl = await uploadImageToCloudinary(newProduct.image);
      }

      // Create product with image URL if available
      const formData = new FormData();
      Object.keys(newProduct).forEach((key) => {
        if (key !== "image") {
          formData.append(key, newProduct[key]);
        }
      });
      if (imageUrl) {
        formData.append("image", imageUrl);
      }

      const response = await createProduct(formData);
      setProducts([...products, response.data]);
      setNewProduct({ name: "", description: "", price: "", image: null });
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = selectedProduct.image;

      // Upload new image to Cloudinary if it has changed
      if (selectedProduct.image && selectedProduct.image instanceof File) {
        imageUrl = await uploadImageToCloudinary(selectedProduct.image);
      }

      // Update product with new image URL if available
      const formData = new FormData();
      Object.keys(selectedProduct).forEach((key) => {
        if (key !== "image") {
          formData.append(key, selectedProduct[key]);
        }
      });
      formData.append("image", imageUrl);

      const response = await updateProduct(selectedProduct.id, formData);
      setProducts(
        products.map((product) =>
          product.id === response.data.id ? response.data : product
        )
      );
      closeEditModal();
    } catch (error) {
      console.error(
        "Error editing product:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] }); // Store the file object
  };

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className={styles.container}>

      <h1>Product Manager</h1>

      {/* Add New Product Form */}
      <div className={styles.formContainer}>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          step="0.01"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // Call the handler
        />
        <button
          // className={`${styles.button} ${styles.add}`}
          onClick={handleCreateProduct}
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
        <div className="productGallery">
        {products.map((product) => (
          <>
            <Bread product={product} openEditModal={openEditModal} handleDeleteProduct={handleDeleteProduct}/>
         </>
        ))}
        </div>
    

      {/* Edit Product Modal */}
      {isEditModalActive && selectedProduct && (
        <div className={`${styles.modal} ${styles.active}`}>
          <div className={styles.modalHeader}>
            <h3>Edit Product</h3>
            <button onClick={closeEditModal}>X</button>
          </div>
          <form className={styles.formContainer} onSubmit={handleEditProduct}>
            <input
              type="text"
              placeholder="Product Name"
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
              required
            />
            <input
              type="number"
              placeholder="Price"
              step="0.01"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
                })
              }
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  image: e.target.files[0],
                })
              }
            />
            <div className={styles.modalFooter}>
              <button
                type="submit"
                className={`${styles.button} ${styles.save}`}
              >
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
}

export default ProductManager;
