// React
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Bootstrap
import {
  Container,
  Nav,
  Navbar,
  Carousel,
  Dropdown,
  Image,
  Button,
  Modal,
} from "react-bootstrap";

// Imagenes
import firstSlide from "../assets/media/first-slide.jpg";
import secondSlide from "../assets/media/second-slide.jpg";
import thirdSlide from "../assets/media/third-slide.jpg";
import defaultImg from "../assets/media/default-avatar-icon-of-social-media-user-vector.jpg";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const location = useLocation();
  const changePage = (element) => {
    document.querySelectorAll(".nav-link-custom").forEach((e) => {
      e.classList.remove("focus-link-custom");
    });
    element.currentTarget.classList.toggle("focus-link-custom");
  };

  useEffect(() => {
    let index = 0;
    let element = "";
    if (location.pathname == "/publications") {
      index = 1;
    }
    document.querySelectorAll(".nav-link-custom").forEach((e, i) => {
      e.classList.remove("focus-link-custom");
      element = i == index ? e : element;
    });

    element.classList.toggle("focus-link-custom");
  }, []);
  const [logOutModal, setLogOutModal] = useState(false);

  return (
    <>
      <Container fluid>
        <Carousel
          className="carrousel-container mx-auto mt-5"
          prevIcon={false}
          nextIcon={false}
        >
          <Carousel.Item interval={2000}>
            <Image src={firstSlide} className="img-slide" />
            <Carousel.Caption className="bg-transparent">
              <p className="bg-transparent h5">Disfruta de mi blog</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <Image src={secondSlide} className="img-slide" />
            <Carousel.Caption className="bg-transparent">
              <p className="bg-transparent h5">
                Tal vez puedas conocerme un poco más
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src={thirdSlide} className="img-slide" />
            <Carousel.Caption className="bg-transparent">
              <p className="bg-transparent h5">¿Qué esperas?</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Navbar bg="transparent" expand="lg" className="justify-content-center">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center mt-2"
          >
            <Nav>
              <Nav.Link
                as={Link}
                to="/"
                className={"text-center nav-link-custom"}
                onClick={(event) => changePage(event)}
              >
                Inicio
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/publications"
                className="text-center nav-link-custom"
                onClick={(event) => changePage(event)}
              >
                Publicaciones
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Dropdown className="mx-1">
            <Dropdown.Toggle
              id="custom-dropdown-button"
              as="div"
              className="custom-dropdown-toggle"
            >
              <Image
                src={defaultImg}
                roundedCircle
                alt="Imagen de perfil"
                className="foto-perfil"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="align-items-center">
              <Dropdown.ItemText
                style={{ backgroundColor: "transparent" }}
                className="text-center"
              >
                Anderson Tasama
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1" className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faPen}
                  className="me-1 bg-secondary text-light"
                  style={{
                    borderRadius: "50%",
                    padding: "5%",
                  }}
                />
                Editar perfil
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                className="d-flex align-items-center"
                onClick={() => setLogOutModal(true)}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="me-1 bg-secondary text-light"
                  style={{
                    borderRadius: "50%",
                    padding: "5%",
                  }}
                />
                Cerrar sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
      </Container>
      {/* Modals */}
      <Modal show={logOutModal}>
        <Modal.Header>
          <Modal.Title>Cerrar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta acción cerrará la sesión actual, deberás iniciar una nueva sesión
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLogOutModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => setLogOutModal(false)}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;
