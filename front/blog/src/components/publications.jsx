// Bootstrap
import { Form, Button, Modal, FloatingLabel } from "react-bootstrap";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// React
import { useState } from "react";

const Publications = () => {
  const [addPublication, setAddPublication] = useState(false);
  return (
    <>
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
              <Form.Control type="text" placeholder="Agrega un título" />
            </FloatingLabel>
            <FloatingLabel
              controlId="descriptionAddPublication"
              label="Descripción"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Agrega una descripción"
              />
            </FloatingLabel>
            <>
              <Form.Control
                id="fileAddPublication"
                type="file"
                className="d-none"
              />
              <Form.Label
                for="fileAddPublication"
                className="btn btn-primary d-flex justify-content-center"
              >
                Subir imagen
              </Form.Label>
            </>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddPublication(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => setAddPublication(false)}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Publications;
