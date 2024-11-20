import { Link } from "react-router-dom"
import styles from "./Error.module.scss"

function Error() {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <h1>404</h1>
            <h3>Page Not Found</h3>
            <Link to={"/"}> Return Home</Link>
        </div>
    </div>
  )
}

export default Error
