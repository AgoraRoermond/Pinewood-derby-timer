# Pinewood Derpy Server
The server for the pinewood derby project
## How to install
### Install node packages
To install node packages run
```bash
yarn install
```
or
```bash
npm install
```
### Setup database
This server relies on a mysql/mariadb server on `localhost:3306` with credentials `root:AgoraRoermond`. To setup the basic table for the example execute
```sql
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `class` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `students` VALUES (3,'Jetse','VWO5'),(4,'Martijn','VWO5'),(5,'Timo','VWO3'), (6, 'David','HAVO4'), (7, 'Mees','HAVO4');
##Setup table sql database
CREATE TABLE 'times'(
 Derby.times CHANGE id id int(11) NOT NULL;
 Derby.times CHANGE time time varchar(45);
 Derby.times CHANGE attempt attempt varchar(45);

```
A mariadb server can be easily setup using docker:
```bash
docker run --name Pinewood-derby-mariadb -e MYSQL_ROOT_PASSWORD=AgoraRoermond -e MYSQL_DATABASE=Derby -p 3306:3306 mariadb
```
It's also possible to start a phpmyadmin server using docker. The following command starts a phpmyadmin server on `localhost:8000` with the same credentials as mariadb
```bash
docker run --name Pinewood-derpy-phpmyadmin -d --link Pinewood-derpy-mariadb:db -p 8000:80 phpmyadmin/phpmyadmin
```


## How to run
### Development server
The advantage of the development server is live reloading. Live reloading automatically restarts the server when a source file is changed. To start a development server run
```bash
yarn start
```
or
```bash
npm run start
```
### Server without database
In case you're not feeling like setting up a database. Note that any anything using the database will (obviously) not work.
```bash
yarn start no-database
```
or
```bash
npm run no-database
```
### Production Server
To start a server for production run
```bash
yarn prod
```
or
```bash
npm run prod
```
