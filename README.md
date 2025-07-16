# Autenticação JWT em APIs Node.js

Este é um projeto de estudos focado na implementação de autenticação JWT (JSON Web Token) em APIs Node.js utilizando TypeScript, Express e Prisma.

## 📚 Conceitos Estudados

- Autenticação vs Autorização
- JSON Web Tokens (JWT)
- Middleware no Express
- Hash de senhas com bcryptjs
- Validação de dados com Zod
- Clean Architecture
- Dependency Injection
- Adapter Pattern
- Error Handling
- TypeScript avançado

## 🏗 Arquitetura

O projeto segue princípios de **Clean Architecture** com:

- **Separação de responsabilidades** em camadas
- **Injeção de dependências** via factories
- **Interfaces** para desacoplamento
- **Adapters** para integração com Express
- **Use Cases** para lógica de negócio
- **Controllers** para manipulação de requisições

### Principais Classes

- [`SignUpUseCase`](src/application/useCases/SignUpUseCase.ts) - Cadastro de usuários
- [`SignInUseCase`](src/application/useCases/SignInUseCase.ts) - Login e geração de JWT
- [`AuthenticationMiddleware`](src/application/middlewares/AuthenticationMiddleware.ts) - Validação de tokens
- [`routeAdapter`](src/server/adapters/routeAdapter.ts) - Adaptador para controllers
- [`middlewareAdapter`](src/server/adapters/middlewareAdapter.ts) - Adaptador para middlewares

## 📁 Estrutura do Projeto

```
src/
├── @types/           # Tipos TypeScript customizados
├── application/      # Camada de aplicação
│   ├── config/       # Configurações
│   ├── controllers/  # Controladores
│   ├── errors/       # Classes de erro customizadas
│   ├── interfaces/   # Interfaces TypeScript
│   ├── libs/         # Bibliotecas e clientes
│   ├── middlewares/  # Middlewares da aplicação
│   └── useCases/     # Casos de uso
├── factories/        # Factories para injeção de dependência
├── generated/        # Código gerado pelo Prisma
└── server/          # Configuração do servidor
    └── adapters/    # Adaptadores para Express
```

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express** - Framework web para Node.js
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas
- **Zod** - Validação de schemas
- **ESLint** - Linter para código

## 🛠 Instalação e Configuração

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd autenticacao-jwt-em-apis-node
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/banco"
JWT_SECRET="seu-jwt-secret-super-seguro"
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Gere o cliente Prisma:
```bash
npx prisma generate
```

## 🚀 Como Executar

### Desenvolvimento
```bash
npm run dev
```

### Linting
```bash
npm run lint
```

O servidor estará disponível em `http://localhost:3001`

## 📋 Endpoints da API

### Autenticação

#### Cadastro de usuário
```http
POST /sign-up
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "minhasenha123"
}
```

#### Login
```http
POST /sign-in
Content-Type: application/json

{
  "email": "joao@exemplo.com",
  "password": "minhasenha123"
}
```

**Resposta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Rotas Protegidas

#### Listar leads (requer autenticação)
```http
GET /leads
Authorization: Bearer <token-jwt>
```

**Resposta:**
```json
{
  "leads": [
    { "id": "1", "name": "Zezinho" },
    { "id": "2", "name": "Mateusinho" },
    { "id": "3", "name": "Carlinhos" }
  ]
}
```

## 🔒 Autenticação

O projeto implementa autenticação JWT com as seguintes características:

- **Hash de senhas** usando bcryptjs com salt 10
- **Tokens JWT** com expiração de 1 dia
- **Middleware de autenticação** para rotas protegidas
- **Validação de Bearer token** no header Authorization

### Como usar a autenticação

1. Faça o cadastro via `/sign-up`
2. Faça login via `/sign-in` para obter o token
3. Use o token no header das requisições:
   ```
   Authorization: Bearer <seu-token-jwt>
   ```


## 📦 Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo desenvolvimento
- `npm run lint` - Executa o linter para verificar/corrigir código

## 🗄 Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM. O schema inclui:

### Tabela Accounts
```sql
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");
```


