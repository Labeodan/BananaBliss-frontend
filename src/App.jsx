import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Landing from "./pages/Landing/Landing"
import Breadshow from "./pages/Breadshow/Breadshow"
import Menu from "./pages/Menu/Menu"
import Signin from "./pages/Signin/Signin"
import Signup from "./pages/Signup/Signup"
import { useState, useEffect } from "react"
import { getUser } from "./utils/token"
import { getProducts } from "./services/products"
import Cart from "./pages/cart/cart"
import Orders from "./pages/Orders/Orders"
import Admin from "./pages/Admin/Admin"


function App() {
  const [user, setUser] = useState(getUser())
  const username = user?.username || user?.email
  const [products, setProducts] = useState([])

useEffect(() => {
  const getAllProducts = async () => {

    try {
      const allProducts = await getProducts()
      // console.log(allProducts.data)
      
     
      // console.log(filtered)
      if (allProducts){
        setProducts(allProducts.data)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  getAllProducts()
}, [])

  return (
    <>
      <Navbar user={username}/>
      <Routes>
        <Route path="/" element={<Landing products={products}/>}></Route>
        <Route path="/menu" element={<Menu products={products}/>}></Route>
        <Route path="/menu/:breadId" element={<Breadshow products={products}/>}></Route>

        <Route path="/signin" element={<Signin setUser={setUser} />}></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        




      </Routes>
    
    </>
  )
}

export default App
