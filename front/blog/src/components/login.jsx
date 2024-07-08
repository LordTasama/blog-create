// React
import React from "react";
import { useState } from "react";

// Bootstrap
import {
  Button,
  Row,
  Col,
  Form,
  Container,
  Image,
  FormCheck,
} from "react-bootstrap";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImagePortrait,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

// Assets
import "../assets/css/login.css";
import login_img from "../assets/media/login-img.png";
import logo from "../assets/media/logo.jfif";

// SweetAlert
import Swal from "sweetalert2";

function Login() {
  document.title = "Login";

  const [errorMessage, setErrorMessage] = useState("");
  const [actionUser, setActionUser] = useState(0);
  const [loginForm, setLoginForm] = useState({
    correo: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
    foto: "",
  });

  const handleDisplayForm = (event, i) => {
    if (actionUser == i) {
      return;
    }
    setErrorMessage("");
    const action = i == 0 ? 1 : 0;

    setActionUser(i);
    event.currentTarget.parentElement.childNodes.forEach((e, i) => {
      e.classList.remove("btn-secondary");

      e.classList.remove("btn-primary");
    });
    event.currentTarget.parentElement.children[action].classList.toggle(
      "btn-primary"
    );
    event.currentTarget.classList.toggle("btn-secondary");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginForm = document.getElementById("loginForm");
    const emailInput = loginForm.elements["loginEmail"];
    const passwordInput = loginForm.elements["loginPassword"];

    if (!emailInput.checkValidity()) {
      setErrorMessage("Ingrese un correo electrónico válido");
      return;
    }

    if (!passwordInput.checkValidity()) {
      setErrorMessage("La contraseña no puede estar vacía");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        body: JSON.stringify({
          correo: emailInput.value,
          password: passwordInput.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();

        if (result.token) {
          localStorage.setItem("token", result.token);
          location.reload();
        } else {
          Swal.fire({
            title: result.message,
            icon: "error",
            timer: 2000,
          });
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    const registerForm2 = document.getElementById("registerForm");
    const nameInput = registerForm2.elements["registerName"];
    const lastnameInput = registerForm2.elements["registerLastname"];
    const emailInput = registerForm2.elements["registerEmail"];
    const passwordInput = registerForm2.elements["registerPassword"];
    const conditionsCheck = registerForm2.elements["registerConditions"];

    if (!nameInput.checkValidity()) {
      setErrorMessage("El nombre no puede estar vacío");
      return;
    }

    if (!lastnameInput.checkValidity()) {
      setErrorMessage("El apellido no puede estar vacío");
      return;
    }
    if (!emailInput.checkValidity()) {
      setErrorMessage("Ingrese un correo electrónico válido");
      return;
    }

    if (!passwordInput.checkValidity()) {
      setErrorMessage("La contraseña no puede estar vacía");
      return;
    }
    if (!conditionsCheck.checkValidity()) {
      setErrorMessage("Acepta los términos y condiciones");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nameInput.value);
    formData.append("apellido", lastnameInput.value);
    formData.append("correo", emailInput.value);
    formData.append("password", passwordInput.value);
    formData.append("foto_perfil", registerForm.foto);

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.id) {
          Swal.fire({
            title: "Registro",
            text: "Te has registrado correctamente, ¡Disfruta del blog!",
            icon: "success",
            timer: 2000,
          }).then(() => {
            location.reload();
          });
        } else {
          Swal.fire({
            title: "Algo falló...",
            text: "?",
            icon: "info",
            timer: 2000,
          });
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row>
        <Col lg="7" xxl="7" xl="7" md="6">
          <Image
            src={login_img}
            className="img-fluid mb-3"
            alt="Imagen simple"
          />
        </Col>

        <Col lg="4" xxl="4" xl="4" md="6" className="mx-auto">
          <div className="mx-auto mb-4" style={{ width: "20%" }}>
            <Image src={logo} fluid rounded title="Blog Tasama" />
          </div>
          <div className="d-flex justify-content-center">
            <Button
              className="me-3 h6 btn-secondary"
              onClick={(event) => handleDisplayForm(event, 0)}
            >
              Iniciar sesión
            </Button>

            <Button
              className="h6 btn-primary"
              onClick={(event) => handleDisplayForm(event, 1)}
            >
              Registrarse
            </Button>
          </div>
          <div className="d-flex my-2 text-center text-danger">
            <small className="mx-auto h6 p-2">{errorMessage}</small>
          </div>

          {actionUser == 0 ? (
            <Form className="my-auto" id="loginForm">
              <div className="mb-3">
                <label htmlFor="loginEmail" className="text-light ms-2 mb-1">
                  Correo electrónico
                </label>
                <Form.Control
                  id="loginEmail"
                  type="email"
                  size="lg"
                  required
                  value={loginForm.correo}
                  onChange={(event) => {
                    setLoginForm({
                      ...loginForm,
                      correo: event.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="loginPassword" className="text-light ms-2 mb-1">
                  Contraseña
                </label>
                <Form.Control
                  id="loginPassword"
                  type="password"
                  size="lg"
                  required
                  value={loginForm.password}
                  onChange={(event) => {
                    setLoginForm({
                      ...loginForm,
                      password: event.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div className="d-flex mt-3 ms-3">
                <FormCheck id="loginRemember" />
                <label htmlFor="loginRemember" className="text-light ms-2">
                  Recordarme
                </label>
              </div>

              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="mb-0 px-5 mt-2"
                  size="lg"
                  onClick={handleLogin}
                >
                  Acceder
                </Button>
              </div>
            </Form>
          ) : (
            <Form id="registerForm">
              <div className="mb-3">
                <label htmlFor="registerName" className="text-light ms-2 mb-1">
                  Nombres
                </label>
                <Form.Control
                  id="registerName"
                  type="text"
                  size="lg"
                  required
                  value={registerForm.nombres}
                  onChange={(event) => {
                    setRegisterForm({
                      ...registerForm,
                      nombres: event.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="registerLastname"
                  className="text-light ms-2 mb-1"
                >
                  Apellidos
                </label>
                <Form.Control
                  id="registerLastname"
                  type="text"
                  size="lg"
                  required
                  value={registerForm.apellidos}
                  onChange={(event) => {
                    setRegisterForm({
                      ...registerForm,
                      apellidos: event.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerEmail" className="text-light ms-2 mb-1">
                  Correo electrónico
                </label>
                <Form.Control
                  id="registerEmail"
                  type="email"
                  size="lg"
                  required
                  value={registerForm.correo}
                  onChange={(event) => {
                    setRegisterForm({
                      ...registerForm,
                      correo: event.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor="registerPassword"
                  className="text-light ms-2 mb-1"
                >
                  Contraseña
                </label>
                <Form.Control
                  id="registerPassword"
                  type="password"
                  size="lg"
                  required
                  value={registerForm.password}
                  onChange={(event) => {
                    setRegisterForm({
                      ...registerForm,
                      password: event.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor="registerPerfilPhoto"
                  className="text-light ms-2 mb-1"
                >
                  Foto de perfil (No obligatorio)
                </label>
                <br />
                <label
                  htmlFor="registerPerfilPhoto"
                  className="btn btn-primary"
                  title="Subir foto de perfil"
                  style={{ width: "100%" }}
                >
                  <FontAwesomeIcon icon={faImagePortrait} size="2xl" />
                </label>
                <Form.Control
                  id="registerPerfilPhoto"
                  type="file"
                  size="lg"
                  className="d-none"
                  accept="image/*"
                  onChange={(event) => {
                    setRegisterForm({
                      ...registerForm,
                      foto: event.currentTarget.files[0],
                    });
                  }}
                />
              </div>
              <div className="d-flex mt-3 ms-3">
                <FormCheck id="registerConditions" required />
                <label htmlFor="registerConditions" className="text-light ms-2">
                  Acepto términos y condiciones
                </label>
              </div>

              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="mb-0 px-5 mt-2"
                  size="lg"
                  onClick={handleRegister}
                >
                  Registrarse
                </Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
