.DEFAULT_GOAL := help

PORT := $(shell test -f .env && sed -n 's/^PORT=//p' .env | head -1)
ifeq ($(PORT),)
PORT := 4321
endif

.PHONY: help env install start stop restart logs build dev lint links

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

lint: ## Lance ESLint (conteneur si démarré, sinon local)
	@if docker compose ps --status running --services 2>/dev/null | grep -qx web; then \
		docker compose exec -T web npm run lint; \
	elif [ -x node_modules/.bin/eslint ]; then \
		npm run lint; \
	else \
		echo "Installe les dépendances (make install) ou démarre Docker (make start) avant make lint."; \
		exit 1; \
	fi

links: ## Attend le serveur puis affiche les URLs (après make start)
	@echo "Attente de http://localhost:$(PORT)/ …"
	@i=0; \
	until curl -sf "http://localhost:$(PORT)/" >/dev/null 2>&1; do \
		i=$$((i + 1)); \
		if [ $$i -ge 60 ]; then \
			echo "Le serveur ne répond pas sur le port $(PORT)."; \
			exit 1; \
		fi; \
		sleep 1; \
	done
	@echo ""
	@echo "Application :"
	@echo "  http://localhost:$(PORT)/"
	@echo "  http://localhost:$(PORT)/about"
	@echo ""
	@command -v open >/dev/null 2>&1 && open "http://localhost:$(PORT)/" || true
