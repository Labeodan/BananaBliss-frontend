import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Landing from "./pages/Landing/Landing"
import Breadshow from "./pages/Breadshow/Breadshow"
import Menu from "./pages/Menu/Menu"
import Signin from "./pages/Signin/Signin"
import Signup from "./pages/Signup/Signup"
import { useState } from "react"
import { getUser } from "./utils/token"



function App() {
  const [user, setUser] = useState(getUser())
  const [menu, setMenu] = useState([])
  const username = user?.username || user?.email

  return (
    <>
      <Navbar user={username}/>
      <Routes>
        <Route path="/" element={<Landing setMenu={setMenu}/>}></Route>
        <Route path="/menu" element={<Menu menu={menu}/>}></Route>
        <Route path="/menu/:breadId" element={<Breadshow />}></Route>

        <Route path="/signin" element={<Signin setUser={setUser} />}></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>




      </Routes>
    
    </>
  )
}

export default App
