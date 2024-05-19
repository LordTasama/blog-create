CREATE TABLE Rol (
    id INT(1) PRIMARY KEY,
    nombre VARCHAR(50)
);

INSERT INTO Rol (id, nombre) VALUES (1, 'Propietario'),(2, 'Usuario');

CREATE TABLE Usuario (
    identificacion BIGINT PRIMARY KEY NOT NULL,
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
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    imagen VARCHAR(255),
    fecha_creacion DATE NOT NULL,
    usuario_id BIGINT NOT NULL,
    CONSTRAINT FOREIGN KEY (usuario_id) REFERENCES Usuario(identificacion)
);

CREATE TABLE Comentario (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    contenido TEXT NOT NULL,
    fecha_publicacion DATE NOT NULL,
    usuario_id BIGINT NOT NULL,
    publicacion_id BIGINT NOT NULL,
    CONSTRAINT FOREIGN KEY (usuario_id) REFERENCES Usuario(identificacion),
    CONSTRAINT FOREIGN KEY (publicacion_id) REFERENCES Publicacion(id)
);
