DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `is_teacher` BOOLEAN NOT NULL,
  `password` CHAR(60) DEFAULT NULL,
  PRIMARY KEY (`email`)
);
INSERT INTO `accounts` (`email`,`name`, `is_teacher`,`password`) VALUES
  ('somn10231@soml.nl','Jetse Verschuren', 1, '$2b$10$hmTwYnIxM.4Ad5jTWYZF9un9iKtaX.aP5IPsb9LC5kLH5FaS7BCaS'), -- Password: Jetse
  ('somn10521@soml.nl','David Maenen', 1, '$2b$10$DGjqV5VkD/q6in8MCOzmIuLh6xCqVzJ8x1GuRw8rkfD29g7oHCVjK'), -- Password: David
  ('somn10227@soml.nl','Martijn le Rutte', 0, '$2b$10$BoezUlcsL5yjcWsGH4/uqeya7LupLKJvXsl7ZvF0kijFu5kczY32G');  -- Password: Martijn


DROP TABLE IF EXISTS `times`;
CREATE TABLE times (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_mail` VARCHAR(45) NOT NULL,
  `time` DECIMAL(5,2) DEFAULT NULL,
  `raceId` VARCHAR(5) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `student_mail` (`student_mail`),
  CONSTRAINT `student_mail` FOREIGN KEY (`student_mail`) REFERENCES `accounts`(`email`)
);
