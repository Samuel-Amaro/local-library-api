# Projeto de Estudo de Back-End: Local Library API

Este projeto tem como objetivo principal o aprendizado e a construção de uma API RESTful para uma biblioteca local, utilizando tecnologias modernas no desenvolvimento back-end. A API permitirá realizar operações CRUD (Criar, Ler, Atualizar, Deletar) para gerenciar autores, livros, instâncias de livros e gêneros literários. Além disso, permitirá obter o catálogo completo da biblioteca.

## Instalar e rodar o projeto

Rodar o projeto em sua máquina local é uma tarefa extremamente simples.

### Dependências globais

Você precisa ter duas principais dependências instaladas:

- Bun runtime v1.1.10 (ou qualquer versão superior)
- Docker Engine v26.1.3 com Docker Compose v2.27.0 (ou qualquer versão superior)

### Dependências locais

Com o repositório clonado e as dependências globais instaladas, você pode instalar as dependências locais do projeto:

```sh
 bun install
```

### Rodar o projeto

Para rodar o projeto localmente, basta executar o comando abaixo:

```sh
 bun dev
```

Isto irá automaticamente rodar serviços como Banco de dados (incluindo as Migrations), Servidor desenvolvimento seguinte endereço:

```sh
 http://localhost:3000/
 http://localhost:3000/api/v1/*
```

Apos este passo executar a semente para preencher o banco de dados com dados falsos.

```sh
 bun seed
```

### Documentação API (Swagger)

para acessar a documentaçção da API, vá para:

```sh
 http://localhost:3000/api/v1/docs
```

## Autenticação

Para utilizar a API, será necessária uma autenticação simples via HTTP. Esta autenticação foi projetada para fins de estudo e utilização do protocolo HTTP básico:

- **Username**: admin
- **Senha**: admin

A autenticação básica HTTP será implementada para proteger os endpoints da API, garantindo que apenas usuários autorizados possam acessar e modificar os dados.

## Páginação

Os endpoints que recupera informações possui páginação simples usando **limit/offset**, via `params search` com os parâmetros,

```js
?page=1&pageSize=5&order=asc
```

## Funcionalidades da API

A API será projetada para suportar as seguintes operações:

- Autores

  - [x] Criar Autor: Adicionar novos autores ao banco de dados.
  - [x] Obter Autor: Recuperar informações detalhadas de um autor específico.
  - [x] Obter Todos Autor: Recuperar informações sobre todos autores.
  - [x] Atualizar Autor: Modificar informações de autores existentes.
  - [x] Deletar Autor: Remover autores do banco de dados.

- Livros

  - [x] Criar Livro: Adicionar novos livros ao catálogo.
  - [x] Obter Livro: Recuperar informações detalhadas de um livro específico.
  - [x] Obter Todos Livros: Recuperar informações de todos os livros cadastrados.
  - [x] Atualizar Livro: Modificar informações de livros existentes.
  - [x] Deletar Livro: Remover livros do catálogo.

- Instâncias de Livros

  - [x] Criar Instância de Livro: Adicionar novas instâncias de livros (exemplares) à biblioteca.
  - [x] Obter Instância de Livro: Recuperar informações detalhadas de uma instância específica.
  - [x] Obter Todas Instância de Livro: Recuperar todas as instâncias de livros existentes.
  - [x] Atualizar Instância de Livro: Modificar informações de instâncias existentes.
  - [x] Deletar Instância de Livro: Remover instâncias do banco de dados.

- Gêneros de Livro

  - [x] Criar Gênero: Adicionar novos gêneros literários.
  - [x] Obter Gênero: Recuperar informações detalhadas de um gênero específico.
  - [x] Obter Todos Gêneros: Recupear todos os Genêros.
  - [x] Atualizar Gênero: Modificar informações de gêneros existentes.
  - [x] Deletar Gênero: Remover gêneros do banco de dados.

- Catálogo da Biblioteca

  - [x] Obter Catálogo: Recuperar o catálogo completo de livros disponíveis na biblioteca, incluindo informações sobre autores, instâncias e gêneros.
