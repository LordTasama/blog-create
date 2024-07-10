// Bootstrap
import {
  Form,
  Button,
  Modal,
  Image,
  Container,
  Card,
  Row,
  Col,
  InputGroup,
} from 'react-bootstrap';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faImages,
  faLeaf,
  faComment,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

// SweetAlert
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
// React
import { useState, useEffect, useContext } from 'react';

import { UserIdContext } from './userIdContext';

const Publications = () => {
  const usuarioInfo = useContext(UserIdContext);

  const [Publications, setPublications] = useState([]);
  const [Comments, setComments] = useState([]);
  const [addPublication, setAddPublication] = useState(false);
  const [FormAddPublication, setFormAddPublication] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    usuario_id: 1114149123,
  });
  const handleAddPublication = async () => {
    const data = new FormData();
    data.append('titulo', FormAddPublication.titulo);
    data.append('descripcion', FormAddPublication.descripcion);
    data.append('imagen', FormAddPublication.imagen);
    data.append('usuario_id', FormAddPublication.usuario_id);

    try {
      const response = await fetch('http://localhost:3000/publicaciones', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.id) {
          Swal.fire({
            title: 'Publicación creada',
            text: 'Has hecho exitosamente una publicación',
            icon: 'success',
            timer: 2000,
          });
          setAddPublication(false);
          getPublications();
        } else {
          Swal.fire({
            title: 'Algo falló...',
            text: result.response,
            icon: 'info',
            timer: 2000,
          });
        }
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  const handleChangeAdd = (inputToChange, event) => {
    inputToChange == 'title'
      ? (FormAddPublication.titulo = event.target.value)
      : (FormAddPublication.descripcion = event.target.value);
  };
  const [imageUploadedAdd, setImageUploadedAdd] = useState('');
  const handleFileChangeAdd = event => {
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
      const response = await fetch('http://localhost:3000/publicaciones', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const result = await response.json();

        setPublications(result);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  const getComments = async () => {
    try {
      const response = await fetch('http://localhost:3000/comentarios', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const result = await response.json();

        setComments(result);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  const handleCommentDisplay = event => {
    event.currentTarget.parentElement.parentElement.children[1].classList.toggle(
      'd-none',
    );
  };
  const handleComment = async (id, event) => {
    const text = event.currentTarget.parentElement.children[0];
    if (text.value.length == 0) {
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          contenido: text.value,
          fecha_publicacion: '',
          usuario_id: 1114149123,
          publicacion_id: id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.id) {
          getComments();
          text.value = '';
        }
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  useEffect(() => {
    getPublications();
    getComments();
  }, []);
  return (
    <>
      {Publications.length > 0 ? (
        <>
          {Publications.map((e, index) => (
            <Container key={index}>
              <Row>
                <Col
                  xxl="12"
                  xl="12"
                  lg="12"
                  md="12"
                  sm="12"
                  className="d-flex justify-content-center mb-3"
                >
                  <Card
                    className="card-publication"
                    style={{ backgroundColor: '#242526' }}
                  >
                    <Card.Header>
                      <div>
                        <Image
                          src={
                            'http://localhost:3000/images/perfil_photo/' +
                            e.Usuario.foto_perfil
                          }
                          fluid
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                          }}
                        />
                        <small className="h6 ms-1 text-light">
                          {e.Usuario.nombre} {e.Usuario.apellido}
                        </small>
                      </div>
                    </Card.Header>
                    <Card.Body className="text-light">
                      <Card.Title>{e.titulo}</Card.Title>
                      <Card.Text>{e.descripcion}</Card.Text>
                      {e.imagen != '' ? (
                        <Card.Img
                          variant="top"
                          src={
                            'http://localhost:3000/images/publication_photo/' +
                            e.imagen
                          }
                        />
                      ) : (
                        ''
                      )}
                    </Card.Body>
                    <Card.Footer>
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
                            style={{ borderRadius: '30%', border: 'none' }}
                            title="Comentar"
                            onClick={event => {
                              handleCommentDisplay(event);
                            }}
                          >
                            <FontAwesomeIcon icon={faComment} />
                          </Button>
                        </Col>
                        <Container className="d-none">
                          <Col
                            xxl="12"
                            xl="12"
                            lg="12"
                            md="12"
                            sm="12"
                            className="d-flex justify-content-center mb-3"
                          >
                            <InputGroup>
                              <Form.Control
                                className="text-light placeholder-comment"
                                as="textarea"
                                placeholder="Comentario"
                              />
                              <Button
                                variant="secondary"
                                title="Enviar"
                                onClick={event => {
                                  handleComment(e.id, event);
                                }}
                              >
                                <FontAwesomeIcon icon={faPaperPlane} />
                              </Button>
                            </InputGroup>
                          </Col>
                          <div
                            className="pt-4 pb-3  rounded"
                            style={{ backgroundColor: '#18191a' }}
                          >
                            {Comments.filter(e2 => e.id === e2.publicacion_id)
                              .length > 0 ? (
                              Comments.filter(
                                e2 => e.id === e2.publicacion_id,
                              ).map((e2, index2) => (
                                <Col
                                  key={index2}
                                  xxl="12"
                                  xl="12"
                                  lg="12"
                                  md="12"
                                  sm="12"
                                  className="mb-3 mx-auto rounded p-2"
                                  style={{
                                    width: '90%',
                                    backgroundColor: '#242526',
                                  }}
                                >
                                  <Image
                                    src={
                                      'http://localhost:3000/images/perfil_photo/' +
                                      e2.Usuario.foto_perfil
                                    }
                                    fluid
                                    style={{
                                      width: '30px',
                                      height: '30px',
                                      borderRadius: '50%',
                                    }}
                                  />
                                  <small
                                    className="ms-1 text-light"
                                    style={{
                                      fontSize: '15px',
                                      fontWeight: '600',
                                    }}
                                  >
                                    {e2.Usuario.nombre} {e2.Usuario.apellido}
                                  </small>
                                  <br />
                                  <small className="mt-1 text-light">
                                    {e2.contenido}
                                  </small>
                                </Col>
                              ))
                            ) : (
                              <p className="h6 text-light text-center">
                                No hay comentarios para esta publicación
                              </p>
                            )}
                          </div>
                        </Container>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Container>
          ))}
        </>
      ) : (
        <h1 className="text-center text-light">
          No hay ninguna publicación actualmente
        </h1>
      )}
      {/* SOLUCIONAR */}
      {/* {usuarioInfo.rol_id == 1 ? ( */}
      <Button
        variant="secondary"
        style={{ position: 'fixed', right: '2%', bottom: '7%' }}
        title="Crear publicación"
        onClick={() => setAddPublication(true)}
      >
        <FontAwesomeIcon icon={faPlus} size="lg" className="bg-transparent" />
      </Button>
      {/* // ) : null} */}
      {/* Modals */}
      <Modal show={addPublication} className="text-light">
        <Modal.Header style={{ backgroundColor: '#242526' }}>
          <Modal.Title>Crear publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#242526' }}>
          <Form>
            <Form.Floating className="mb-3">
              <Form.Control
                id="titleAddPublication"
                type="text"
                placeholder=""
                title="Agrega un título"
                defaultValue={FormAddPublication.titulo}
                onChange={event => handleChangeAdd('title', event)}
                className="placeholder-comment text-light"
              />
              <Form.Label className="text-light label-modal">Título</Form.Label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="descriptionAddPublication"
                as="textarea"
                placeholder=""
                title="Agrega una descripción"
                defaultValue={FormAddPublication.descripcion}
                onChange={event => handleChangeAdd('description', event)}
                className="placeholder-comment text-light"
              />
              <Form.Label className="text-light label-modal">
                Descripción
              </Form.Label>
            </Form.Floating>
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
        <Modal.Footer style={{ backgroundColor: '#242526' }}>
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
