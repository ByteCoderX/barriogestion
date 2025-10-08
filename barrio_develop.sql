-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.3 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- Script generado manualmente siguiendo formato de volcado estándar (HeidiSQL style)
-- --------------------------------------------------------

-- Volcando estructura de base de datos para barrio_develop
CREATE DATABASE IF NOT EXISTS `barrio_develop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `barrio_develop`;

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.roles
-- Tabla de roles del sistema (admin, residente, guardia, etc.)
CREATE TABLE `roles` (
  `id_rol` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(50) UNIQUE NOT NULL
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.usuarios
-- Contiene información de los usuarios registrados en el sistema
CREATE TABLE `usuarios` (
  `id_usuario` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `direccion` VARCHAR(100),
  `contacto` VARCHAR(50),
  `dni` VARCHAR(20) UNIQUE NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  `id_rol` INT
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.invitados
-- Registra los invitados y visitas autorizadas por usuarios
CREATE TABLE `invitados` (
  `id_invitado` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `fecha_visita` DATETIME NOT NULL,
  `fecha_salida` DATETIME NOT NULL,
  `dni` VARCHAR(20),
  `tipo_visita` VARCHAR(35),
  `motivo` VARCHAR(50),
  `id_usuario` INT NOT NULL,
  `contacto` VARCHAR(120),
  `observaciones` VARCHAR(1024) NOT NULL,
  `estado` VARCHAR(50)
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.registro_accesos
-- Guarda el registro de entradas y salidas al barrio (vehículos/personas)
CREATE TABLE `registro_accesos` (
  `id_accesos` INT PRIMARY KEY AUTO_INCREMENT,
  `acceso_tipo` VARCHAR(50) NOT NULL,
  `acceso_medio` VARCHAR(50) NOT NULL,
  `fecha_acceso` DATE NOT NULL,
  `dni` VARCHAR(20),
  `permiso` VARCHAR(30),
  `detalles` VARCHAR(255)
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.reclamos
-- Gestiona reclamos o incidencias presentadas por los vecinos
CREATE TABLE `reclamos` (
  `id_reclamo` INT PRIMARY KEY AUTO_INCREMENT,
  `titulo` VARCHAR(50),
  `categoria` VARCHAR(50),
  `prioridad` VARCHAR(30),
  `ubicacion` VARCHAR(120),
  `descripcion` VARCHAR(512),
  `dni` INT
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.multas
-- Registra sanciones o infracciones aplicadas a usuarios
CREATE TABLE `multas` (
  `id_multa` INT PRIMARY KEY AUTO_INCREMENT,
  `descripcion` VARCHAR(150) NOT NULL,
  `causa` VARCHAR(150),
  `fecha_emision` DATETIME,
  `estado` VARCHAR(50)
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.usuarios_multas
-- Tabla intermedia que relaciona usuarios con multas
CREATE TABLE `usuarios_multas` (
  `id_usuario` INT,
  `id_multa` INT,
  PRIMARY KEY (`id_usuario`, `id_multa`)
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.expensas
-- Contiene las expensas emitidas a cada usuario
CREATE TABLE `expensas` (
  `id_expensa` INT PRIMARY KEY AUTO_INCREMENT,
  `periodo` VARCHAR(50) NOT NULL,
  `fecha_emision` DATETIME,
  `fecha_vencimiento` DATETIME,
  `estado` VARCHAR(50),
  `fecha_pago` DATETIME,
  `metodo_pago` VARCHAR(50),
  `dni` INT
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.expensas_items
-- Detalla los conceptos que conforman cada expensa
CREATE TABLE `expensas_items` (
  `id_item` INT PRIMARY KEY AUTO_INCREMENT,
  `id_expensa` INT,
  `titulo` VARCHAR(50),
  `descripcion` VARCHAR(250),
  `monto` INT
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.usuarios_expensas
-- Relaciona usuarios con expensas y montos asignados
CREATE TABLE `usuarios_expensas` (
  `id_usuario` INT,
  `id_expensa` INT,
  `monto` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_expensa`)
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.espacios_publicos
-- Contiene los espacios del barrio que pueden reservarse (salón, quincho, etc.)
CREATE TABLE `espacios_publicos` (
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

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.reservas
-- Registra las reservas realizadas por los usuarios
CREATE TABLE `reservas` (
  `id_reserva` INT PRIMARY KEY AUTO_INCREMENT,
  `fecha_reserva` DATETIME NOT NULL,
  `dni` INT,
  `id_espacio` INT,
  `hora_inicio` DATETIME,
  `hora_fin` DATETIME,
  `cantidad_personas` INT,
  `obsrevaciones` VARCHAR(1024)
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.sesiones_web
-- Controla las sesiones activas de usuarios en la aplicación web
CREATE TABLE `sesiones_web` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `usuario_id` varchar(36) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `user_agent` varchar(512) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_expiracion` datetime NOT NULL
);

-- --------------------------------------------------------
-- Volcando estructura para tabla barrio_develop_v2.usuarios_web
-- Contiene los usuarios del sistema web (autenticación y perfiles)
CREATE TABLE `usuarios_web` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `dni` varchar(20) NOT NULL,
  `avatar_hash` varchar(128) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT 0
);

-- --------------------------------------------------------
-- Relaciones entre tablas (claves foráneas)
ALTER TABLE `usuarios` ADD FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
ALTER TABLE `invitados` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
ALTER TABLE `usuarios_multas` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
ALTER TABLE `usuarios_multas` ADD FOREIGN KEY (`id_multa`) REFERENCES `multas` (`id_multa`);
ALTER TABLE `usuarios_expensas` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
ALTER TABLE `usuarios_expensas` ADD FOREIGN KEY (`id_expensa`) REFERENCES `expensas` (`id_expensa`);
ALTER TABLE `reservas` ADD FOREIGN KEY (`dni`) REFERENCES `usuarios` (`id_usuario`);
ALTER TABLE `reservas` ADD FOREIGN KEY (`id_espacio`) REFERENCES `espacios_publicos` (`id_espacio`);
ALTER TABLE `sesiones_web` ADD CONSTRAINT `sesiones_web_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_web` (`id`);
ALTER TABLE `usuarios_web` ADD CONSTRAINT `FK_usuarios_web_usuarios` FOREIGN KEY (`dni`) REFERENCES `usuarios` (`dni`);
ALTER TABLE `usuarios` ADD FOREIGN KEY (`dni`) REFERENCES `reclamos` (`dni`);
ALTER TABLE `usuarios` ADD FOREIGN KEY (`dni`) REFERENCES `registro_accesos` (`dni`);
ALTER TABLE `expensas` ADD FOREIGN KEY (`id_expensa`) REFERENCES `expensas_items` (`id_expensa`);

-- --------------------------------------------------------
-- Fin del volcado de estructura para barrio_develop
