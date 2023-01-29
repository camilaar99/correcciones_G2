-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: grupo2
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product` (
  `order_prod_id` tinyint DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `sub_total_prod` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `order_number` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `teamName` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `size` varchar(10) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `jugador` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `imagen` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `price` int DEFAULT NULL,
  `grupo` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Paises Bajos','S-M-L','Depay','paises-bajos-camiseta.jpg',1000,'A',NULL,NULL),(2,'Senegal','S-M-L','Mane','senegal-camiseta.jpg',1000,'A',NULL,NULL),(3,'Ecuador','S-M-L','Valencia','ecuador-camiseta.jpg',1000,'A',NULL,NULL),(4,'Qatar','S-M-L','Chequear','qatar-camiseta.jpg',1000,'A',NULL,NULL),(5,'Inglaterra','S-M-L','Kane','inglaterra-camiseta.jpg',1000,'B',NULL,NULL),(6,'Estados Unidos','S-M-L','Chequear','estados-unidos-camiseta.jpg',1000,'B',NULL,NULL),(7,'Iran','S-M-L','Chequear','iran-camiseta.jpg',1000,'B',NULL,NULL),(8,'Gales','S-M-L','Chequear','gales-camiseta.jpg',1000,'B',NULL,NULL),(9,'Argentina','S-M-L','Messi','argentina-camiseta.jpg',1000,'C',NULL,NULL),(10,'Polonia','S-M-L','Lewandoswki','polonia-camiseta.jpg',1000,'C',NULL,NULL),(11,'Mexico','S-M-L','Chequear','mexico-camiseta.jpg',1000,'C',NULL,NULL),(12,'Arabia Saudita','S-M-L','Chequear','arabia-saudita-camiseta.jpg',1000,'C',NULL,NULL),(13,'Francia','S-M-L','Mbappe','francia-camiseta.jpg',1000,'D',NULL,NULL),(14,'Australia','S-M-L','Chequear','austrlia-camiseta.jpg',1000,'D',NULL,NULL),(15,'Tunez','S-M-L','Chequear','tunez-camiseta.jpg',1000,'D',NULL,NULL),(16,'Dinamarca','S-M-L','Chequear','dinamarca-camiseta.jpg',1000,'D',NULL,NULL),(17,'Japon','S-M-L','Chequear','japon-camiseta.jpg',1000,'E',NULL,NULL),(18,'España','S-M-L','Pedri','españa-camiseta.jpg',1000,'E',NULL,NULL),(19,'Alemania','S-M-L','Chequear','alemania-camiseta.jpg',1000,'E',NULL,NULL),(20,'Costa Rica','S-M-L','Navas','costa-rica-camiseta.jpg',1000,'E',NULL,NULL),(21,'Marruecos','S-M-L','Hakimi','marruecos-camiseta.jpg',1000,'F',NULL,NULL),(22,'Croacia','S-M-L','Modric','costa-rica-camiseta.jpg',1000,'F',NULL,NULL),(23,'Belgica','S-M-L','De Bruyne','belgica-camiseta.jpg',1000,'F',NULL,NULL),(24,'Canada','S-M-L','Davis','canada-camiseta.jpg',1000,'F',NULL,NULL),(25,'Brasil','S-M-L','Neymar','brasil-camiseta.jpg',1000,'G',NULL,NULL),(26,'Suiza','S-M-L','Chequear','suiza-camiseta.jpg',1000,'G',NULL,NULL),(27,'Camerun','S-M-L','Chequear','camerun-camiseta.jpg',1000,'G',NULL,NULL),(28,'Serbia','S-M-L','Chequear','serbia-camiseta.jpg',1000,'G',NULL,NULL),(29,'Portugal','S-M-L','Ronaldo','portugal-camiseta.jpg',1000,'H',NULL,NULL),(30,'Corea Del Sur','S-M-L','Chequear','corea-del-sur-camiseta.jpg',1000,'H',NULL,NULL),(31,'Uruguay','S-M-L','Suarez','uruguay-camiseta.jpg',1000,'H',NULL,NULL),(32,'Ghana','S-M-L','Chequear','ghana-camiseta.jpg',1000,'H',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `lastName` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `email` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `password` varchar(100) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `type` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `avatar` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hola','hola','hola@hola.com','$2a$10$oAFeSk//crBNjjrzjbyjzOatbfuM4FxHHia/5QrvR/EFUo0fTh1Xy','User',NULL,NULL,NULL),(2,'ricardo','lopez','ricardo@hotmail.com','$2a$10$dh6dSz4S4o/L53NoFBqJP..b06MMaS8bBdOEnEUKkq3dpTdjqAtBG','Admin',NULL,NULL,NULL),(3,'    rita','      arguello gomez','rita@hotmail.com','$2a$10$OqlrFmYLEDeYE6k3C2VHr.7O6Q2zbL8FEHJb7xEQxaYrgCDS2XU6y','Admin','usuario-1673927307731.jpeg',NULL,'2023-01-17 03:48:27'),(11,' felipe',' arguello','pipe@hotmail.com','$2a$10$TlXWBnOwiGv9/TUbTdCdIeRPDWRFqhYMs1sugYVCWqieLcZFS.Dvm','Usuario','usuario-1673927340325.jpeg','2023-01-14 17:45:57','2023-01-17 03:49:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-16 22:59:33
