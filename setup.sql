DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `class` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `students` (`name`,`class`) VALUES ('Jetse','VWO5'),('Martijn','VWO5'),('Timo','VWO3'), ('David','HAVO4'), ('Mees','HAVO4');

DROP TABLE IF EXISTS `times`;
CREATE TABLE `times` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` varchar(45) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `attempt` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `times` (`time`,`attempt`) VALUES ('1.54','1'),('1.52','1');
