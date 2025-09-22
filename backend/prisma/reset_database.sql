DROP TABLE IF EXISTS accesos;
DROP TABLE IF EXISTS expensa_cargos;
DROP TABLE IF EXISTS expensa_items;
DROP TABLE IF EXISTS expensa_pagos;
DROP TABLE IF EXISTS expensa_periodo;
DROP TABLE IF EXISTS invitados;
DROP TABLE IF EXISTS multas_evidencias;
DROP TABLE IF EXISTS multas;
DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS usuarios_parcelas;
DROP TABLE IF EXISTS parcelas;
DROP TABLE IF EXISTS usuarios_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS servicios;
DROP TABLE IF EXISTS sesiones_web;
DROP TABLE IF EXISTS usuarios_web;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `direccion` varchar(120) DEFAULT NULL,
  `contacto` varchar(80) DEFAULT NULL,
  `creado_en` datetime NOT NULL,
  `actualizado_en` datetime NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `dni` (`dni`)
);

CREATE TABLE IF NOT EXISTS `invitados` (
  `id_invitado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `id_responsable` int NOT NULL,
  `fecha_visita` date DEFAULT NULL,
  `permiso` enum('autorizado','denegado','pendiente') DEFAULT 'pendiente',
  `observaciones` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_invitado`),
  KEY `fk_inv_responsable` (`id_responsable`),
  KEY `idx_invitado_dni` (`dni`),
  CONSTRAINT `fk_inv_responsable` FOREIGN KEY (`id_responsable`) REFERENCES `usuarios` (`id_usuario`)
);

CREATE TABLE IF NOT EXISTS `accesos` (
  `id_acceso` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_invitado` int DEFAULT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` enum('entrada','salida') NOT NULL,
  `guardia` varchar(80) DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_acceso`),
  KEY `fk_acc_usuario` (`id_usuario`),
  KEY `fk_acc_invitado` (`id_invitado`),
  KEY `idx_acc_fh` (`fecha_hora`),
  CONSTRAINT `fk_acc_invitado` FOREIGN KEY (`id_invitado`) REFERENCES `invitados` (`id_invitado`),
  CONSTRAINT `fk_acc_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
);

CREATE TABLE IF NOT EXISTS `servicios` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(30) DEFAULT NULL,
  `nombre` varchar(80) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_servicio`),
  UNIQUE KEY `codigo` (`codigo`)
);

CREATE TABLE IF NOT EXISTS `expensa_items` (
  `id_item` int NOT NULL AUTO_INCREMENT,
  `id_servicio` int NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_item`),
  KEY `fk_ei_serv` (`id_servicio`),
  CONSTRAINT `fk_ei_serv` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`)
);

CREATE TABLE IF NOT EXISTS `parcelas` (
  `id_parcela` int NOT NULL AUTO_INCREMENT,
  `codigo_lote` varchar(50) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `estado_propiedad` enum('ocupada','desocupada','en_obra','incobrable','otro') DEFAULT 'ocupada',
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_parcela`),
  UNIQUE KEY `codigo_lote` (`codigo_lote`)
);

