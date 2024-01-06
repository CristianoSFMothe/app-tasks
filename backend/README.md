# Back-End Task List

## Instalação de dependencias

Para instalar todas as dependências necessárias para este projeto, siga os passos abaixo:

### Pré-requisitos
* <a href="https://nodejs.org/en" target="blank">Node.js</a> versão 20.3.1 ou superior.
* <a href="https://www.npmjs.com/" target="blank">npm </a>(normalmente vem com o Node.js) ou Yarn (opcional).
* <a href="https://code.visualstudio.com/" target="blank">VS Code</a> IDE utilizada para criação do projeto.
* <a href="https://www.docker.com/" target="blank">Docker</a> para pode executar o `docker compose` no qual irá subir o banco de dados.
* <a href="https://dbeaver.io/download/" target="blank">DBeaver Community</a> um aplicativo de software cliente SQL e uma ferramenta de administração de banco de dados ou outro de sua preferência.

```bash
# TypeORM e PostgreSQL
npm install @nestjs/typeorm typeorm pg

# Map Support
npm install source-map-support

# DotEnv
npm install dotenv

# Class Controller e Class Transformer
npm install class-transformer class-validator
```

# Docker

## Subindo o Docker Compose

```bash
docker-compose up -d
```

# Migration

## Criação da Migration

```bash
# Criação da Migration
npx typeorm migration:create src/migrations/CreateTasksTable 

# Rodando a Migration
npx typeorm migration:run -d dist/database/orm-cli.config.js 
```

# Teste

## Executando os teste

```bash
# Teste do Service
npm run test -- tasks.service

# Teste do Controller
npm run test -- tasks.controller

# Teste Coverage
npm run test:cov

```
