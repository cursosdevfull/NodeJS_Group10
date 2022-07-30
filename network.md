# Redes

### Crear una red tipo bridge

```
docker network create net-nodejs -d bridge
```

### Para crear un contenedor con una red específica

```
docker run -d --name server03 --network net-nodejs nginx:alpine
```

### Para vincular contenedores existentes a una red

```
docker network connect net-nodejs server01
```

### Inspeccionar la red

```
docker network inspect net-nodejs
```

### Para desvincular contenedores de una red específica

```
docker network disconnect net-nodejs server01
```
