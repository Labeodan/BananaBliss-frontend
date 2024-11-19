import { useEffect, useState } from 'react';
import styles from './Landing.module.scss';
import { getProducts } from '../../services/products';
import Bread from '../../components/Bread/Bread';
import { Link } from 'react-router-dom';

function Landing({setMenu}) {
const [products, setProducts] = useState([])

useEffect(() => {
  const getAllProducts = async () => {

    try {
      const allProducts = await getProducts()
      // console.log(allProducts.data)
      
      const filtered = allProducts.data.filter((product, i) => i < 4)
      // console.log(filtered)
      if (allProducts){
        setProducts(filtered)
        setMenu(allProducts.data)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  getAllProducts()
}, [])

  return (
    <div>
      <header className={styles.banner}>
      <div className={styles.overlay}>
        <h1>Welcome to Banana Bliss</h1>
        <p className={styles.tagline}>The sweetest spot for banana treats!</p>
        <p>Indulge in freshly baked banana bread, cookies, muffins, and more!</p>
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
      <Bread products={products}/>
    </section>
    </div>
  )
}

export default Landing
