# Luciole Labs

Site Astro servi par Node.js. Les pages sont pré-rendues, puis exposées par l’adaptateur `@astrojs/node` en mode standalone.

L’application se lance avec Docker Compose (serveur de développement Astro avec hot reload), ou en local avec `make dev`. Les deux écoutent le port défini dans `.env` (4321 par défaut).

## Prérequis

- [Docker](https://docs.docker.com/get-docker/) et Docker Compose, pour `make start`
- Node.js 22.12 ou plus récent, pour le développement local
- `make`

## Configuration

Copier le fichier d’exemple, puis ajuster les valeurs si besoin :

```sh
cp .env.example .env
```

| Variable   | Rôle                                      | Défaut        |
| ---------- | ----------------------------------------- | ------------- |
| `HOST`     | Interface d’écoute du serveur             | `0.0.0.0`     |
| `PORT`     | Port publié sur la machine et dans l’app  | `4321`        |
| `NODE_ENV` | Environnement Node                        | `development` |

`make start` et `make dev` créent `.env` automatiquement s’il manque.

## Lancer l’application

Avec Docker, depuis la racine du projet :

```sh
make start
```

Le site est alors disponible sur [http://localhost:4321](http://localhost:4321). Les sources du projet sont montées dans le conteneur : toute modification recharge la page automatiquement.

Pour l’arrêter : `make stop`. Après un changement de dépendances (`package.json`), reconstruire avec `make build` puis `make start`.

| Commande       | Action                                                    |
| -------------- | --------------------------------------------------------- |
| `make`         | Liste les commandes                                       |
| `make start`   | Construit l’image de développement et démarre le conteneur |
| `make stop`    | Arrête et supprime le conteneur                           |
| `make logs`    | Suit les logs                                             |
| `make restart` | Redémarre le conteneur                                    |
| `make build`   | Reconstruit l’image sans la démarrer                      |

## Développement local

Sans Docker :

```sh
make install
make dev
```

Le serveur de développement Astro démarre sur le même port, avec le même hot reload.

Pour un build de production (image Docker `runtime`, ou en local) :

```sh
npm run build
node ./dist/server/entry.mjs
```

## Pages

| URL      | Contenu        |
| -------- | -------------- |
| `/`      | Accueil        |
| `/about` | Page à propos  |
