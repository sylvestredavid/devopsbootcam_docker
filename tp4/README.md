# TP4 : Gestion du stockage

## Enoncé
- créer un volume de type volumes
- Créer 2 conteneurs ubuntu (ubuntu1 et ubuntu2) et montez le colume créé dans le répertoire /tmp de chacun
- Créer un fichier toto.txt dans le répertoire /tmp de ubuntu1 et vérfier qu'il est bien présent dans /tmp de ubuntu2
- Créer un conteneur apache dont le site affiché est celui présent dans un volume de type bindmount

## Solution proposée volume
### Créer le volume
utiliser docker volume create pour créer un volume de type volume
#### Commande
```shell
docker volume create --name myvolume
```
#### Options
| nom      | raccourci | description   |
|----------|-----------|---------------|
| --name   |           | nom du volume |

### Créer les conteneurs
utiliser docker run pour lancer 2 conteneurs
#### Commande
```shell
docker run -dit --name ubuntu1 -v myvolume:/tmp ubuntu /bin/bash
docker run -dit --name ubuntu2 -v myvolume:/tmp ubuntu /bin/bash
```
#### Options
| nom           | raccourci | description                                                         |
|---------------|-----------|---------------------------------------------------------------------|
| --detach      | -d        | Exécuter le conteneur en arrière-plan et imprimer l'ID du conteneur |
| --interactive | -i        | Gardez STDIN ouvert même s'il n'est pas attaché                     |
| --tty         | -t        | Attribuer un pseudo-terminal                                        |
| --name        |           | attribuer un nom au conteneur                                       |
| --volume      | -v        | lier un volume (nomDuVolume:RepertoireDuConteneur)                  |

### Exécuter des commandes dans les conteneurs
utiliser docker exec pour exécuter une commande dans un conteneur en cours d'exécution
#### Commande
```shell
docker exec -it ubuntu1 /bin/sh
```
#### Options
| nom           | raccourci | description                                     |
|---------------|-----------|-------------------------------------------------|
| --interactive | -i        | Gardez STDIN ouvert même s'il n'est pas attaché |
| --tty         | -t        | Attribuer un pseudo-terminal                    |

#### commandes dans le conteneur
- dans ubuntu1, créer un fichier toto.txt dans /tmp (touch /tmp/toto.txt)
- dans ubuntu2, vérifier que toto.txt est présent (cd /tmp && ls)
- 
## Solution proposée apache
### Cloner le repo git du site

#### Commande
```shell
git clone https://github.com/diranetafen/static-website-example.git
```

### Créer le conteneur
utiliser docker run pour lancer 1 conteneur apache
#### Commande
```shell
docker run -dit --name my-apache-app -p 80:80 -v "$PWD/static-website-example":/usr/local/apache2/htdocs/ httpd:2.4
```
#### Options
| nom           | raccourci | description                                                                                   |
|---------------|-----------|-----------------------------------------------------------------------------------------------|
| --detach      | -d        | Exécuter le conteneur en arrière-plan et imprimer l'ID du conteneur                           |
| --interactive | -i        | Gardez STDIN ouvert même s'il n'est pas attaché                                               |
| --tty         | -t        | Attribuer un pseudo-terminal                                                                  |
| --name        |           | attribuer un nom au conteneur                                                                 |
| --publish     | -p        | Publier le(s) port(s) d'un conteneur sur l'hôte (portDeLaMachineHote:portExposeParLeConteneur |
| --volume      | -v        | lier un volume (repertoireDeLaMachineHote:RepertoireDuConteneur)                              |

Vérifier que le site est bien accessible à l'adresse localhost:80