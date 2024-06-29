// React
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Carousel from "react-bootstrap/Carousel";
import Dropdown from "react-bootstrap/Dropdown";
import { Image } from "react-bootstrap";

// Imagenes
import firstSlide from "../assets/media/first-slide.jpg";
import secondSlide from "../assets/media/second-slide.jpg";
import thirdSlide from "../assets/media/third-slide.jpg";
import defaultImg from "../assets/media/default-avatar-icon-of-social-media-user-vector.jpg";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
function NavBar() {
  const changePage = (element) => {
    document.querySelectorAll(".nav-link-custom").forEach((e) => {
      e.classList.remove("focus-link-custom");
    });
    element.currentTarget.classList.toggle("focus-link-custom");
  };
  return (
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
              className={"text-center nav-link-custom focus-link-custom"}
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
            <Dropdown.Item eventKey="2" className="d-flex align-items-center">
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
  );
}

export default NavBar;
