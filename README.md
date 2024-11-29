## 
<div style="display: flex; align-items: center;">
  <span style="margin-left: 10px; font-size: 24px; font-weight: bold;">To do List Project</span>
</div>
<hr>

Teste técnico para a vaga de desenvolvedor junior na empresa Wopus_Dev.

<img src="Front-End/src/assets/img/home.png" alt="home" style="width: 100%;"/>

## Arquitetura da Aplicação:

A arquitetura da aplicação é composta por uma arquitetura cliente-servidor, onde temos o cliente sendo o front-end da aplicação e o back-end sendo o servidor, além do banco de dados para a persistência dos dados.

## Tecnologias Utilizadas no Projeto:

Para a criação da arquitetura da aplicação foram utilizados:

- Docker
- Docker Compose

Para o Front-end da aplicação foram utilizados:

- React
- TailwindCSS
- Shadcn.

Para o Back-end da aplicação foram utilizados:

- TypeScript
- Nest.js
- Prisma

Para o Banco de Dados da aplicação foi utilizado:

- PostgreSQL

## Rodando o Projeto:

### Dependências:

É necessário ter instalado o Docker e o Docker Compose no seu computador para rodar o projeto.

Para isso, acesse: [Instalar Docker](https://docs.docker.com/engine/install/) e [Instalar Docker Compose](https://docs.docker.com/compose/install/).

Além disso, é necessário ter uma chave de API do Google Maps API para rodar o projeto. 

Para obter a chave, acesse: [Obter chave Google Maps API](https://developers.google.com/maps/get-started?hl=pt-br).

### Configurando o Projeto:

1. Acesse a pasta Back-end e crie um arquivo na raiz do projeto com o titulo **.env** acesse o arquivo **.env.example** copie seu conteudo e cole no arquivo **.env**:

2. Acesse a pasta Front-end e crie um arquivo na raiz do projeto com o titulo **.env** acesse o arquivo **.env.example** copie seu conteudo e cole no arquivo **.env**:



### Execultando o projeto:

Por fim dentro da pasta do projeto, abra um terminal e execulte o comando:

```
 docker compose up --build
```


Se tudo ocorrer bem voce deve ser capaz de acessar aplicação no seu navegador acessando a rota:


```
 http://localhost:4201/
```

Para acessar a documentação da api da aplicação, acesse no navegador a rota: 

```
 http://localhost:3333/api
```
