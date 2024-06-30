// Bootstrap
import {
  Form,
  Button,
  Modal,
  FloatingLabel,
  Image,
  Container,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faImages,
  faLeaf,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.all.js";
// React
import { useState, useEffect } from "react";

const Publications = () => {
  const [Publications, setPublications] = useState([]);
  const [addPublication, setAddPublication] = useState(false);
  const [FormAddPublication, setFormAddPublication] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    usuario_id: 1114149123,
  });

  const handleAddPublication = async () => {
    const data = new FormData();
    data.append("titulo", FormAddPublication.titulo);
    data.append("descripcion", FormAddPublication.descripcion);
    data.append("imagen", FormAddPublication.imagen);
    data.append("usuario_id", FormAddPublication.usuario_id);

    try {
      const response = await fetch("http://localhost:3000/publicaciones", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.id) {
          Swal.fire({
            title: "Publicación creada",
            text: "Has hecho exitosamente una publicación",
            icon: "success",
            timer: 2000,
          });
          setAddPublication(false);
          getPublications();
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  const handleChangeAdd = (inputToChange, event) => {
    inputToChange == "title"
      ? (FormAddPublication.titulo = event.target.value)
      : (FormAddPublication.descripcion = event.target.value);
  };
  const [imageUploadedAdd, setImageUploadedAdd] = useState("");
  const handleFileChangeAdd = (event) => {
    const file = event.target.files[0];
    if (file) {
      FormAddPublication.imagen = file;
      const reader = new FileReader();
      reader.onload = () => {
        setImageUploadedAdd(reader.result); // Establece el src de la imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const getPublications = async () => {
    try {
      const response = await fetch("http://localhost:3000/publicaciones");

      if (response.ok) {
        const result = await response.json();

        setPublications(result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  const handleCommentDisplay = (event) => {
    event.currentTarget.parentElement.parentElement.children[1].children[0].classList.toggle(
      "d-none"
    );
  };
  const handleComment = (id) => {
    console.log(id);
  };
  useEffect(() => {
    getPublications();
  }, []);
  return (
    <>
      {Publications.map((e, index) => (
        <Container key={index}>
          <Row
            className="mt-4 mx-5"
            style={{
              borderLeft: "2px solid black",
              borderRight: "2px solid black",
            }}
          >
            <Col
              xxl="12"
              xl="12"
              lg="12"
              md="12"
              sm="12"
              className="d-flex justify-content-center mb-3"
            >
              <Card style={{ width: "50%" }}>
                <Card.Body>
                  <Card.Title>{e.titulo}</Card.Title>
                  <Card.Text>{e.descripcion}</Card.Text>
                  <Card.Img
                    variant="top"
                    src={
                      "http://localhost:3000/images/publication_photo/" +
                      e.imagen
                    }
                  />
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center">
                  <Row>
                    <Col
                      xxl="12"
                      xl="12"
                      lg="12"
                      md="12"
                      sm="12"
                      className="d-flex justify-content-center mb-3"
                    >
                      <Button
                        className="bg-secondary"
                        style={{ borderRadius: "30%", border: "none" }}
                        title="Comentar"
                        onClick={(event) => {
                          handleCommentDisplay(event);
                        }}
                      >
                        <FontAwesomeIcon icon={faComment} />
                      </Button>
                    </Col>
                    <Col
                      xxl="12"
                      xl="12"
                      lg="12"
                      md="12"
                      sm="12"
                      className="d-flex justify-content-center mb-3"
                    >
                      <InputGroup className="d-none">
                        <Form.Control type="text" placeholder="Comentario" />
                        <Button
                          variant="secondary"
                          title="Enviar"
                          onClick={() => {
                            handleComment(e.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </Button>
                      </InputGroup>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      ))}
      <Button
        variant="secondary"
        style={{ position: "fixed", right: "2%", bottom: "7%" }}
        title="Crear publicación"
        onClick={() => setAddPublication(true)}
      >
        <FontAwesomeIcon icon={faPlus} size="lg" className="bg-transparent" />
      </Button>
      {/* Modals */}
      <Modal show={addPublication}>
        <Modal.Header>
          <Modal.Title>Crear publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="titleAddPublication"
              label="Título"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Agrega un título"
                defaultValue={FormAddPublication.titulo}
                onChange={(event) => handleChangeAdd("title", event)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="descriptionAddPublication"
              label="Descripción"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Agrega una descripción"
                defaultValue={FormAddPublication.descripcion}
                onChange={(event) => handleChangeAdd("description", event)}
              />
            </FloatingLabel>
            <>
              <Form.Control
                id="fileAddPublication"
                type="file"
                className="d-none"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChangeAdd}
                defaultValue={FormAddPublication.imagen}
              />
              <Form.Label
                htmlFor="fileAddPublication"
                className="btn btn-primary d-flex justify-content-center"
                title="Subir imagen"
              >
                <FontAwesomeIcon icon={faImages} />
              </Form.Label>
            </>
          </Form>
          <Container className="d-flex justify-content-center">
            <Image src={imageUploadedAdd} fluid />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddPublication(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddPublication}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Publications;
