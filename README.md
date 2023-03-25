# Boas-vindas ao repositório do Projeto Store Manager!

## Sobre o Projeto
A API construída nesse projeto é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Você deverá utilizar o banco de dados MySQL para a gestão de dados. Além disso, a API deve ser RESTful.
API utilizando a arquitetura MSC (model-service-controller)!

# Orientações

<details>
  <summary><strong>🐳 Rodando no Docker vs Localmente</strong></summary>

### Com Docker

**:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

> :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d`.

- Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
- Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;
- A partir daqui você pode rodar o container `store_manager` via CLI ou abri-lo no VS Code.

> :information_source: Opção 1: Use o comando `docker-compose run node npm test`, ou para acessar o container e executar lá:

> :information_source: Opção 2: Use o comando `docker exec -it store_manager bash` e sigas passos abaixo.

- Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

> :information_source: Instale as dependências com `npm install`

- **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima.

- **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

- **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

- **:warning: Atenção:** Se você se deparar com o erro abaixo, quer dizer que sua aplicação já esta utilizando a `porta 3000`, seja com outro processo do Node.js (que você pode parar com o comando `killall node`) ou algum container! Neste caso você pode parar o container com o comando `docker stop <nome-do-container>`.

![erro na porta 3000](./public/erroDePorta.png)

![sequelize test](./public/remote-container.png)

 <br />

### 👉 Sem Docker

> :information_source: Instale as dependências com `npm install`

- **:warning: Atenção:** Não esqueça de renomear/configurar o arquivo `.env.example` para os testes locais funcionarem.
- **:warning: Atenção:** Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `Node.js` instalado em seu computador.
- **:warning: Atenção:** A versão do `Node.js` e `NPM` a ser utilizada é `"node": ">=16.0.0"` e `"npm": ">=7.0.0"`, como descrito a chave `engines` no arquivo `package.json`. Idealmente deve-se utilizar o Node.js na `versão 16.14`, a versão na que esse projeto foi testado.

  <br/>

</details>

<details>
  <summary><strong>‼️ Antes de começar </strong></summary>

1. Clone o repositório

- `git clone git@github.com:MarcleyRosa/store-manager.git`;

- Entre na pasta do repositório que você acabou de clonar:
  - `cd store-manager`

2. Instale as dependências

- `npm install`

  <br />

</details>

<details>
  <summary><strong>🛠 Execução de testes localmente</strong></summary>

> :information_source: IMPORTANTE

- Para poder executar os testes basta executar comando `npm test` _(lembre-se de que se estiver usando Docker, rodar esse comando dentro do container)_

Para este projeto você pode rodar os testes das seguintes maneiras.

- Executando todos: `npm test`
- **:warning: Atenção:** lembre-se de que se estiver usando Docker, rodar esse comando dentro do container.
  <br />
  
</details>

<details>
  <summary id="informacao-importante"><strong>⚠️ Informações importantes sobre o projeto</strong></summary>

- Pode ser utilizado para:

  - Adicionar, ler, deletar e atualizar produtos;
  - Enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe;
  - Ler, deletar e atualizar vendas.

- Para **todos os endpoints** garanta que:

  - Caso o recurso **não seja encontrado**, **aconteça um erro** ou **haja dados inválidos** na requisição, a API retorna o status HTTP adequado com o body `{ message: <mensagem de erro> }`;
  - Todos os endpoints sempre retornam uma resposta, havendo sucesso nas operações ou não;
  - Todos os endpoints sempre retornam os códigos de status corretos de acordo com o typo do error _(recurso criado, erro de validação, autorização, etc)_.
  - Verbos HTTP adequados para cada operação;

-  Foi utilizado o modelo MSC para que cada camada da API deva estar em seu respectivo diretório:
  - A camada **Models** no diretório de nome `./src/models`;
  - A camada **Services** no diretório de nome `./src/services`;
  - A camada **Controllers** no diretório de nome `./src/controllers`;
  - Os **Middlewares** no diretório de nome `./src/middlewares`.
    <br />
  </details>

<details>
  <summary id="diagrama-scripts"><strong>🎲 Diagrama ER, Entidades e Scripts</strong></summary>

#### Diagrama de Entidade-Relacionamento

---
#### Tabelas

O banco terá três tabelas:

- A tabela `products`, com os atributos `id` e `name`;
- A tabela `sales`, com os atributos `id` e `date`;
- A tabela `sales_products`, com os atributos `sale_id`, `product_id` e `quantity`;
- O script de criação do banco de dados pode ser visto [aqui](migration.sql);
- O script que popula o banco de dados pode ser visto [aqui](seed.sql);
---

#### Dicas de scripts prontos

- Criar o banco de dados e gerar as tabelas:

```sh
  npm run migration
```

- Limpar e popular o banco de dados:

```sh
  npm run seed
```

- Iniciar o servidor Node:

```sh
  npm start
```

- Iniciar o servidor Node com nodemon:

```sh
  npm run debug
```

- Executar os testes de unidade:

```sh
  npm run test:mocha
```

  <br />
</details>

<details id="para-escrever-seus-próprios-arquivos-de-teste">
  <summary><strong>🔬 Escrevendo testes de unidade</strong></summary><br />

```tree
.
├─ ...
├─ src
├─ tests
│   └─ unit
|       ├─ controllers
│           ├─ productsControllers.test.js
│           └─ salesControllers.test.js
|       ├─ services
│           ├─ productsServices.test.js
│           └─ salesServices.test.js
|       └─ models
│           ├─ productsModels.test.js
│           └─ salesModels.test.js
└─ ...
```
  <br />

</details>
