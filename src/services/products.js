import axios from './interceptors'; // Import the Axios instance with interceptors configured

const PRODUCTS_BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products/`;

// * Index - Get all products
export const getProducts = () => {
  return axios.get(PRODUCTS_BASE_URL);
};

// * Show - Get a single product by ID
export const getProduct = (productId) => {
  return axios.get(`${PRODUCTS_BASE_URL}${productId}/`);
};

// * Create - Create a new product
export const createProduct = (formData) => {
  return axios.post(PRODUCTS_BASE_URL, formData);
};

// * Update - Update a product by ID
export const updateProduct = (productId, formData) => {
  return axios.put(`${PRODUCTS_BASE_URL}${productId}/`, formData);
};

// * Delete - Delete a product by ID
export const deleteProduct = (productId) => {
  return axios.delete(`${PRODUCTS_BASE_URL}${productId}/`);
};
