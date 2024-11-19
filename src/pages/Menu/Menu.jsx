import Bread from "../../components/Bread/Bread";
import styles from "./Menu.module.scss";

function Menu({menu}) {
  return (
    <section className={styles.menuPage}>
    <h1 className={styles.title}>Our Menu</h1>
    <p className={styles.subtitle}>
      Explore our carefully curated selection of banana-inspired delights!
    </p>
    <Bread products={menu}/>
  </section>
  )
}

export default Menu
