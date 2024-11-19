import styles from "./Breadshow.module.scss"
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/products";
import { useEffect, useState } from "react";
import Bread from "../../components/Bread/Bread";

function Breadshow({products}) {
  const {breadId} = useParams()
  // console.log(params.breadId)
  const [product, setProduct] = useState({})
  const [filteredProducts, setFilteredProducts] = useState([])

  
  

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const singleProduct = await getProduct(breadId); // Assuming getProduct is a function that fetches the product.
        if (singleProduct) {
          setProduct(singleProduct.data);
        } else {
          console.error("Could not get product");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getRandomProducts = () => {
      if (products && products.length > 0) {
        const newarray = [];
        while (newarray.length < 4) {
          const randomIndex = Math.floor(Math.random() * products.length);
          // Ensure no duplicates in `newarray`.
          if (!newarray.includes(randomIndex)) {
            newarray.push(randomIndex);
          }
        }
        // Map indices to product objects.
        const randomProducts = newarray.map((index) => products[index]);
        setFilteredProducts(randomProducts);
      }
    };

    getSingleProduct();
    getRandomProducts();
  }, [breadId, products]);
  return (
    
      <div>
        {/* Product Details Section */}
        <section className={styles.productDetails}>
          <div className={styles.productImage}>
            <img
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className={styles.productInfo}>
            <h1>{product.name}</h1>
            <p>
             {product.description}
            </p>
            <div className={styles.price}>${product.price}</div>
            <a href="#add-to-cart" className={styles.addToCart}>
              Add to Cart
            </a>
          </div>
        </section>
  
        {/* Related Products Section */}
        <section className={styles.relatedProducts}>
          <h2>Other Products</h2>
            <div className="productGallery">
              {filteredProducts.map(p => (
                <Bread key={p.id} product={p}/>
              ))}
            </div>
        </section>
      </div>
  )
}

export default Breadshow;
