.DEFAULT_GOAL := help

.PHONY: help env install start stop restart logs build dev

help: ## Affiche les commandes disponibles
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

env: ## Crée .env à partir de .env.example s'il n'existe pas
	@test -f .env || cp .env.example .env

install: ## Installe les dépendances npm
	npm install

start: env ## Construit l'image et démarre l'application (hot reload)
	docker compose up --build -d

stop: ## Arrête et supprime les conteneurs
	docker compose down

restart: ## Redémarre les conteneurs
	docker compose restart

logs: ## Affiche les logs du conteneur
	docker compose logs -f

build: ## Construit l'image Docker
	docker compose build

dev: env ## Démarre le serveur de développement local
	npm run dev
