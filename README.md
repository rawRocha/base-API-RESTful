# base-API-RESTful

Uma API RESTful robusta destinada ao gerenciamento de recursos, com funcionalidades voltadas para autenticação, autorização por meio de JWT, e controle baseado em tipos de usuários. A API usa o Sequelize como ORM para comunicação com um banco de dados MariaDB.

# API RESTful com Controle de Usuários e JWT

Este é um projeto de uma API RESTful desenvolvida em Node.js, utilizando o framework Express, para gerenciamento de recursos com autenticação baseada em JWT e controle de permissões por tipos de usuários (role-based access control). O banco de dados é gerenciado com MariaDB e o ORM Sequelize.

## **Recursos Principais**

### Autenticação e Autorização

- **JWT** para autenticação.
- Controle de acesso baseado no tipo do usuário (`role_id`).

### Gerenciamento de Usuários

- CRUD de usuários.
- Campos do usuário:
  - `id`: identificador exclusivo.
  - `name`: nome do usuário.
  - `email`: e-mail do usuário.
  - `password_hash`: senha criptografada.
  - `role_id`: define o tipo do usuário (ex.: 1 = Admin, 2 = Usuário Comum).

### Middlewares

- **authMiddleware**: garante que apenas usuários autenticados possam acessar rotas protegidas.
- **roleMiddleware**: valida se o tipo de usuário tem permissão para acessar determinadas rotas.

### Banco de Dados

- **MariaDB**: Banco relacional.
- **Sequelize**: ORM para gerenciamento das tabelas e consultas.

## **Configuração do Projeto**

### **1. Instalar Dependências**

Certifique-se de que o Node.js e o npm estejam instalados.

```bash
npm install
```

### **2. Configurar Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE=Sua DATABASE aqui!
DATABASE_PORT=3306
DATABASE_HOST=localhost || IP, ENDEREÇO...
DATABASE_USERNAME=Seu USERNAME
DATABASE_PASSWORD=Sua senha de acesso do DATABASE

TOKEN_SECRET=Seu SECRET aqui!
TOKEN_EXPIRATION=7d

```

### **3. Configurar o Banco de Dados**

Certifique-se de que o MariaDB esteja rodando e crie um banco de dados:

```sql
CREATE DATABASE nome_do_banco;
```

### **4. Executar Migrações**

Inicie o Sequelize para criar as tabelas no banco de dados:

```bash
npx sequelize-cli db:migrate
```

### **5. Rodar o Projeto**

Inicie o servidor:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`.

## **Rotas da API**

### **1. Usuários**

#### **POST /users**

Cria um novo usuário.

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "123456",
  "phone": "81998765432"
  "role_id": 2
}
```

#### **GET /users**

Lista todos os usuários (apenas admins).

- **Header**:
  ```
  Authorization: Bearer <token>
  ```

#### **DELETE /users/:id**

Deleta um usuário (apenas admins).

### **2. Login**

#### **POST /login**

Autentica um usuário e retorna um token JWT.

```json
{
  "email": "john.doe@example.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1..."
}
```

## **Tecnologias Utilizadas**

- **Node.js**: Plataforma de execução do servidor.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para banco de dados relacional.
- **MariaDB**: Banco de dados utilizado.
- **JWT**: Para autenticação e geração de tokens.
- **bcrypt**: Criptografia de senhas.