CREATE TABLE IF NOT EXISTS `expensa_periodo` (
  `id_periodo` int NOT NULL AUTO_INCREMENT,
  `periodo` char(7) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `notas` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_periodo`),
  UNIQUE KEY `periodo` (`periodo`)
);

CREATE TABLE IF NOT EXISTS `expensa_cargos` (
  `id_cargo` int NOT NULL AUTO_INCREMENT,
  `id_periodo` int NOT NULL,
  `id_parcela` int NOT NULL,
  `id_item` int DEFAULT NULL,
  `importe` decimal(12,2) NOT NULL,
  `detalle` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_cargo`),
  KEY `fk_ec_periodo` (`id_periodo`),
  KEY `fk_ec_item` (`id_item`),
  KEY `idx_ec_parcela_periodo` (`id_parcela`,`id_periodo`),
  CONSTRAINT `fk_ec_item` FOREIGN KEY (`id_item`) REFERENCES `expensa_items` (`id_item`),
  CONSTRAINT `fk_ec_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`),
  CONSTRAINT `fk_ec_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `expensa_periodo` (`id_periodo`)
);

CREATE TABLE IF NOT EXISTS `expensa_pagos` (
  `id_pago` bigint NOT NULL AUTO_INCREMENT,
  `id_periodo` int NOT NULL,
  `id_parcela` int NOT NULL,
  `fecha` date NOT NULL,
  `medio` varchar(40) DEFAULT NULL,
  `importe` decimal(12,2) NOT NULL,
  `referencia` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_pago`),
  KEY `fk_ep_periodo` (`id_periodo`),
  KEY `idx_ep_parcela_periodo` (`id_parcela`,`id_periodo`),
  CONSTRAINT `fk_ep_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`),
  CONSTRAINT `fk_ep_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `expensa_periodo` (`id_periodo`)
);

CREATE TABLE IF NOT EXISTS `multas` (
  `id_multa` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_parcela` int DEFAULT NULL,
  `causa` varchar(150) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `tipo` varchar(60) DEFAULT NULL,
  `monto` decimal(12,2) DEFAULT '0.00',
  `fecha_emision` datetime DEFAULT NULL,
  `estado_multa` enum('pendiente','abonada','anulada','en_reclamo') DEFAULT 'pendiente',
  `creado_por` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_multa`),
  KEY `idx_mul_usuario` (`id_usuario`),
  KEY `idx_mul_parcela` (`id_parcela`),
  KEY `idx_mul_estado` (`estado_multa`),
  CONSTRAINT `fk_mul_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`),
  CONSTRAINT `fk_mul_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
);

CREATE TABLE IF NOT EXISTS `multas_evidencias` (
  `id_evidencia` int NOT NULL AUTO_INCREMENT,
  `id_multa` int NOT NULL,
  `nombre_img` varchar(150) DEFAULT NULL,
  `ruta` varchar(255) DEFAULT NULL,
  `tipo_mime` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_evidencia`),
  KEY `fk_me_multa` (`id_multa`),
  CONSTRAINT `fk_me_multa` FOREIGN KEY (`id_multa`) REFERENCES `multas` (`id_multa`)
);

CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` tinyint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `nombre` (`nombre`)
);

CREATE TABLE IF NOT EXISTS `usuarios_web` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `dni` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar_hash` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `correo_electronico` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contrasena` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `admin` tinyint NOT NULL DEFAULT (0),
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`),
  CONSTRAINT `FK_usuarios_web_usuarios` FOREIGN KEY (`dni`) REFERENCES `usuarios` (`dni`)
);

CREATE TABLE IF NOT EXISTS `sesiones_web` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `usuario_id` varchar(36) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `user_agent` varchar(512) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_expiracion` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `sesiones_web_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_web` (`id`)
);

CREATE TABLE IF NOT EXISTS `usuarios_parcelas` (
  `id_usuario_parcela` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_parcela` int NOT NULL,
  `rol_propiedad` enum('propietario','inquilino','responsable','otro') NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_usuario_parcela`),
  KEY `idx_up_usuario` (`id_usuario`),
  KEY `idx_up_parcela` (`id_parcela`),
  CONSTRAINT `fk_up_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`),
  CONSTRAINT `fk_up_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
);

CREATE TABLE IF NOT EXISTS `usuarios_roles` (
  `id_usuario` int NOT NULL,
  `id_rol` tinyint NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_rol`),
  KEY `fk_ur_rol` (`id_rol`),
  CONSTRAINT `fk_ur_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`),
  CONSTRAINT `fk_ur_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
);

CREATE TABLE IF NOT EXISTS `vehiculos` (
  `id_vehiculo` int NOT NULL AUTO_INCREMENT,
  `placa` varchar(15) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(60) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `anio` smallint DEFAULT NULL,
  `fecha_fabricacion` date DEFAULT NULL,
  `num_seguro` varchar(40) DEFAULT NULL,
  `info_seguro` varchar(150) DEFAULT NULL,
  `num_registro` varchar(40) DEFAULT NULL,
  `info_registro` varchar(150) DEFAULT NULL,
  `vtv` varchar(150) DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_parcela` int DEFAULT NULL,
  PRIMARY KEY (`id_vehiculo`),
  UNIQUE KEY `placa` (`placa`),
  KEY `idx_veh_usuario` (`id_usuario`),
  KEY `idx_veh_parcela` (`id_parcela`),
  CONSTRAINT `fk_veh_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`),
  CONSTRAINT `fk_veh_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
);