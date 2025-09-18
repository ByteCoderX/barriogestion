-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.3 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para barrio_develop
CREATE DATABASE IF NOT EXISTS `barrio_develop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `barrio_develop`;

-- Volcando estructura para tabla barrio_develop.accesos
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.accesos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.expensa_cargos
CREATE TABLE IF NOT EXISTS `expensa_cargos` (
  `id_cargo` bigint NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.expensa_cargos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.expensa_items
CREATE TABLE IF NOT EXISTS `expensa_items` (
  `id_item` int NOT NULL AUTO_INCREMENT,
  `id_servicio` int NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_item`),
  KEY `fk_ei_serv` (`id_servicio`),
  CONSTRAINT `fk_ei_serv` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.expensa_items: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.expensa_pagos
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.expensa_pagos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.expensa_periodo
CREATE TABLE IF NOT EXISTS `expensa_periodo` (
  `id_periodo` int NOT NULL AUTO_INCREMENT,
  `periodo` char(7) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `notas` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_periodo`),
  UNIQUE KEY `periodo` (`periodo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.expensa_periodo: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.invitados
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.invitados: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.jwt
CREATE TABLE IF NOT EXISTS `jwt` (
  `rId` varchar(255) NOT NULL,
  `tokenExpirationNow` int NOT NULL,
  `tokenExpirationOffset` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`rId`),
  KEY `FK__usuarios` (`userId`),
  CONSTRAINT `FK__usuarios` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='puro sexo. La puta madre elias, esto era tu laburo';

-- Volcando datos para la tabla barrio_develop.jwt: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.multas
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.multas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.multas_evidencias
CREATE TABLE IF NOT EXISTS `multas_evidencias` (
  `id_evidencia` int NOT NULL AUTO_INCREMENT,
  `id_multa` int NOT NULL,
  `nombre_img` varchar(150) DEFAULT NULL,
  `ruta` varchar(255) DEFAULT NULL,
  `tipo_mime` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_evidencia`),
  KEY `fk_me_multa` (`id_multa`),
  CONSTRAINT `fk_me_multa` FOREIGN KEY (`id_multa`) REFERENCES `multas` (`id_multa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.multas_evidencias: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.parcelas
CREATE TABLE IF NOT EXISTS `parcelas` (
  `id_parcela` int NOT NULL AUTO_INCREMENT,
  `codigo_lote` varchar(50) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `estado_propiedad` enum('ocupada','desocupada','en_obra','incobrable','otro') DEFAULT 'ocupada',
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_parcela`),
  UNIQUE KEY `codigo_lote` (`codigo_lote`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.parcelas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` tinyint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.roles: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.servicios
CREATE TABLE IF NOT EXISTS `servicios` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(30) DEFAULT NULL,
  `nombre` varchar(80) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_servicio`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.servicios: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `direccion` varchar(120) DEFAULT NULL,
  `contacto` varchar(80) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `creado_en` int NOT NULL,
  `actualizado_en` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.usuarios: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.usuarios_parcelas
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.usuarios_parcelas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.usuarios_roles
CREATE TABLE IF NOT EXISTS `usuarios_roles` (
  `id_usuario` int NOT NULL,
  `id_rol` tinyint NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_rol`),
  KEY `fk_ur_rol` (`id_rol`),
  CONSTRAINT `fk_ur_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`),
  CONSTRAINT `fk_ur_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.usuarios_roles: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop.vehiculos
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla barrio_develop.vehiculos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla barrio_develop._prisma_migrations
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla barrio_develop._prisma_migrations: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
