import NavBar from "./components/navbar";
import Home from "./components/home";
import Publications from "./components/publications";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Custom
import "./assets/css/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/publications" element={<Publications />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
