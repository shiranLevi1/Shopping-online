-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `cart_products`
--

DROP TABLE IF EXISTS `cart_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_products` (
  `cart_product_id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `amount` bigint NOT NULL,
  `total_price` bigint NOT NULL,
  `cart_id` bigint NOT NULL,
  PRIMARY KEY (`cart_product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3050 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_products`
--

LOCK TABLES `cart_products` WRITE;
/*!40000 ALTER TABLE `cart_products` DISABLE KEYS */;
INSERT INTO `cart_products` VALUES (3000,8,1,4,315),(3001,37,1,6,315),(3002,12,1,10,315),(3003,5,2,150,315),(3004,50,1,100,315),(3005,64,2,40,315),(3006,8,1,4,316),(3007,44,1,5,316),(3008,48,1,5,316),(3009,44,1,5,318),(3010,6,1,30,318),(3011,48,1,5,318),(3012,45,2,80,320),(3013,16,1,12,320),(3014,4,3,48,320),(3015,18,1,12,320),(3016,51,2,44,320),(3017,42,1,9,320),(3018,47,1,15,320),(3019,7,1,10,321),(3020,49,3,15,321),(3021,37,2,12,321),(3022,14,1,20,321),(3023,10,1,6,321),(3024,17,1,20,321),(3025,22,1,4,322),(3026,64,1,20,322),(3027,12,1,10,322),(3028,50,1,100,322),(3029,23,4,24,322),(3030,19,1,11,322),(3031,39,1,6,322),(3032,43,1,3,322),(3033,7,1,10,324),(3034,45,1,40,324),(3035,44,1,5,324),(3036,46,2,24,324),(3037,5,1,75,324),(3038,3,1,30,324),(3039,21,3,12,324),(3040,47,1,15,324),(3041,41,1,8,324),(3042,19,1,11,324),(3043,16,1,12,325),(3044,48,1,5,325),(3045,49,1,5,325),(3046,2,4,20,325),(3047,3,1,30,325),(3048,39,1,6,325),(3049,43,1,3,325);
/*!40000 ALTER TABLE `cart_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=326 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (302,123456789,'2021-10-07 14:06:00'),(303,123456789,'2021-10-07 14:53:00'),(304,123456789,'2021-10-07 14:55:00'),(305,123456789,'2021-10-07 14:56:00'),(306,123456789,'2021-10-07 14:57:00'),(307,123456789,'2021-10-07 14:58:00'),(308,123456789,'2021-10-07 14:58:00'),(309,123456789,'2021-10-07 15:02:00'),(310,123456789,'2021-10-07 15:03:00'),(311,2345678,'2021-10-07 16:46:00'),(312,123456789,'2021-10-07 17:25:00'),(313,123456789,'2021-10-07 17:26:00'),(314,123456789,'2021-10-07 18:06:00'),(315,123456781,'2021-10-07 21:58:00'),(316,123456781,'2021-10-07 22:10:00'),(317,123456781,'2021-10-07 22:11:00'),(318,123456781,'2021-10-07 22:21:00'),(319,123456781,'2021-10-07 22:22:00'),(320,98765432,'2021-10-07 22:24:00'),(321,98765432,'2021-10-07 22:26:00'),(322,98765432,'2021-10-07 22:27:00'),(323,98765432,'2021-10-07 22:28:00'),(324,123456321,'2021-10-07 22:30:00'),(325,123456321,'2021-10-07 22:31:00');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Snackes & Sweets'),(2,'Dairy'),(3,'Bread & Bakery'),(4,'Baby'),(5,'Meat'),(6,'Drinks'),(7,'Fruit & Vegetables');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `cart_id` bigint NOT NULL,
  `total_price` bigint NOT NULL,
  `city` varchar(450) NOT NULL,
  `address` varchar(450) NOT NULL,
  `shipping_date` date NOT NULL,
  `order_date` datetime NOT NULL,
  `last_4_digits_payment` varchar(45) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (95,123456781,315,310,'Holon','Hadar 30','2021-10-07','2021-10-07 22:10:00','3456'),(96,123456781,316,28,'Holon','Hadar 30','2021-10-07','2021-10-07 22:21:00','3456'),(97,123456781,318,40,'Holon','Hadar 30','2021-10-20','2021-10-07 22:22:00','3456'),(98,98765432,320,220,'Hertzeliya','Havatzelet Hasharon','2021-10-20','2021-10-07 22:26:00','3456'),(99,98765432,321,83,'Hertzeliya','Havatzelet Hasharon','2021-10-20','2021-10-07 22:27:00','3456'),(100,98765432,322,178,'Hertzeliya','Havatzelet Hasharon','2021-10-18','2021-10-07 22:28:00','3456'),(101,123456321,324,230,'Natanya','Poleg','2021-10-29','2021-10-07 22:31:00','4321');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `price` bigint NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Yogurt',2,5,'5b884c82-f9a0-4e5f-ab64-587d5f48b1cf.png','150 gr'),(3,'Diapers',4,30,'7b96443e-4772-4ba3-9155-c9ba3708e5b5.png','50 pcs'),(4,'Baby Food',4,16,'3e4f5dab-8929-4453-910e-deef98f405e1.png','150 gr'),(5,'Baby Formula',4,75,'bb455ea9-47ab-4970-bc12-6bef5da4f209.png','700 gr'),(6,'Yellow Cheese',2,30,'84a87029-4fcc-439e-ae2a-8de02e58c82d.png','28% fat'),(7,'Pringles',1,10,'d9bb80bf-99d1-49cd-bcaf-6a48ebf44a62.png','149 gr'),(8,'Popcorn',1,4,'5f27f22f-6cff-4879-bca6-c3a801c313fe.png','60 gr'),(9,'Bamba',1,4,'79539669-4ea9-45e2-8964-f4b672760813.png','60 gr'),(10,'Sliced White Bread',3,6,'1088c2fd-6abf-4202-8aa8-03262e2a67e8.png','750 gr'),(11,'Bagles',3,10,'b51cb298-ac73-478e-9bcc-ac19b9a3b05d.png','3 pcs'),(12,'Muffin',3,10,'4ee626bd-81e5-4eed-a94d-fba65d2b68b7.png','5 pcs'),(14,'Sausage',5,20,'89015abd-9af8-48d3-bb13-4b43b56fe892.png','280 gr'),(15,'Chicken',5,27,'c6a71250-2e8b-493a-a095-c19dc7c981cc.png','1 pcs'),(16,'Chocolate Drink',2,12,'1b64d814-79dc-41b0-905b-abae3ba704cb.png','1 liter'),(17,'Yeast Cake',3,20,'d18cf519-4e2f-4eb6-8d04-3e571db9bb8b.png','chocolate'),(18,'Chicken Wings',5,12,'4b40f128-7136-4433-aef3-67f93cad243d.png','1 pcs'),(19,'Watter',6,11,'3dd551bf-e35b-47b2-bfab-1682463cdad4.png','6 pcs'),(20,'Wine',6,50,'c84e40f4-816a-467a-ac77-979a97c563aa.png','750 mg'),(21,'Soda',6,4,'4ea858e8-32ee-4b28-a7b0-4d142191d923.png','1.5 liter'),(22,'Chips',1,4,'05015b01-f075-4f65-9772-5666abe8412e.png','142 gr'),(23,'Coca Cola',6,6,'88cb3d19-b807-419a-b496-be7bed093bab.png','1.5 liter'),(37,'Milk',2,6,'c1fd8627-b0fd-4579-9f80-ee39a38e8e4a.png','1 liter'),(38,'Apple',7,17,'a13c20dd-3e8b-4b7a-99a0-9c44c89de70e.png','1 kg'),(39,'Cucumber',7,6,'d84fa787-9928-4c3f-bf1b-ca6bb6a62f2b.png','1 kg'),(41,'Banana',7,8,'da039528-3ba5-41db-87e8-0dd110cfd526.png','1 kg'),(42,'Eggplant',7,9,'901c6ed0-c142-4725-8983-ea872ed8b2e2.png','1 kg'),(43,'Tomato',7,3,'cc850ed4-18b0-4df6-abd8-3dabf4df9558.png','1 kg'),(44,'Milk Chocolate',1,5,'dbdb8ce9-9ee7-44e5-b5f1-1c3d2fa03ab0.png','100 gr'),(45,'Ferrero Rocher',1,40,'51b17458-28c4-4b71-99bd-adbb5dda81fd.png','212 gr'),(46,'Whole Wheat Bread',3,12,'4b7483ae-1166-45fa-91af-223ed1660f6b.png','750 gr'),(47,'Peach',7,15,'6a606023-9d9f-436d-a69c-285bd9ae2afc.png','1 kg'),(48,'Cottage Cheese',2,5,'cb831c74-47ae-4098-a596-063c6d7b62bf.png','250 gr'),(49,'Sour Creem',2,5,'2276e585-b3bf-4f40-9067-f6fc2f73fa0b.png','250 gr'),(50,'Beef',5,100,'ac6dc27f-8276-4b4e-9e27-f94b24b4ad4b.png','1 kg'),(51,'pacifiers',4,22,'f12ce3f2-0026-4aab-8d2d-71eb62879f54.png','5 pcs'),(64,'Baby Wipes',4,20,'a6cce6d4-191e-4a07-9d50-640be631558d.png','5 Pcs');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL DEFAULT 'CUSTOMER',
  `is_new` varchar(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2345678,'‫שירן','לוי‬‎','sss','499c766e0b278f4401d444b49ad56605','Jerusalem','Riiiiii','ADMIN','0'),(98765432,'Maayan','Levi','other@gmail.come','d7130bea9e7b7253b0527862d94280ee','Hertzeliya','Havatzelet Hasharon','CUSTOMER','0'),(123456321,'Mor','Levi','one@gmail.com','d7130bea9e7b7253b0527862d94280ee','Natanya','Poleg','CUSTOMER','0'),(123456781,'Shiran','Levi','some@gmail.com','d7130bea9e7b7253b0527862d94280ee','Holon','Hadar 30','CUSTOMER','0'),(123456789,'‫שירן','לוי‬‎','shiran@gmail.com','4b402ef3ece946b114842a5f28e18973','Hertzeliya','עמק דותן 18','CUSTOMER','0');
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

-- Dump completed on 2021-10-07 22:52:31
