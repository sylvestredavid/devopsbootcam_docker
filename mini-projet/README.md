# Mini projet: student-list

https://github.com/diranetafen/student-list

## Build and test
### Livrable
[Dockerfile simple_api](simple_api%2FDockerfile)

### Explications

`FROM python:2.7-buster`

L'énoncé demandait d'utiliser l'image `python:2.7-stretch`, 
mais cette image utilise une version de debian qui n'est plus maintenue ce qui causais des erreurs lors de la commande `apt-get update`.
J'ai remédié à ça en utilisant l'image `python:2.7-buster` qui se base sur une version plus récente de debian (10 au lieu de 9)

`LABEL maintainer="david sylvestre (david.sylvestre24@gmail.com)"`

Pour définir le maintainer de l'image, j'ai utilisé `LABEL maintainer` comme spécifié dans la documentation de docker qui spécifie que
`MAINTAINER` est déprécié https://docs.docker.com/engine/reference/builder/#maintainer-deprecated

```
RUN apt-get update -y
RUN apt-get install python-dev python3-dev libsasl2-dev python-dev libldap2-dev libssl-dev -y
RUN pip install flask==1.1.2 flask_httpauth==4.1.0 flask_simpleldap python-dotenv==0.14.0
```
Ces lignes permettent d'installer les dépendances nécessaires au projet

`COPY student_age.py student_age.py`

On récupère le code source du projet

`VOLUME /data`

Permet de créer un volume de type volume dans /data

`EXPOSE 5000`

On indique que le port exposé est le port 5000

`CMD [ "python", "./student_age.py" ]`

Cette ligne indique qu'au lancement du conteneur, la commande python ./student_age.py sera appelée

### Resultat

Après avoir buildé l'image, j'ai lancé un docker et testé avec postman un appel à l'api

![miniprojetdocker1.PNG](images_readme%2Fminiprojetdocker1.PNG)

## Infrastructure As Code
### Livrable
[docker-compose.yml](docker-compose.yml)

### Explications

Le docker-compose va générer 2 conteneurs, un pour le website et un pour l'api

### Services
#### website

- Le conteneur pour le website est basé sur l'image `php:apache`.
- Il dépend du conteneur *api* ce qui signifie qu'il ne sera lancé qu'une fois que ce dernier sera up.
- Il est branché sur le port 80 de la machine hôte
- on a également définit 2 variables d'environement *USERNAME* et *PASSWORD* dont le website a besoin pour appeler l'api
- Un volume de type bind-mount est créé pour synchronisé le dossier website de la machine hôte au dossier /var/www/html du conteneur
- Enfin il est placé dans un network *student-list-network* avec le conteneur api afin que le website puisse communiquer avec l'api

#### api

- L'image utilisée est celle créé avec le dockerfile de simple_api
- Un nom est donné au conteneur afin d'etre sur qu'il ai toujours le même (on en a besoin dans le website)
- Il est branché au port 5000 de la machine hôte
- On utilise le volume /data créé dans le dockerfile en y mettant le dichier student_age.json
- Pour finir on le place dans le même network que le website

### Network
J'ai décidé de créé un network de type bridge et de placer les 2 conteneurs dedans afin de faciliter leurs échanges,
ainsi le website a juste à appeler l'api par le nom du conteneur:5000.

### Résultat
Après avoir lancé la commande `docker compose up -d` les 2 conteneurs etaient up, je suis allé sur l'url du
website et en cliquant sur le bouton les données attenduent sont apparues

![miniprojetdocker2.PNG](images_readme%2Fminiprojetdocker2.PNG)

## Docker Registry

### Création du repository local

J'ai créé un repository local à l'aide de l'image `registry:2`

```shell
docker run -d -p 5001:5000 --name registry registry:2
```

j'ai taggé mon image comme spécifié dans la [documentation](https://docs.docker.com/registry/)

```shell
docker image tag simple_api localhost:5001/simple_api
```

Puis j'ai pushé l'image sur mon repository local

```shell
docker push localhost:5001/simple_api
```

Enfin j'ai utilisé [docker-registry-ui](https://hub.docker.com/r/joxit/docker-registry-ui/) pour avoir une interface pour mon repository

```shell
docker run -d -p 80:80 --env REGISTRY_URL=http://localhost:5001 joxit/docker-registry-ui
```

### Résultat

![miniprojetdocker3.PNG](images_readme%2Fminiprojetdocker3.PNG)
