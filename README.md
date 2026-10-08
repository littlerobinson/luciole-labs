# Luciole Labs

Site Astro servi par Node.js. Les pages sont pré-rendues, puis exposées par l’adaptateur `@astrojs/node` en mode standalone.

L’application se lance avec Docker Compose, ou en local avec le serveur de développement Astro. Les deux écoutent le port défini dans `.env` (4321 par défaut).

## Prérequis

- [Docker](https://docs.docker.com/get-docker/) et Docker Compose, pour `make up`
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

`make up` et `make dev` créent `.env` automatiquement s’il manque.

## Lancer l’application

Avec Docker, depuis la racine du projet :

```sh
make up
```

Le site est alors disponible sur [http://localhost:4321](http://localhost:4321).

| Commande       | Action                                      |
| -------------- | ------------------------------------------- |
| `make`         | Liste les commandes                         |
| `make up`      | Construit l’image et démarre le conteneur   |
| `make logs`    | Suit les logs                               |
| `make restart` | Redémarre le conteneur                      |
| `make down`    | Arrête et supprime le conteneur             |
| `make build`   | Reconstruit l’image sans la démarrer        |

## Développement local

Sans Docker :

```sh
make install
make dev
```

Le serveur de développement Astro démarre sur le même port. `make dev` recharge les pages à chaque modification des sources.

Pour produire le build servi par le conteneur en dehors de Docker :

```sh
npm run build
node ./dist/server/entry.mjs
```

## Pages

| URL      | Contenu        |
| -------- | -------------- |
| `/`      | Accueil        |
| `/about` | Page à propos  |
