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
import { UserIdProvider } from "./components/userIdContext";

function App() {
  const [userLogin, setUserLogin] = useState(false);
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
      <UserIdProvider>
        <Router>
          <NavBar></NavBar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/publications" element={<Publications />} />
          </Routes>
        </Router>
      </UserIdProvider>
    </>
  ) : (
    <>
      <Login></Login>
    </>
  );
}

export default App;
