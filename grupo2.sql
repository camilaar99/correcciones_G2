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
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Paises Bajos','Small','Depay','paises-bajos-camiseta.jpg',1000,'A',NULL,NULL),(2,'Senegal','Small','Mane','senegal-camiseta.jpg',1000,'A',NULL,NULL),(3,'Ecuador','Small','Valencia','ecuador-camiseta.jpg',1000,'A',NULL,NULL),(4,'Qatar','Small','Chequear','qatar-camiseta.jpg',1000,'A',NULL,NULL),(5,'Inglaterra','Small','Kane','inglaterra-camiseta.jpg',1000,'B',NULL,NULL),(6,'Estados Unidos','Small','Chequear','estados-unidos-camiseta.jpg',1000,'B',NULL,NULL),(7,'Iran','Small','Chequear','iran-camiseta.jpg',1000,'B',NULL,NULL),(8,'Gales','Small','Chequear','gales-camiseta.jpg',1000,'B',NULL,NULL),(9,'Argentina','Small','Messi','argentina-camiseta.jpg',1000,'C',NULL,NULL),(10,'Polonia','Small','Lewandoswki','polonia-camiseta.jpg',1000,'C',NULL,NULL),(11,'Mexico','Small','Chequear','mexico-camiseta.jpg',1000,'C',NULL,NULL),(12,'Arabia Saudita','Small','Chequear','arabia-saudita-camiseta.jpg',1000,'C',NULL,NULL),(13,'Francia','Small','Mbappe','francia-camiseta.jpg',1000,'D',NULL,NULL),(14,'Australia','Small','Chequear','australia-camiseta.jpg',1000,'D',NULL,NULL),(15,'Tunez','Small','Chequear','tunez-camiseta.jpg',1000,'D',NULL,NULL),(16,'Dinamarca','Small','Chequear','dinamarca-camiseta.jpg',1000,'D',NULL,NULL),(17,'Japon','Small','Chequear','japon-camiseta.jpg',1000,'E',NULL,NULL),(18,'España','Small','Pedri','espana-camiseta.jpg',1000,'E',NULL,NULL),(19,'Alemania','Small','Chequear','alemania-camiseta.jpg',1000,'E',NULL,NULL),(20,'Costa Rica','Small','Navas','costa-rica-camiseta.jpg',1000,'E',NULL,NULL),(21,'Marruecos','Small','Hakimi','marruecos-camiseta.jpg',1000,'F',NULL,NULL),(22,'Croacia','Small','Modric','costa-rica-camiseta.jpg',1000,'F',NULL,NULL),(23,'Belgica','Small','De Bruyne','belgica-camiseta.jpg',1000,'F',NULL,NULL),(24,'Canada','Small','Davis','canada-camiseta.jpg',1000,'F',NULL,NULL),(25,'Brasil','Small','Neymar','brasil-camiseta.jpg',1000,'G',NULL,NULL),(26,'Suiza','Small','Chequear','suiza-camiseta.jpg',1000,'G',NULL,NULL),(27,'Camerun','Small','Chequear','camerun-camiseta.jpg',1000,'G',NULL,NULL),(28,'Serbia','Small','Chequear','serbia-camiseta.jpg',1000,'G',NULL,NULL),(29,'Portugal','Small','Ronaldo','portugal-camiseta.jpg',1000,'H',NULL,NULL),(30,'Corea Del Sur','Small','Chequear','corea-del-sur-camiseta.jpg',1000,'H',NULL,NULL),(31,'Uruguay','Small','Suarez','uruguay-camiseta.jpg',1000,'H',NULL,NULL),(32,'Ghana','Small','Chequear','ghana-camiseta.jpg',1000,'H',NULL,NULL),(39,'Malta y san marino','Medium','Principe Aslan','producto-1675605875237.jpg',5899200,'G','2023-02-05 14:04:35','2023-02-05 14:04:35'),(40,'Paises Bajos','Medium','Depay','paises-bajos-camiseta.jpg',1000,'A',NULL,NULL),(41,'Senegal','Medium','Mane','senegal-camiseta.jpg',1000,'A',NULL,NULL),(42,'Ecuador','Medium','Valencia','ecuador-camiseta.jpg',1000,'A',NULL,NULL),(43,'Qatar','Medium','Chequear','qatar-camiseta.jpg',1000,'A',NULL,NULL),(44,'Inglaterra','Medium','Kane','inglaterra-camiseta.jpg',1000,'B',NULL,NULL),(45,'Estados Unidos','Medium','Chequear','estados-unidos-camiseta.jpg',1000,'B',NULL,NULL),(46,'Iran','Medium','Chequear','iran-camiseta.jpg',1000,'B',NULL,NULL),(47,'Gales','Medium','Chequear','gales-camiseta.jpg',1000,'B',NULL,NULL),(48,'Argentina','Medium','Messi','argentina-camiseta.jpg',1000,'C',NULL,NULL),(49,'Polonia','Medium','Lewandoswki','polonia-camiseta.jpg',1000,'C',NULL,NULL),(50,'Mexico','Medium','Chequear','mexico-camiseta.jpg',1000,'C',NULL,NULL),(51,'Arabia Saudita','Medium','Chequear','arabia-saudita-camiseta.jpg',1000,'C',NULL,NULL),(52,'Francia','Medium','Mbappe','francia-camiseta.jpg',1000,'D',NULL,NULL),(53,'Australia','Medium','Chequear','austrlia-camiseta.jpg',1000,'D',NULL,NULL),(54,'Tunez','Medium','Chequear','tunez-camiseta.jpg',1000,'D',NULL,NULL),(55,'Dinamarca','Medium','Chequear','dinamarca-camiseta.jpg',1000,'D',NULL,NULL),(56,'Japon','Medium','Chequear','japon-camiseta.jpg',1000,'E',NULL,NULL),(57,'España','Medium','Pedri','españa-camiseta.jpg',1000,'E',NULL,NULL),(58,'Alemania','Medium','Chequear','alemania-camiseta.jpg',1000,'E',NULL,NULL),(59,'Costa Rica','Medium','Navas','costa-rica-camiseta.jpg',1000,'E',NULL,NULL),(60,'Marruecos','Medium','Hakimi','marruecos-camiseta.jpg',1000,'F',NULL,NULL),(61,'Croacia','Medium','Modric','costa-rica-camiseta.jpg',1000,'F',NULL,NULL),(62,'Belgica','Medium','De Bruyne','belgica-camiseta.jpg',1000,'F',NULL,NULL),(63,'Canada','Medium','Davis','canada-camiseta.jpg',1000,'F',NULL,NULL),(64,'Brasil','Medium','Neymar','brasil-camiseta.jpg',1000,'G',NULL,NULL),(65,'Suiza','Medium','Chequear','suiza-camiseta.jpg',1000,'G',NULL,NULL),(66,'Camerun','Medium','Chequear','camerun-camiseta.jpg',1000,'G',NULL,NULL),(67,'Serbia','Medium','Chequear','serbia-camiseta.jpg',1000,'G',NULL,NULL),(68,'Portugal','Medium','Ronaldo','portugal-camiseta.jpg',1000,'H',NULL,NULL),(69,'Corea Del Sur','Medium','Chequear','corea-del-sur-camiseta.jpg',1000,'H',NULL,NULL),(70,'Uruguay','Medium','Suarez','uruguay-camiseta.jpg',1000,'H',NULL,NULL),(71,'Ghana','Medium','Chequear','ghana-camiseta.jpg',1000,'H',NULL,NULL),(72,'Paises Bajos','Large','Depay','paises-bajos-camiseta.jpg',1000,'A',NULL,NULL),(73,'Senegal','Large','Mane','senegal-camiseta.jpg',1000,'A',NULL,NULL),(74,'Ecuador','Large','Valencia','ecuador-camiseta.jpg',1000,'A',NULL,NULL),(75,'Qatar','Large','Chequear','qatar-camiseta.jpg',1000,'A',NULL,NULL),(76,'Inglaterra','Large','Kane','inglaterra-camiseta.jpg',1000,'B',NULL,NULL),(77,'Estados Unidos','Large','Chequear','estados-unidos-camiseta.jpg',1000,'B',NULL,NULL),(78,'Iran','Large','Chequear','iran-camiseta.jpg',1000,'B',NULL,NULL),(79,'Gales','Large','Chequear','gales-camiseta.jpg',1000,'B',NULL,NULL),(80,'Argentina','Large','Messi','argentina-camiseta.jpg',1000,'C',NULL,NULL),(81,'Polonia','Large','Lewandoswki','polonia-camiseta.jpg',1000,'C',NULL,NULL),(82,'Mexico','Large','Chequear','mexico-camiseta.jpg',1000,'C',NULL,NULL),(83,'Arabia Saudita','Large','Chequear','arabia-saudita-camiseta.jpg',1000,'C',NULL,NULL),(84,'Francia','Large','Mbappe','francia-camiseta.jpg',1000,'D',NULL,NULL),(85,'Australia','Large','Chequear','austrlia-camiseta.jpg',1000,'D',NULL,NULL),(86,'Tunez','Large','Chequear','tunez-camiseta.jpg',1000,'D',NULL,NULL),(87,'Dinamarca','Large','Chequear','dinamarca-camiseta.jpg',1000,'D',NULL,NULL),(88,'Japon','Large','Chequear','japon-camiseta.jpg',1000,'E',NULL,NULL),(89,'España','Large','Pedri','españa-camiseta.jpg',1000,'E',NULL,NULL),(90,'Alemania','Large','Chequear','alemania-camiseta.jpg',1000,'E',NULL,NULL),(91,'Costa Rica','Large','Navas','costa-rica-camiseta.jpg',1000,'E',NULL,NULL),(92,'Marruecos','Large','Hakimi','marruecos-camiseta.jpg',1000,'F',NULL,NULL),(93,'Croacia','Large','Modric','costa-rica-camiseta.jpg',1000,'F',NULL,NULL),(94,'Belgica','Large','De Bruyne','belgica-camiseta.jpg',1000,'F',NULL,NULL),(95,'Canada','Large','Davis','canada-camiseta.jpg',1000,'F',NULL,NULL),(96,'Brasil','Large','Neymar','brasil-camiseta.jpg',1000,'G',NULL,NULL),(97,'Suiza','Large','Chequear','suiza-camiseta.jpg',1000,'G',NULL,NULL),(98,'Camerun','Large','Chequear','camerun-camiseta.jpg',1000,'G',NULL,NULL),(99,'Serbia','Large','Chequear','serbia-camiseta.jpg',1000,'G',NULL,NULL),(100,'Portugal','Large','Ronaldo','portugal-camiseta.jpg',1000,'H',NULL,NULL),(101,'Corea Del Sur','Large','Chequear','corea-del-sur-camiseta.jpg',1000,'H',NULL,NULL),(102,'Uruguay','Large','Suarez','uruguay-camiseta.jpg',1000,'H',NULL,NULL),(103,'Ghana','Large','Chequear','ghana-camiseta.jpg',1000,'H',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
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

-- Dump completed on 2023-02-05 11:23:03
