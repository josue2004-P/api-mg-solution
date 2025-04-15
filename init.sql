-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: test_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BP_01_USUARIO`
--

DROP TABLE IF EXISTS `BP_01_USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BP_01_USUARIO` (
  `nId01Usuario` int NOT NULL AUTO_INCREMENT,
  `sNombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sApellidoPaterno` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sApellidoMaterno` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sUsuario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sEmail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sPassword` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bActivo` tinyint(1) NOT NULL DEFAULT '0',
  `dFechaCreacion` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dFechaActualizacion` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`nId01Usuario`),
  UNIQUE KEY `BP_01_USUARIO_sUsuario_key` (`sUsuario`),
  UNIQUE KEY `BP_01_USUARIO_sEmail_key` (`sEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BP_01_USUARIO`
--

LOCK TABLES `BP_01_USUARIO` WRITE;
/*!40000 ALTER TABLE `BP_01_USUARIO` DISABLE KEYS */;
INSERT INTO `BP_01_USUARIO` VALUES (1,'Josue','Perez','Eulogio','JOSUE','josue@hotmail.com','$2a$10$z7b3aYdX7hcvBIKzbVP5uuGgI4M7UFEgbBL3hNK6HfAKiK7LEGN4y',0,'2025-04-15 22:28:17.804',NULL);
/*!40000 ALTER TABLE `BP_01_USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BP_02_PERFIL`
--

DROP TABLE IF EXISTS `BP_02_PERFIL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BP_02_PERFIL` (
  `nId02Perfil` int NOT NULL AUTO_INCREMENT,
  `sNombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sDescripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dFechaCreacion` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dFechaActualizacion` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`nId02Perfil`),
  UNIQUE KEY `BP_02_PERFIL_sNombre_key` (`sNombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BP_02_PERFIL`
--

LOCK TABLES `BP_02_PERFIL` WRITE;
/*!40000 ALTER TABLE `BP_02_PERFIL` DISABLE KEYS */;
INSERT INTO `BP_02_PERFIL` VALUES (1,'CLIENTE','CLIENTE DEL SISTEMA','2025-04-15 22:33:21.022',NULL),(2,'ADMINISTRADOR','ADMINISTRADOR DEL SISTEMA','2025-04-15 22:33:35.491',NULL);
/*!40000 ALTER TABLE `BP_02_PERFIL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BP_03_PERMISO`
--

DROP TABLE IF EXISTS `BP_03_PERMISO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BP_03_PERMISO` (
  `nId03Permiso` int NOT NULL AUTO_INCREMENT,
  `sNombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sDescripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dFechaCreacion` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dFechaActualizacion` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`nId03Permiso`),
  UNIQUE KEY `BP_03_PERMISO_sNombre_key` (`sNombre`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BP_03_PERMISO`
--

LOCK TABLES `BP_03_PERMISO` WRITE;
/*!40000 ALTER TABLE `BP_03_PERMISO` DISABLE KEYS */;
INSERT INTO `BP_03_PERMISO` VALUES (1,'USUARIOS','CONTROL DE USUARIOS','2025-04-15 22:39:27.095',NULL);
/*!40000 ALTER TABLE `BP_03_PERMISO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BP_04_PERFIL_USUARIO`
--

DROP TABLE IF EXISTS `BP_04_PERFIL_USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BP_04_PERFIL_USUARIO` (
  `nId04PerfilUsuario` int NOT NULL AUTO_INCREMENT,
  `nId01Usuario` int NOT NULL,
  `nId02Perfil` int NOT NULL,
  `dFechaCreacion` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dFechaActualizacion` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`nId04PerfilUsuario`),
  KEY `BP_04_PERFIL_USUARIO_nId01Usuario_fkey` (`nId01Usuario`),
  KEY `BP_04_PERFIL_USUARIO_nId02Perfil_fkey` (`nId02Perfil`),
  CONSTRAINT `BP_04_PERFIL_USUARIO_nId01Usuario_fkey` FOREIGN KEY (`nId01Usuario`) REFERENCES `BP_01_USUARIO` (`nId01Usuario`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BP_04_PERFIL_USUARIO_nId02Perfil_fkey` FOREIGN KEY (`nId02Perfil`) REFERENCES `BP_02_PERFIL` (`nId02Perfil`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BP_04_PERFIL_USUARIO`
--

LOCK TABLES `BP_04_PERFIL_USUARIO` WRITE;
/*!40000 ALTER TABLE `BP_04_PERFIL_USUARIO` DISABLE KEYS */;
INSERT INTO `BP_04_PERFIL_USUARIO` VALUES (1,1,2,'2025-04-15 22:37:57.164',NULL);
/*!40000 ALTER TABLE `BP_04_PERFIL_USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BP_05_PERFIL_PERMISO`
--

DROP TABLE IF EXISTS `BP_05_PERFIL_PERMISO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BP_05_PERFIL_PERMISO` (
  `nId05PerfilPermiso` int NOT NULL AUTO_INCREMENT,
  `nId03Permiso` int NOT NULL,
  `nId02Perfil` int NOT NULL,
  `nLeer` tinyint(1) NOT NULL DEFAULT '0',
  `nCrear` tinyint(1) NOT NULL DEFAULT '0',
  `nEditar` tinyint(1) NOT NULL DEFAULT '0',
  `nBorrar` tinyint(1) NOT NULL DEFAULT '0',
  `dFechaCreacion` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dFechaActualizacion` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`nId05PerfilPermiso`),
  KEY `BP_05_PERFIL_PERMISO_nId03Permiso_fkey` (`nId03Permiso`),
  KEY `BP_05_PERFIL_PERMISO_nId02Perfil_fkey` (`nId02Perfil`),
  CONSTRAINT `BP_05_PERFIL_PERMISO_nId02Perfil_fkey` FOREIGN KEY (`nId02Perfil`) REFERENCES `BP_02_PERFIL` (`nId02Perfil`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BP_05_PERFIL_PERMISO_nId03Permiso_fkey` FOREIGN KEY (`nId03Permiso`) REFERENCES `BP_03_PERMISO` (`nId03Permiso`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BP_05_PERFIL_PERMISO`
--

LOCK TABLES `BP_05_PERFIL_PERMISO` WRITE;
/*!40000 ALTER TABLE `BP_05_PERFIL_PERMISO` DISABLE KEYS */;
INSERT INTO `BP_05_PERFIL_PERMISO` VALUES (1,1,2,0,0,0,0,'2025-04-15 22:40:09.677',NULL);
/*!40000 ALTER TABLE `BP_05_PERFIL_PERMISO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('a5af2a54-fb51-4a42-9679-c9f4a04fa161','4ea97d1d2058ff1b6bc35cb9fa3597fd066126f9204227eaa06e6b98da59160a','2025-04-15 22:25:27.051','20250415222526_init',NULL,NULL,'2025-04-15 22:25:26.435',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-15 22:41:11
