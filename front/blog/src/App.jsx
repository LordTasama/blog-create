import NavBar from "./components/navbar";
import Home from "./components/home";
import Publications from "./components/publications";
import Login from "./components/login";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Custom
import "./assets/css/styles.css";

// React
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  console.log(userId());
  useEffect(() => {
    const token = Object.keys(localStorage);
    if (!token.includes("token")) {
      localStorage.setItem("token", "");
    }
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/usuarios", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          setUserLogin(true);
        }
      } catch (error) {
        console.error("Error al verficar el token", error);
      }
    })();
  }, []);

  return userLogin ? (
    <>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/publications" element={<Publications />} />
        </Routes>
      </Router>
    </>
  ) : (
    <>
      <Login></Login>
    </>
  );
}
export const userId = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await fetch("http://localhost:3000/usuarios/userId", {
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.userId;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el id del usuario", error);
    }
  }
};
export default App;
