INSERT INTO institucion (cue, cueanexo, nombre, direccion, ubicacion_lat, ubicacion_long, tel, pagina, gestion, estado) VALUES
(123456, 789, 'Instituto Tecnológico', 'Calle Falsa 123', -31.425, -64.184, '351-1234567', 'www.tecnologico1.com', 'Publica', 1),
(223456, 780, 'Colegio Privado', 'Av. Siempre Viva 456', -31.4255, -64.185, '351-2345678', 'www.colegioprivado2.com', 'Privada', 1),
(323456, 781, 'Escuela Secundaria', 'Calle del Sol 789', -31.426, -64.186, '351-3456789', 'www.escuelasecundaria3.com', 'Publica', 1),
(423456, 782, 'Colegio Internacional', 'Av. Libertador 321', -31.4265, -64.187, '351-4567890', 'www.colegiopublico4.com', 'Privada', 1),
(523456, 783, 'Instituto de Educación Superior', 'Calle Nueva 654', -31.427, -64.188, '351-5678901', 'www.institutopublico5.com', 'Publica', 1),
(623456, 784, 'Colegio Técnico', 'Av. de los Estudiantes 987', -31.4275, -64.189, '351-6789012', 'www.colegiotecnico6.com', 'Privada', 1),
(723456, 785, 'Centro Educativo', 'Calle 24 de Septiembre 135', -31.428, -64.190, '351-7890123', 'www.centroseducativo7.com', 'Publica', 1),
(823456, 786, 'Universidad', 'Av. Universitaria 456', -31.4285, -64.191, '351-8901234', 'www.universidad8.com', 'Privada', 1),
(923456, 787, 'Instituto de Formación', 'Calle de la Educación 789', -31.429, -64.192, '351-9012345', 'www.institutodeformacion9.com', 'Publica', 1),
(1023456, 788, 'Escuela de Artes', 'Calle del Arte 159', -31.4295, -64.193, '351-0123456', 'www.escueladeartes10.com', 'Privada', 1);


