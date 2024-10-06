DROP TABLE IF EXISTS administrador;
DROP TABLE IF EXISTS carreras;
DROP TABLE IF EXISTS institucion;

CREATE TABLE institucion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cue INT NOT NULL,
    cueanexo INT,
    nombre VARCHAR(60) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    ubicacion_lat DECIMAL(22, 19),
    ubicacion_long DECIMAL(22, 19),
    tel VARCHAR(15),
    pagina VARCHAR(45),
    gestion ENUM('Publica', 'Privada'),
    estado INT NOT NULL
);
CREATE TABLE carreras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    tipo VARCHAR(60) NOT NULL,
    descripcion VARCHAR(100),
    plan_de_estudio VARCHAR(100),
    modalidad ENUM('Presencial', 'Virtual', 'Semipresencial'),
    cupo VARCHAR(45),
    duracion_anios INT NOT NULL,
    duracion_meses INT NOT NULL,
    fecha_inscripcion DATETIME  NOT NULL,
    observacion VARCHAR(45),
    institucion_id INT NOT NULL,
    estado INT NOT NULL,
    prioridad INT,
    FOREIGN KEY (institucion_id) REFERENCES institucion(id)
);


CREATE TABLE administrador (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rol ENUM('Admin', 'SuperUser') NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    correo VARCHAR(45) NOT NULL,
    id_institucion INT,
    clave VARCHAR(60) NOT NULL,
    estado INT,
    FOREIGN KEY (id_institucion) REFERENCES institucion(id)
);