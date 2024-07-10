CREATE TABLE Rol (
    id INT(1) PRIMARY KEY,
    nombre VARCHAR(50)
);

INSERT INTO Rol (id, nombre) VALUES (1, 'Propietario'),(2, 'Usuario');

CREATE TABLE Usuario (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    apellido VARCHAR(150) NOT NULL,
    foto_perfil VARCHAR(255),
    correo VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol_id INT,
    CONSTRAINT fk_rol_id FOREIGN KEY (rol_id) REFERENCES Rol(id)
);

CREATE TABLE Publicacion (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(2500) NOT NULL,
    imagen VARCHAR(255),
    fecha_creacion DATETIME NOT NULL,
    usuario_id BIGINT NOT NULL,
    CONSTRAINT FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Comentario (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    contenido VARCHAR(2500) NOT NULL,
    fecha_publicacion DATETIME NOT NULL,
    usuario_id BIGINT NOT NULL,
    publicacion_id BIGINT NOT NULL,
    CONSTRAINT FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    CONSTRAINT FOREIGN KEY (publicacion_id) REFERENCES Publicacion(id)
);
