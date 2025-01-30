import { useEffect, useState } from "react"
import styles from "./Checkout.module.scss"
import { useCart } from "react-use-cart"

function Checkout() {
    const { items } = useCart()
    const [totalCost, setTotalCost] = useState(0)
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        mobile: "",
        address: {
            street: "",
            houseNumber: "",
            city: "",
            province: "",
            postalCode: "",
        }
    })
    console.log(items)

    useEffect(() => {
        // function to get the total amount the user  is to pay based on the price of each individual item and the quantity of items.
        const getTotalItemsCost = () => {
            let total = 0
            items.forEach(item => {
                const qty = item.quantity
                const itemPrice = Number(item.price)
                const price = qty * itemPrice

                total += price
            });
            return setTotalCost(total)
        }

        getTotalItemsCost()

    }, [items])




    // ! these are the functions for handling user input into the form and form submission
    const handelFormChange = (e) => {
        const updatedForm = {...formData, [e.target.name]:e.target.value}
        setFormData(updatedForm)
    }

    const handelAddressChange = (e) => {
        const updatedAddress = {
            ...formData, 
            address: { 
                ...formData.address, 
                [e.target.name]: e.target.value
        }}

        setFormData(updatedAddress)
    }

    const handelFormSubmit = (e) => {
        e.preventDefault()
    }





    //! i am trying to get the carousel to work 

    return (
        <div id={styles.checkout_page} className="container-fluid">
            <section id="carouselExampleSlidesOnly" className={`${styles.checkout_items} carousel slide`} data-bs-ride="carousel">
                <div className="carousel-inner">
                    {items.map(item => {
                        return (
                            <div key={item.id} className={`carousel-item ${item.id === 1 ? "active" : ""}`}>
                                <div className={styles.carousel_img_container}>
                                    <img className={styles.carousel_img} src={item.image} alt="" />
                                </div>
                                <p className={styles.title}>{item.name}</p>
                                <p className={styles.price}>{item.quantity} X ${item.price}</p>
                                <p className={styles.total}>Total: ${totalCost}</p>
                            </div>
                        )
                    })}
                </div>

            </section>
            <section className={styles.payment_details}>
                <div className="form-container container align-items-start">
                    <form action="" method="post" onSubmit={handelFormSubmit} id={styles.checkout_form} className="container-lg d-flex flex-column m-2">
                        <label htmlFor="form-heading" className="mt-2 mb-2">Billing Details</label>

                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Firstname"
                            value={formData.firstname}
                            onChange={handelFormChange} />

                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="Lastname"
                            value={formData.lastname}
                            onChange={handelFormChange} />

                        <input
                            type="tel"
                            name="mobile"
                            id="mobile"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={handelFormChange} />

                        <hr />

                        <input
                            type="text"
                            name="street"
                            id="street"
                            placeholder="Street"
                            value={formData.address.street}
                            onChange={handelAddressChange} />

                        <input
                            type="number"
                            name="houseNumber"
                            id="houseNumber"
                            placeholder="House Number"
                            value={formData.address.houseNumber}
                            onChange={handelAddressChange} />

                        <input
                            type=""
                            name="city"
                            id="city"
                            placeholder="City"
                            value={formData.address.city}
                            onChange={handelAddressChange} />

                        <input
                            type="text"
                            name="province"
                            id="province"
                            placeholder="Province"
                            value={formData.address.province}
                            onChange={handelAddressChange} />

                        <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            placeholder="Postal Code"
                            value={formData.address.postalCode}
                            onChange={handelAddressChange} />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Checkout


