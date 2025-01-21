import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/auth";

function Signup({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    non_field_error: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const apiData = {
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
    };

    try {
      const newUser = await signUp(apiData);
      console.log(newUser)

      const {email, password, non_field_errors} = newUser
      console.log(non_field_errors)

      if (email || password || non_field_errors) {
        setErrors((prevErrors) => ({
          ...prevErrors, email: email, password: password, non_field_error: non_field_errors && non_field_errors[0]
        }))
      }

      if (newUser && newUser.user && newUser.user.email) {
        setUser(newUser.user);
        setFormData({ email: "", password: "", confirmPassword: "" }); // Reset form
        navigate("/"); // Redirect after success
      }

    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.email.includes("@")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Passwords do not match.",
      }));
      return;
    }

    // Clear field-specific errors before making the API call
    setErrors({ email: "", password: "", non_field_error: "" });

    await handleSignup();
  };

  console.log(errors)
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} id="form">
        <h1>Create an Account</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        {errors.non_field_error && (
          <p style={{ color: "red" }}>{errors.non_field_error}</p>
        )}
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
