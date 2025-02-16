import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./pages/Landing/Landing";
import Breadshow from "./pages/Breadshow/Breadshow";
import Menu from "./pages/Menu/Menu";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import { useState, useEffect } from "react";
import { getUser } from "./utils/token";
import { getProducts } from "./services/products";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Admin from "./pages/Admin/Admin";
import Error from "./pages/Error/Error";
import ProductManager from "./pages/Admin/ProductManager";
import { useNavigate } from "react-router-dom";
import { removeToken } from "./utils/token";
import { Toaster } from "react-hot-toast";
import Checkout from "./pages/Checkout/Checkout";



function App() {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true)
  const username = user?.username || user?.email;
  const [products, setProducts] = useState([]);
  const [, setError] = useState({}) //i have to find a way to display the error if when they occur; when that happens i will use this state, by adding error to the useEffect dependencies
  const navigate = useNavigate()

  
  
  useEffect(() => {
    const handleInvalidToken = () => {
      removeToken(); // Clear the token
      setUser(null); // Optional: If you're tracking user state
      navigate("/signin"); // Redirect to signin page
    };


    // This function attempts to get all he products from the database
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        if (allProducts) {
          setProducts(allProducts.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        // Check if the error is due to an invalid token
        if (err.response?.data?.code === "token_not_valid") {
          handleInvalidToken();
        } else {
          setError(err.response?.data || "An error occurred.");
        }
      } finally {
        // if the request is successful it sets the loading screen to false.
        setLoading(false);
      }
    };

    getAllProducts();
  
  // the next line is used to disable the eslint warning that the useEffect dependencies are missing; only use it when you are sure that you don't need to add any dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);





  return (
    <>
    {/* nav bar and toasts are outside the routes because they need to show up on every page */}
      <Navbar user={username} setUser={setUser} />
      <Toaster position="top-right"/>

      <Routes>

        {/* the landing page id displayed dynamically depending on wether an admin is logged in or a regular user */}
        <Route
          path="/"
          element={
            user?.role === "admin" ? <Admin /> : <Landing products={products} loading={loading} user={user}/>
          }
        ></Route>

        <Route path="/menu" element={<Menu products={products} user={user} loading={loading}/>}></Route>
        {user ? (
          <>
            <Route
              path="/menu/:breadId"
              element={<Breadshow products={products} />}
            ></Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />}/>
            {/* only admins can view the product manager page */}
            {user?.role === "admin"? <Route path="/productmanager" element={<ProductManager />} /> : null}
          </>
        ) : (
          <>
            <Route
              path="/signin"
              element={<Signin setUser={setUser} />}
            ></Route>
            <Route
              path="/signup"
              element={<Signup setUser={setUser} />}
            ></Route>
          </>
        )}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
