// Bootstrap
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Publications = () => {
  return (
    <>
      <Button
        variant="secondary"
        style={{ position: "fixed", right: "2%", bottom: "7%" }}
        title="Crear publicación"
      >
        <FontAwesomeIcon icon={faPlus} size="lg" className="bg-transparent" />
      </Button>
    </>
  );
};
export default Publications;
