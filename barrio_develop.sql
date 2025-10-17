CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `direccion` VARCHAR(100),
  `contacto` VARCHAR(50),
  `dni` VARCHAR(20) UNIQUE NOT NULL,
  `id_rol` INT,
  `creado_en` datetime NOT NULL,
  `actualizado_en` datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS `invitados` (
  `id_invitado` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `fecha_visita` DATETIME NOT NULL,
  `fecha_salida` DATETIME NOT NULL,
  `dni` VARCHAR(20) UNIQUE NOT NULL,
  `tipo_visita` VARCHAR(35),
  `motivo` VARCHAR(50),
  `id_usuario` INT NOT NULL,
  `contacto` VARCHAR(120),
  `observaciones` VARCHAR(1024) NOT NULL,
  `estado` VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS `registro_accesos` (
  `id_accesos` INT PRIMARY KEY AUTO_INCREMENT,
  `acceso_tipo` VARCHAR(50) NOT NULL,
  `acceso_medio` VARCHAR(50) NOT NULL,
  `fecha_acceso` DATE NOT NULL,
  `dni` VARCHAR(20) UNIQUE NOT NULL,
  `permiso` VARCHAR(30),
  `detalles` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `reclamos` (
  `id_reclamo` INT PRIMARY KEY AUTO_INCREMENT,
  `titulo` VARCHAR(50),
  `categoria` VARCHAR(50),
  `prioridad` VARCHAR(30),
  `ubicacion` VARCHAR(120),
  `descripcion` VARCHAR(512),
  `dni` VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS `multas` (
  `id_multa` INT PRIMARY KEY AUTO_INCREMENT,
  `descripcion` VARCHAR(150) NOT NULL,
  `causa` VARCHAR(150),
  `fecha_emision` DATETIME,
  `estado` VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS `usuarios_multas` (
  `id_usuario` INT,
  `id_multa` INT,
  PRIMARY KEY (`id_usuario`, `id_multa`)
);

CREATE TABLE IF NOT EXISTS `expensas` (
  `id_expensa` INT PRIMARY KEY AUTO_INCREMENT,
  `periodo` VARCHAR(50) NOT NULL,
  `fecha_emision` DATETIME,
  `fecha_vencimiento` DATETIME,
  `estado` VARCHAR(50),
  `fecha_pago` DATETIME,
  `metodo_pago` VARCHAR(50),
  `dni` VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS `expensas_items` (
  `id_item` INT PRIMARY KEY AUTO_INCREMENT,
  `id_expensa` INT,
  `titulo` VARCHAR(50),
  `descripcion` VARCHAR(250),
  `monto` INT
);

CREATE TABLE IF NOT EXISTS `usuarios_expensas` (
  `id_usuario` INT,
  `id_expensa` INT,
  `monto` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_expensa`)
);

CREATE TABLE IF NOT EXISTS `espacios_publicos` (
  `id_espacio` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `caracteristicas` VARCHAR(150),
  `direccion` VARCHAR(150),
  `precio` DECIMAL(10,2),
  `hora_apertura` TIME,
  `hora_cierre` TIME,
  `condicion_uso` VARCHAR(150),
  `capacidad` INT,
  `disponibilidad` VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS `reservas` (
  `id_reserva` INT PRIMARY KEY AUTO_INCREMENT,
  `fecha_reserva` DATETIME NOT NULL,
  `id_usuario` INT,
  `id_espacio` INT,
  `hora_inicio` DATETIME,
  `hora_fin` DATETIME,
  `cantidad_personas` INT,
  `obsrevaciones` VARCHAR(1024)
);

CREATE TABLE IF NOT EXISTS `sesiones_web` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `usuario_id` varchar(36) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `user_agent` varchar(512) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_expiracion` datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS `usuarios_web` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `dni` VARCHAR(20) UNIQUE NOT NULL,
  `avatar_hash` varchar(128) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT 0
);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);

ALTER TABLE `invitados` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `usuarios_multas` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `usuarios_multas` ADD FOREIGN KEY (`id_multa`) REFERENCES `multas` (`id_multa`);

ALTER TABLE `usuarios_expensas` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `usuarios_expensas` ADD FOREIGN KEY (`id_expensa`) REFERENCES `expensas` (`id_expensa`);

ALTER TABLE `reservas` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `reservas` ADD FOREIGN KEY (`id_espacio`) REFERENCES `espacios_publicos` (`id_espacio`);

ALTER TABLE `sesiones_web` ADD CONSTRAINT `sesiones_web_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_web` (`id`);

ALTER TABLE `usuarios_web` ADD CONSTRAINT `FK_usuarios_web_usuarios` FOREIGN KEY (`dni`) REFERENCES `usuarios` (`dni`);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`dni`) REFERENCES `reclamos` (`dni`);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`dni`) REFERENCES `registro_accesos` (`dni`);

ALTER TABLE `expensas_items` ADD FOREIGN KEY (`id_expensa`) REFERENCES `expensas` (`id_expensa`);
