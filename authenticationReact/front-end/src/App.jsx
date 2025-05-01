import { useState } from "react";
import "./App.css";
import LoginSignup from "../components/LoginSignup";
import Admin from "../components/Admin";
import Home from "../components/home";

function App() {
  const [res, setres] = useState({ msg: "", username: "" });
  const [admin, setadmin] = useState(false);

  return (
    <>
      {res.msg !== "yes" ? (
        <LoginSignup res={res} setres={setres} />
      ) : admin ? (
        <Admin database={res.database} />
      ) : (
        <Home res={res} setadmin={setadmin} />
      )}
    </>
  );
}

export default App;
