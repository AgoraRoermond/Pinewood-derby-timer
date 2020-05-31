# Pinewood Derby Server
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
This server relies on a mysql/mariadb server on `localhost:3306` with credentials `root:AgoraRoermond`. A mariadb server can be easily setup using docker:
```bash
docker run --rm -it --name Pinewood-derby-mariadb -e MYSQL_ROOT_PASSWORD=AgoraRoermond -e MYSQL_DATABASE=Derby -p 3306:3306 -v $(pwd)/setup.sql:/docker-entrypoint-initdb.d/setup.sql mariadb
```
It's also possible to start a phpmyadmin server using docker. The following command starts a phpmyadmin server on `localhost:8000` with the same credentials as mariadb
```bash
docker run --rm -it --name Pinewood-derby-phpmyadmin --link Pinewood-derby-mariadb:db -p 8000:80 phpmyadmin/phpmyadmin
```
Mariadb can be stopped  by pressing <kbd>CTRL</kbd>+<kbd>\\</kbd>, to stop phpmyadmin <kbd>CTRL</kbd>+<kbd>C</kbd> will suffice.

To open a interactive SQL shell you can run the following
```bash
docker exec -it Pinewood-derby-mariadb mysql -u root -pAgoraRoermond -D Derby
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
