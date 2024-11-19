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
    noneFieldError: "",
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

      if (newUser && newUser.user && newUser.user.email) {
        setUser(newUser.user.email);
        setFormData({ email: "", password: "", confirmPassword: "" }); // Reset form
        navigate("/"); // Redirect after success
      } else {
        const errorMessage = newUser.email[0] || newUser.password[0] || "An error occurred during signup.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        noneFieldError: error.message || "An error occurred. Please try again.",
      }));
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
    setErrors({ email: "", password: "", noneFieldError: "" });

    await handleSignup();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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
        {errors.noneFieldError && (
          <p style={{ color: "red" }}>{errors.noneFieldError}</p>
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
