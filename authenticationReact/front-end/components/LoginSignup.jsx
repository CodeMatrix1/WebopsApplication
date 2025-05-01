import "./LoginSignup.css";
import { useState } from "react";
function LoginSignup({ res, setres }) {
  const [authenvar, setauthenvar] = useState("Login");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const fields =
      authenvar === "Signup"
        ? {
            name: formdata.get("name"),
            email: formdata.get("email"),
            password: formdata.get("password"),
          }
        : {
            email: formdata.get("email"),
            password: formdata.get("password"),
          };

    try {
      const response = await fetch(
        `http://localhost:5000/${authenvar.toLowerCase()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        }
      );
      const data = await response.json();

      if (data.msg === "yes") {
        setres({
          msg: data.msg,
          username: data.username || "",
          database: data.database,
        });
      } else if (response.ok && data.switch_to) {
        setauthenvar(data.switch_to);
      }
    } catch (err) {
      setres({ msg: "Connection error", username: "" });
    }
    e.target.reset();
  };

  return (
    <div className="container">
      <h2>{authenvar}</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        {authenvar === "Signup" ? (
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
        ) : null}
        <div className="input-element">
          <label htmlFor="password">Email:</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter email"
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
            className="input"
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

      {res.msg && <p>{res.msg}</p>}
    </div>
  );
}

export default LoginSignup;
