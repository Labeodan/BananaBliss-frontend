import axios from './interceptors'; // Import the Axios instance with interceptors configured

const ORDERS_BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders/`;

// * Index - Get all orders
export const getOrders = () => {
  return axios.get(ORDERS_BASE_URL);
};

// * Show - Get a single order by ID
export const getOrder = (orderId) => {
  return axios.get(`${ORDERS_BASE_URL}${orderId}/`);
};

// * Create - Create a new order
export const createOrder = (formData) => {
  return axios.post(ORDERS_BASE_URL, formData);
};

// * Update - Update a order by ID
export const updateOrder = (orderId, formData) => {
  return axios.patch(`${ORDERS_BASE_URL}${orderId}/`, formData);
};

// * Delete - Delete a order by ID
export const deleteOrder = (orderId) => {
  return axios.delete(`${ORDERS_BASE_URL}${orderId}/`);
};
