import Bread from "../../components/Bread/Bread";
import styles from "./Menu.module.scss";
import Loading from "../Loading/Loading";

function Menu({products, loading}) {
  if (loading) {
    return(
      <Loading />
    )
  }

  return (
    <section className={styles.menuPage}>
    <h1 className={styles.title}>Our Menu</h1>
    <h2 className={styles.subtitle}>
      Explore our carefully curated selection of banana-inspired delights!
    </h2>
    <div className={styles.productGallery} >

    <div className="productGallery">
      {products.map(product => (
        <Bread key={product.id} product={product}/>
      ))}
    </div>
      </div>
  </section>
  )
}

export default Menu
