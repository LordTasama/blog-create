import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import firstSlide from "../assets/media/first-slide.jpg";
import secondSlide from "../assets/media/second-slide.jpg";
import thirdSlide from "../assets/media/third-slide.jpg";
import { useState } from "react";
function NavBar() {
  const [navBarValue, setValue] = useState("focus-link-custom");
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
              className={"text-center nav-link-custom " + navBarValue}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/publications"
              className="text-center nav-link-custom"
            >
              Publicaciones
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavBar;
