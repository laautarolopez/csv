# Ejercicio de oportunidad laboral

Ejercicio realizado con Node.js y express. DB en memoria(volátil): Postgres(pg-mem).

## ¿Cómo descargar?

Hay dos formas muy simples: 

* Dirigirse a Code >> dentro de la solapa Local >> Download ZIP

![download-zip](https://user-images.githubusercontent.com/63264718/206304803-37f65141-a0e1-434f-950f-38b7bdacc756.png)

* Dirigirse al último **release** >> dentro de Assets >> Source code(zip)

![release](https://user-images.githubusercontent.com/63264718/206306349-9d3ed7e8-60b4-43b4-95a5-1705b93d391c.png)
![assets](https://user-images.githubusercontent.com/63264718/206306074-9e538981-5d4a-4060-96c0-a7e967ff688e.png)

## ¿Cómo instalar?

**`Es necesario tener descargado node.js.` [Página oficial de Node.js](https://nodejs.org/es/)**

* Descomprimir el archivo .zip descargado previamente
* Dirigirse a la carpeta del archivo(ya descomprimido)
* Abrir una terminal dentro del directorio
* Poner el comando **`npm install`** en la consola y esperar que se descarguen las dependencias
* ¡Listo! El proyecto ya está instalado localmente

## ¿Cómo ejecutar localmente?

**`Es necesario tener descargado node.js.` [Página oficial de Node.js](https://nodejs.org/es/)**

* Dirigirse a la carpeta del archivo
* Abrir una terminal dentro del directorio
* Poner el comando **`npm start`** en la consola y esperar
* ¡Listo! El proyecto ya está corriendo localmente en [http://localhost:3000/](http://localhost:3000/)

## Para ver la documentación de los endpoint(swagger)

* Dirigirse a [http://localhost:4000/api/docs](http://localhost:4000/api/docs)
>Se pueden ver los detalles de cada endpoint con sus respectivos parámetros en caso de tenerlos, y los errores.

>Los errores se pueden ver mejor del lado del código.

## Para cargar archivos

* Dentro del proyecto hay una carpeta llamada `examples`.
* Hay dos archivos: **`example1.csv`** y **`example2.csv`**, si quiere se pueden utilizar para cargar los datos.
>Existen todos distintos usuarios(distintos id), excepto el id 4 que se repite, es para probar que se actualizan los datos.
