import fs from "fs";
const borrarArchivo = (nameFile, route) => {
  fs.unlink(`./images/${route}/` + nameFile, (err) => {
    if (err) console.log(err);
    else {
      console.log("Archivo borrado");
    }
  });
};

export default borrarArchivo;
