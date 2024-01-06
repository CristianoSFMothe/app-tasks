# Back-End Task List

Este repositório contém o código-fonte do back-end para uma lista de tarefas. Abaixo, você encontrará instruções detalhadas sobre como instalar as dependências necessárias e executar o projeto.

## Instalação de dependencias

Para instalar todas as dependências necessárias para este projeto, siga os passos abaixo:

### Pré-requisitos
* <a href="https://nodejs.org/en" target="blank">Node.js</a> versão 20.3.1 ou superior.
* <a href="https://www.npmjs.com/" target="blank">npm </a>(normalmente vem com o Node.js) ou Yarn (opcional).
* <a href="https://code.visualstudio.com/" target="blank">VS Code</a> IDE utilizada para criação do projeto.
* <a href="https://www.docker.com/" target="blank">Docker</a> para pode executar o `docker compose` no qual irá subir o banco de dados.
* <a href="https://dbeaver.io/download/" target="blank">DBeaver Community</a> um aplicativo de software cliente SQL e uma ferramenta de administração de banco de dados ou outro de sua preferência.


### Comandos para Instalação

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

Para iniciar o banco de dados usando Docker, execute o seguinte comando:

```bash
docker-compose up -d
```

# Migration

## Criação da Migration

Para criar e executar as migrations do TypeORM, utilize os comandos abaixo:

```bash
# Criação da Migration
npx typeorm migration:create src/migrations/CreateTasksTable 

# Rodando a Migration
npx typeorm migration:run -d dist/database/orm-cli.config.js 
```

# Teste

## Executando os teste

Os seguintes comandos permitem executar testes unitários para o serviço e o controlador, bem como gerar relatórios de cobertura de teste:

```bash
# Teste do Service
npm run test -- tasks.service

# Teste do Controller
npm run test -- tasks.controller

# Teste Coverage
npm run test:cov
```
## Contribuindo para o Projeto

Se você estiver interessado em contribuir para o desenvolvimento deste projeto, fique à vontade para seguir os passos abaixo:

### Passos para Colaboração
1. Clone ou Fork do Repositório

Você pode <a href="https://github.com/CristianoSFMothe/app-tasks/tree/main/backend" target="blank">clonar o repositório</a> diretamente se desejar uma cópia local.
Alternativamente, você pode fazer um <a href="https://github.com/CristianoSFMothe/app-tasks/tree/main/backend" target="blank">fork</a> para criar sua própria cópia e trabalhar nela.

2. Desenvolvimento e Modificações

Após clonar ou fazer o fork, crie um novo branch para suas modificações:

```bash
git checkout -b nome-do-seu-branch
```

Faça as alterações necessárias, adicione commits significativos e, em seguida, faça push para o seu branch.

3. Envio de Pull Request

Depois de finalizar suas alterações, envie um Pull Request para que sua contribuição seja revisada e possivelmente incorporada ao projeto principal.