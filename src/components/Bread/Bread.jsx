import styles from "./Bread.module.scss"
import { useNavigate } from "react-router-dom"

function Bread({products}) {
    const navigate = useNavigate()

    const handleNavigate = (id) => {
        navigate(`/menu/${id}`)
    }
  return (
        <div className={styles.productGallery}>
            {products.map((product) => (
            <div key={product.id} className={styles.productCard} onClick={()=>{handleNavigate(product.id)}}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className={styles.price}>
                {product.originalPrice && (
                    <span className={styles.originalPrice}>{product.originalPrice}</span>
                )}
                {product.price}
                </div>
            </div>
            ))}
        </div>
  )
}

export default Bread
