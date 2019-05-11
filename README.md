![header](.osweekends/img/OSW-project-GitHub-template-header.jpg)


![travis](https://img.shields.io/travis/OSWeekends/batimagen.svg)
![issues abiertos](https://img.shields.io/github/issues/OSWeekends/batimagen.svg)
![issues promedio](https://img.shields.io/issuestats/i/github/OSWeekends/batimagen.svg)
![PR Abiertos](https://img.shields.io/github/issues-pr/OSWeekends/batimagen.svg)
![PR Promedio](https://img.shields.io/issuestats/p/github/OSWeekends/batimagen.svg)
![último commit](https://img.shields.io/github/last-commit/OSWeekends/batimagen/{{RAMA}}.svg)
![TOP Lang](https://img.shields.io/github/languages/top/OSWeekends/batimagen.svg)
![total lang](https://img.shields.io/github/languages/count/OSWeekends/batimagen.svg)

# Batimagen

> Analizador de ficheros utilizando metadatos y APIs de terceros. Incluye un [honeypot](https://es.wikipedia.org/wiki/Honeypot) (Opcional)

![Poster de Batimagen](other/img/logo.png)

El proyecto utiliza la librería [ExifTool de Phil Harvey](https://www.sno.phy.queensu.ca/~phil/exiftool/) para extraer la información de los [metadatos del fichero](https://es.wikipedia.org/wiki/Metadatos).

También se realiza un analisis en busca de virus utilizando [virustotal](https://www.virustotal.com/es/). En el caso de las imagenes el fichero en enviado a [Google vision API](https://cloud.google.com/vision/?hl=es) para detectar diversos parámetros como imagenes similares, textos, detección de caras, etc...

Utilizamos Node.js y Pug para hacer un aplicación web de tipo server render.

- [Ficheros soportados](https://www.sno.phy.queensu.ca/~phil/exiftool/#supported)

**Motivación**

Creamos esta herramienta para mostrar al mundo la importancia de los metadatos y la privacidad. Nuestro objetivo final es concienciar y enseñar un buen uso de la tecnologia para la ciudadania en general.

### Equipo

 - [Ulises Gascón (@UlisesGascon)](https://github.com/ulisesGascon) (Leader Backend)
 - [Elena Mateos (@ElenaMLopez)](https://github.com/ElenaMLopez) (Leader Frontend)


##### Agradecimientos

 - [Carlos Crisóstomo (@kr0n0)](https://github.com/kr0n0) (Security researcher)
 - [Cybersecurity Guild](https://guilds.osweekends.com) (Communtiy Support)
 - [Open Source Weekends](https://osweekends.com) (Guilds Support)

##### Necesitamos

Necesitamos ayuda, ¡únete!

 - Traductor: ¿Nos ayudas a crear este portal en ingles?
 - Documentación: ¿Nos ayudas a explicar mejor que son los metadatos al mundo?

### Demo

El proyecto esta disponible para su descarga y ejecución en local.


### Tecnología utilizada

#### Dependencias
- **express**: Gestión del servidor HTTP
- **express-fileupload**: Gestión de ficheros desde el cliente por peticiones POST
- **node-exiftool**: Wrapper de exiftool para Nodejs
- **pug**: Motor de plantillas del backend
 

### Cómo contribuir en el proyecto

**Más informacion en [CONTRIBUTING.md](CONTRIBUTING.md)**

## ¿Cómo usarlo?.

### Sin usar Docker

#### TL:DR;

Solo necesitas tener Node y descargarte [exiftool](https://www.sno.phy.queensu.ca/~phil/exiftool/install.html)

#### Instalación

**Prepara el entorno**
- [Instalar Nodejs](https://nodejs.org/es/download/)
- [Instalar exiftool](https://www.sno.phy.queensu.ca/~phil/exiftool/install.html)

**Descarga el proyecto**

`git clone https://github.com/OSWeekends/batimagen.git`

**Lanzar el proyecto en local**

Si se sigue este procedimiento es necesario insertar los tokens de la API de Google en node.env, así como el de virusTotal. Seguir las instrucciones del package.json donde se ve que el comando es start:

```bash
npm run start
```

### Utilizando docker

**Descargar la imagen de Docker**

Has de tener docker instalado en el ordenador.

Descarga la imagen de Batimagen de DockerHub desde [aquí](https://hub.docker.com/r/osweekends/batimagen) con el siguiente comando:
```bash
docker pull osweekends/batimagen
```

**Lanza el proyecto en local**

Una vez hecho esto, puedes hacer funcionar el docker con este comando, en este caso, no se utilizan ni la API de google ni el token de virus total, así que esos resultados no van a verse en el análisis:

```bash
docker run -p 3000:3000 batimagen
```

**Lanzar el proyecto con todo (thirdparty)**

Guarda el fichero de tokens de Google Cloud en `secrets/SECRET_gcloud.json`

```bash
$ docker run \
     -p 3000:3000 \ # Bindeo de puertos
     -v  "$(pwd)/temp/":/app/temp/ \ # Extraer los analisis del repo
     -v  "$(pwd)/secrets/":/app/secrets/ \ # Compartición de fichero de credenciales
     -e TP_ENABLED=true  \      # habilitar terceras partes
     -e TP_VIRUSTOTAL=true \    # habilitar virus total
     -e TP_GVISION=true \       # habilitar Google Vision
     -e VIRUSTOTAL='----YOUR TOKEN ----' # Añadir to token de virus total
     -e GOOGLE_APPLICATION_CREDENTIALS='./secrets/SECRET_gcloud.json' # vicular la ruta de los tokens de Google Cloud
      osweekends/batimagen # Imagen de docker
```


### Estado del proyecto.

Ahora mismo estamos en desarrollo activo del primer MVP (Sprint 1 y 0 en paralelo)

### Exención de responsabilidad

Este proyecto tiene la intención de sensibilizar al usuario sobre la ciberseguridad, la prevención y la detección del uso no autorizado de los sistemas informáticos.

El usuario al aplicar estos conocimientos deberá tener en cuenta que hay que respetar las normas que regulan la seguridad informática, evitando la comisión de actos que no se ajusten a la legalidad vigente, siendo su responsabilidad el mal uso que haga de este proyecto.

Los desarrolladores del proyecto no se hace responsables del uso negligente o ilícito que puedan hacer los usuarios con los conocimientos que se ponen de manifiesto en este proyecto.

### Licencia

GPL-3.0


![footer](.osweekends/img/OSW-project-GitHub-template-footer.jpg)
