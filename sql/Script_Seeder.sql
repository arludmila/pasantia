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
('Admin', 'Admin 1', 'admin@example.com', 1, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Admin 2', 'admin2@colegioprivado2.com', 2, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Admin 3', 'admin3@escuelasecundaria3.com', 3, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Admin 4', 'admin4@colegiopublico4.com', 4, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Admin 5', 'admin5@institutopublico5.com', 5, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Admin 6', 'admin6@colegiotecnico6.com', 6, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Admin 7', 'admin7@centroseducativo7.com', 7, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Admin 8', 'admin8@universidad8.com', 8, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Admin 9', 'admin9@institutodeformacion9.com', 9, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1),
('Admin', 'Admin 10', 'admin10@escueladeartes10.com', 10, '$2b$08$aAaX6eVQjjKR57s/1qczl.uYi0BsWBLN1cu.vh630rQf/5MHhrkm.', 1);
