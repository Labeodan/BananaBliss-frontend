import styles from './Landing.module.scss';
import Bread from '../../components/Bread/Bread';
import { Link } from 'react-router-dom';
import Loading from "../Loading/Loading";


function Landing({products, loading}) {

  const filteredProducts = products?.filter((product, i) => i < 4)

  if (loading) {
    return(
      <Loading />
    )
  }


  return (
    <div className={styles.landing}>
      <header className={styles.banner}>
      <div className={styles.overlay}>
        <h1>Welcome to Banana Bliss</h1>
        <p className={styles.tagline}>The sweetest spot for banana treats!</p>
        <p>Indulge in freshly baked banana bread!</p>
        <Link to="/menu" className={styles.shopNow}>
          Shop Now
        </Link>
      </div>
    </header>


    <section id="products" className={styles.productSection}>
      <h2>Discover Our Irresistible Offerings</h2>
      <p>
        Explore our range of delicious, banana-inspired treats made with love and the finest ingredients.
      </p>
      <div className='productGallery'>
      {filteredProducts.map(product => (

        <Bread key={product.id} product={product}/>
      ))}
      </div>
    </section>
    </div>
  )
}

export default Landing
