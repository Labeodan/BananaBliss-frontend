import styles from "./Bread.module.scss"
import { useNavigate } from "react-router-dom"
import { useCart } from "react-use-cart"
import { getUser } from "../../utils/token"


function Bread({product}) {
    const navigate = useNavigate()
    const user = getUser()
    const {addItem} = useCart()

    const handleNavigate = (id) => {
        if (user === null) {
            navigate("/signin")
        } else {
            navigate(`/menu/${id}`)
        }
    }


  return (
            <>
            <div className={styles.productCard} onClick={()=>{handleNavigate(product.id)}}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className={styles.price}>
                {product.originalPrice && (
                    <span className={styles.originalPrice}>{product.originalPrice}</span>
                )}
                {product.price}
                </div>
                <button onClick={() => addItem(product)}>Add to cart</button>
            </div>
                </>
  )
}

export default Bread
