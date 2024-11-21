import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { removeToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { getUser } from "../../utils/token";
// import { useState } from "react";

function Navbar({ user, setUser }) {
  // const [closeNav, setCloseNav] = useState(false)
  const { totalItems } = useCart();
  const userRole = getUser()
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/");
    setUser(null);
  };

  return (
    <div className={styles.navbar}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Banana Bliss
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <RxHamburgerMenu />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">
                  Menu
                </Link>
              </li>
              {user ? (
                <>
                {userRole.role === "admin"? (
                  <>
                  <li>
                    <Link className="nav-link" to={"/productmanager"}>Product Manager</Link>
                  </li>
                  </>
                ):(
                  <>
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      Cart ({totalItems})
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/orders" className="nav-link">
                      Orders
                    </Link>
                  </li>
                  
                  </>
                )}

                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      >
                      {user}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                      >
                      <li onClick={logout}>
                        <button className="btn" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
                      </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Signin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
