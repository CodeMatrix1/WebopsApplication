import "./LoginSignup.css";
import { useState } from "react";
function LoginSignup({ res, setres }) {
  const [authenvar, setauthenvar] = useState("Login");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const name = formdata.get("name");
    const password = formdata.get("password");

    try {
      // Fixed URL: Use HTTP (not HTTPS) and correct port (5000 instead of 5173)
      const response = await fetch(
        `http://localhost:5000/${authenvar.toLowerCase()}`, // Changed to lowercase
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        }
      );

      const data = await response.json();
      setres(data.msg);

      // Only switch to Signup after successful Login
      if (response.ok && data.switch_to) {
        setauthenvar(data.switch_to);
      }
    } catch (err) {
      console.log(err);
      setres("Connection error");
    }
    e.target.reset();
  };
  return (
    <div className="container">
      <h2>{authenvar}</h2>
      {/* Moved onSubmit to FORM (was on button) */}
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-element">
          <label htmlFor="name">Username</label>
          <input
            name="name"
            id="username"
            type="text"
            placeholder="Enter username"
            className="input"
            required
          />
        </div>
        <div className="input-element">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Enter password"
            className="password"
            required
          />
        </div>
        <button type="submit" className="button">
          {authenvar}
        </button>
      </form>

      {authenvar === "Login" ? (
        <>
          <p>Need a new account?</p>
          {/* Added onClick handler to switch to Signup */}
          <button className="button" onClick={() => setauthenvar("Signup")}>
            Signup
          </button>
        </>
      ) : (
        <>
          <p>Already have an account?</p>
          <button className="button" onClick={() => setauthenvar("Login")}>
            Login
          </button>
        </>
      )}

      {res && <p>{res}</p>}
    </div>
  );
}

export default LoginSignup;
