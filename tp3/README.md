# TP3 : Gestion des réseaux

## Enoncé
- créer un réseau de type bridge
- lancer 2 conteneurs ubuntu (ubuntu1 et ubuntu2) sur ce réseau
- entrer dans chacun des conteneurs, installer ping et pinger l'autre conteneur

## Solution proposée
### Créer le réseau bridge
utiliser docker network create pour créer un nouveau réseau
de type bridge nommé "my_network"
#### Commande
```shell
docker network create -d bridge --subnet=192.168.2.0/24 my_network
```
#### Options
| nom      | raccourci | description                                                    |
|----------|-----------|----------------------------------------------------------------|
| --driver | -d        | Pilote pour gérer le réseau (bridge, host etc...)              |
| --subnet |           | Sous-réseau au format CIDR qui représente un segment de réseau |

### Créer les conteneurs
utiliser docker run pour lancer 2 conteneurs
#### Commande
```shell
docker run -dt --network my_network --name ubuntu1 ubuntu /bin/bash
docker run -dt --network my_network --name ubuntu2 ubuntu /bin/bash
```
#### Options
| nom       | raccourci | description                                                         |
|-----------|-----------|---------------------------------------------------------------------|
| --detach  | -d        | Exécuter le conteneur en arrière-plan et imprimer l'ID du conteneur |
| --tty     | -t        | Attribuer un pseudo-terminal                                        |
| --network |           | Connecter un conteneur à un réseau spécifique                       |
| --name    |           | attribuer un nom au conteneur                                       |

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
##### installer ping
```shell
apt-get update
apt-get install iputils-ping
```
##### Pinger le second conteneur
```shell
ping ubuntu2
```
Si tout se passe bien le prompt devrais afficher des ligne telles que celles ci:
```
64 bytes from ubuntu2.my_network (172.18.0.2): icmp_seq=1 ttl=64 time=0.035 ms
```

**Faire de même pour le conteneur ubuntu2 (ping ubuntu1)**