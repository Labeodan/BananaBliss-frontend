import styles from "./Bread.module.scss";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { getUser } from "../../utils/token";
import { useLocation } from "react-router-dom";


function Bread({ product, openEditModal, handleDeleteProduct}) {
  const location = useLocation()
  const presentPath = location.pathname
  const navigate = useNavigate();
  const user = getUser();
  const { addItem } = useCart();

  const handleNavigate = (id) => {
    if (user === null) {
      navigate("/signin");
    } else {
      navigate(`/menu/${id}`);
    }
  };

  return (
    <>
      <div
        className={styles.productCard}
      >
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className={styles.price}>
          {/* {product.originalPrice && (
            <span className={styles.originalPrice}>
              {product.originalPrice}
            </span>
          )} */}
          ${product.price}
        </div>
        {user && user.role === "admin"?
        (
            <>
            {presentPath !== "/productmanager"? (
              <button onClick={()=> handleNavigate(product.id)}>View</button>
              
            ): (
              <>
              <button onClick={()=>openEditModal(product)}>Edit</button>
              <button onClick={()=> handleDeleteProduct(product.id)}>Delete</button>
              <button onClick={()=> handleNavigate(product.id)}>View</button>
              </>
            )}
            </>
        ):(
            <>
            <button onClick={()=> handleNavigate(product.id)}>View</button>
            <button onClick={() => addItem(product)}>Add to cart</button>
            </>
        )}
      </div>
    </>
  );
}

export default Bread;
