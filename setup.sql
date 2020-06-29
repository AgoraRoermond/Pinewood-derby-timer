
CREATE TABLE times ( 
  id int(11) NOT NULL AUTO_INCREMENT,
  studentName varchar(45) DEFAULT NULL,
  time varchar(45) DEFAULT NULL,
  attempt varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
);
INSERT INTO times (time,attempt) VALUES (1.54,1),(1.52,1);

CREATE TABLE teacher ( 
  id int(11) NOT NULL AUTO_INCREMENT,
  teacherName varchar(45) DEFAULT null,
  PRIMARY KEY (id)
);

CREATE TABLE teacher_times ( 
  id int(11) NOT NULL AUTO_INCREMENT,
  teacherId int(11) default null,
  time varchar(45) DEFAULT NULL,
  attempt varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
);