INSERT INTO administrador (rol, nombre, correo, id_institucion, clave, estado) VALUES
('SuperUser', 'SuperUser', 'super@example.com', null, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Ana Gómez', 'admin@example.com', 1, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Luis Martínez', 'admin2@colegioprivado2.com', 2, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'María Rodríguez', 'admin3@escuelasecundaria3.com', 3, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Carlos López', 'admin4@colegiopublico4.com', 4, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Laura Fernández', 'admin5@institutopublico5.com', 5, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Javier Sánchez', 'admin6@colegiotecnico6.com', 6, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Patricia Morales', 'admin7@centroseducativo7.com', 7, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Fernando Díaz', 'admin8@universidad8.com', 8, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Sofía Torres', 'admin9@institutodeformacion9.com', 9, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Diego Herrera', 'admin10@escueladeartes10.com', 10, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1);

INSERT INTO carreras (nombre, tipo, descripcion, plan_de_estudio, modalidad, cupo, duracion_anios, duracion_meses, fecha_inscripcion, observacion, institucion_id, estado, prioridad) VALUES
('Ingeniería en Sistemas', 'Licenciatura', 'Carrera enfocada en desarrollo de software', 'Plan 2023', 'Presencial', '30', 4, 0, '2024-01-01 09:00:00', 'Inicio en enero', 1, 1, 1),
('Técnico en Redes', 'Técnico', 'Formación en redes y comunicaciones', 'Plan 2023', 'Presencial', '25', 2, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 1, 1, 2),
('Diplomado en Ciberseguridad', 'Diplomado', 'Diplomado en seguridad informática', 'Plan 2023', 'Virtual', '20', 1, 6, '2024-03-01 09:00:00', 'Inicio en marzo', 1, 1, 3),

('Educación Inicial', 'Licenciatura', 'Carrera para formar docentes en educación inicial', 'Plan 2023', 'Presencial', '40', 4, 0, '2024-01-01 09:00:00', 'Inicio en enero', 2, 1, 1),
('Psicopedagogía', 'Licenciatura', 'Carrera enfocada en la psicopedagogía', 'Plan 2023', 'Presencial', '35', 4, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 2, 1, 2),
('Técnico en Educación Especial', 'Técnico', 'Formación en educación para discapacitados', 'Plan 2023', 'Semipresencial', '20', 2, 0, '2024-03-01 09:00:00', 'Inicio en marzo', 2, 1, 3),

('Técnico en Administración', 'Técnico', 'Carrera técnica en administración de empresas', 'Plan 2023', 'Presencial', '30', 3, 0, '2024-01-01 09:00:00', 'Inicio en enero', 3, 1, 1),
('Gestión Ambiental', 'Licenciatura', 'Formación en gestión ambiental', 'Plan 2023', 'Virtual', '25', 4, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 3, 1, 2),
('Técnico en Seguridad e Higiene', 'Técnico', 'Carrera en seguridad e higiene laboral', 'Plan 2023', 'Semipresencial', '20', 2, 0, '2024-03-01 09:00:00', 'Inicio en marzo', 3, 1, 3),

('Marketing Digital', 'Licenciatura', 'Carrera en marketing y publicidad digital', 'Plan 2023', 'Presencial', '40', 3, 0, '2024-01-01 09:00:00', 'Inicio en enero', 4, 1, 1),
('Administración de Empresas', 'Licenciatura', 'Carrera en administración y gestión de empresas', 'Plan 2023', 'Presencial', '50', 4, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 4, 1, 2),
('Diseño Gráfico', 'Licenciatura', 'Formación en diseño gráfico y multimedia', 'Plan 2023', 'Semipresencial', '30', 4, 0, '2024-03-01 09:00:00', 'Inicio en marzo', 4, 1, 3),

('Ingeniería Industrial', 'Licenciatura', 'Carrera en ingeniería industrial', 'Plan 2023', 'Presencial', '35', 4, 0, '2024-01-01 09:00:00', 'Inicio en enero', 5, 1, 1),
('Licenciatura en Contabilidad', 'Licenciatura', 'Formación en contabilidad y finanzas', 'Plan 2023', 'Presencial', '30', 4, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 5, 1, 2),
('Diplomado en Gestión de Proyectos', 'Diplomado', 'Diplomado en gestión de proyectos', 'Plan 2023', 'Virtual', '20', 1, 6, '2024-03-01 09:00:00', 'Inicio en marzo', 5, 1, 3),

('Técnico en Electrónica', 'Técnico', 'Carrera en electrónica y automatización', 'Plan 2023', 'Presencial', '30', 2, 0, '2024-01-01 09:00:00', 'Inicio en enero', 6, 1, 1),
('Mecánica Automotriz', 'Técnico', 'Formación en mecánica automotriz', 'Plan 2023', 'Semipresencial', '25', 2, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 6, 1, 2),
('Técnico en Programación', 'Técnico', 'Carrera en programación de software', 'Plan 2023', 'Virtual', '20', 1, 0, '2024-03-01 09:00:00', 'Inicio en marzo', 6, 1, 3),

('Ciencias Sociales', 'Licenciatura', 'Carrera en ciencias sociales y humanidades', 'Plan 2023', 'Presencial', '40', 4, 0, '2024-01-01 09:00:00', 'Inicio en enero', 7, 1, 1),
('Psicología', 'Licenciatura', 'Formación en psicología y salud mental', 'Plan 2023', 'Presencial', '30', 4, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 7, 1, 2),
('Antropología', 'Licenciatura', 'Carrera en antropología social', 'Plan 2023', 'Virtual', '25', 4, 0, '2024-03-01 09:00:00', 'Inicio en marzo', 7, 1, 3),

('Medicina', 'Licenciatura', 'Carrera en medicina y salud', 'Plan 2023', 'Presencial', '50', 6, 0, '2024-01-01 09:00:00', 'Inicio en enero', 8, 1, 1),
('Ingeniería en Software', 'Licenciatura', 'Formación en ingeniería de software', 'Plan 2023', 'Presencial', '40', 4, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 8, 1, 2),
('Maestría en Administración', 'Maestría', 'Programa de maestría en administración de empresas', 'Plan 2023', 'Virtual', '20', 2, 0, '2024-03-01 09:00:00', 'Inicio en marzo', 8, 1, 3),

('Formación Docente', 'Licenciatura', 'Carrera en formación de docentes', 'Plan 2023', 'Presencial', '35', 4, 0, '2024-01-01 09:00:00', 'Inicio en enero', 9, 1, 1),
('Gestión Cultural', 'Licenciatura', 'Carrera en gestión cultural y artística', 'Plan 2023', 'Semipresencial', '30', 4, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 9, 1, 2),
('Educación a Distancia', 'Diplomado', 'Diplomado en educación a distancia', 'Plan 2023', 'Virtual', '25', 1, 6, '2024-03-01 09:00:00', 'Inicio en marzo', 9, 1, 3),

('Música', 'Licenciatura', 'Carrera en música y artes escénicas', 'Plan 2023', 'Presencial', '30', 4, 0, '2024-01-01 09:00:00', 'Inicio en enero', 10, 1, 1),
('Artes Visuales', 'Licenciatura', 'Formación en artes visuales', 'Plan 2023', 'Presencial', '25', 4, 0, '2024-02-01 09:00:00', 'Inicio en febrero', 10, 1, 2),
('Diseño de Modas', 'Técnico', 'Carrera en diseño de modas y textil', 'Plan 2023', 'Semipresencial', '20', 2, 0, '2024-03-01 09:00:00', 'Inicio en marzo', 10, 1, 3);
