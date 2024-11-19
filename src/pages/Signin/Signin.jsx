import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/auth";

function Signin({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(""); // State for error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const newUser = await signIn(formData);

      // Check for valid response structure
      if (newUser && newUser.user && newUser.user.email) {
        setUser(newUser.user.email); // Save user email to parent state
        navigate("/"); // Redirect to the home page
        setFormData({ email: "", password: "" }); // Reset form
      } else {
        const errorMessage = newUser?.detail || "Invalid credentials.";
        throw new Error(errorMessage);
      }

      console.log("User signed in:", newUser);
    } catch (error) {
      console.error("Error during signin:", error);
      setErrors(error.message || "An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignup();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign In To Banana Bliss</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {/* Display error messages */}
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <button type="submit">Sign In</button>
        <p>
          Don&#39;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
