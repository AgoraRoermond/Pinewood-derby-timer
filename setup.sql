DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `is_teacher` BOOLEAN NOT NULL,
  `password` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`email`)
);
INSERT INTO `accounts` (`email`,`name`, `is_teacher`) VALUES
  ('somn10231@soml.nl','Jetse Verschuren', 1);


DROP TABLE IF EXISTS `times`;
CREATE TABLE times (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_mail` VARCHAR(45) NOT NULL,
  `time` DECIMAL(5,2) DEFAULT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `student_mail` (`student_mail`),
  CONSTRAINT `student_mail` FOREIGN KEY (`student_mail`) REFERENCES `accounts`(`email`)
);
