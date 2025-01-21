import { useState } from "react"
import styles from "./Checkout.module.scss"

function Checkout() {
    const [ formData, setFormData ] = useState({
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
        // 1. i need customer to fill in their details
        // name, phone, address,
        
        // 2. i need customer to select payment method
        // credit/debit card or stripe.






  return (
      <div id={styles.checkout_page} className="container-fluid">
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

            {/* <hr /> */}

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
      </div>
  )
}

export default Checkout
