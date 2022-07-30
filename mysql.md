# Crear un servidor de MySQL usando Docker

### Descargar la imagen de MySQL

```
docker pull mysql:8
```

### Para listar imágenes

```
docker images
docker images | grep mysql
```

### Crear un contenedor

```
docker create --name mysqlserver mysql:8
```

### Para listar los contenedores

```
docker ps
docker ps -a
docker ps -a | grep mysqlserver
```

### Para iniciar el contenedor

```
docker start <nombre del contenedor | identificador>
```

### Para ver dentro de un contenedor

```
docker logs <nombre del contenedor | identificador>
```

### Para eliminar un contenedor que se está ejecutando

```
docker rm -f <nombre del contenedor | identificador>
```

### Alternativa

```
docker stop <nombre del contenedor | identificador>
docker rm <nombre del contenedor | identificador>
```

### Para crear un contenedor y descargar previamente su imagen

```
docker run <nombre del imagen>:<version>
docker run -d <nombre del imagen>:<version>
```

### Para crear variables de entorno

```
docker run -d -e <nombre de la variable> = <su valor> <nombre de la imagen>:<version>
```

### Para crear un contenedor usando variables de entorno

```
docker run -d -p 3310:3306 --name mysqlserver -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_USER=user -e MYSQL_PASSWORD=12345 -e MYSQL_DATABASE=curso10 mysql:8
```
