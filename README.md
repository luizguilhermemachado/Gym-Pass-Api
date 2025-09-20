# 🏋️‍♂️ GymPass API (api-solids)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Fastify](https://img.shields.io/badge/Fastify-4.x-black?style=for-the-badge&logo=fastify)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-4169E1?style=for-the-badge&logo=postgresql)
![Vitest](https://img.shields.io/badge/Vitest-1.x-6E9F18?style=for-the-badge&logo=vitest)

Uma API RESTful robusta para gerenciamento de academias, usuários e check-ins, construída com princípios de Clean Architecture e SOLID.

## ✨ Funcionalidades

- 🔐 Autenticação JWT com refresh tokens
- 👥 Gerenciamento de usuários com diferentes níveis de acesso
- 🏟️ CRUD completo de academias (apenas para administradores)
- 📍 Check-in em academias com validação de proximidade (100m)
- 📊 Métricas e histórico de check-ins por usuário
- 🧪 Testes abrangentes (unitários e e2e)
- 🐘 Prisma ORM com PostgreSQL
- ⚡ Fastify para alta performance

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd api-solids
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   NODE_ENV=dev
   JWT_SECRET=sua_chave_secreta_super_segura
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/gympass_db"
   ```

4. **Execute as migrations do banco de dados**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor**
   ```bash
   # Modo desenvolvimento
   npm run dev
   
   # Modo produção
   npm run build
   npm start
   ```

6. **Acesse o Prisma Studio (opcional)**
   ```bash
   npx prisma studio
   ```

## 📋 Endpoints da API

### 👤 Autenticação & Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/users` | Cria um novo usuário | ❌ |
| POST | `/sessions` | Autentica um usuário | ❌ |
| GET | `/me` | Retorna perfil do usuário | ✅ |
| PATCH | `/token/refresh` | Renova token de acesso | ✅ |

### 🏟️ Academias

| Método | Endpoint | Descrição | Autenticação | Permissão |
|--------|----------|-----------|--------------|-----------|
| POST | `/gyms` | Cria uma nova academia | ✅ | ADMIN |
| GET | `/gyms/search` | Busca academias por nome | ✅ | - |
| GET | `/gyms/nearby` | Lista academias próximas | ✅ | - |

### ✅ Check-ins

| Método | Endpoint | Descrição | Autenticação | Permissão |
|--------|----------|-----------|--------------|-----------|
| POST | `/gyms/:gymId/check-ins` | Realiza check-in em academia | ✅ | - |
| PATCH | `/check-ins/:checkInId/validate` | Valida um check-in | ✅ | ADMIN |
| GET | `/check-ins/history` | Histórico de check-ins | ✅ | - |
| GET | `/check-ins/metrics` | Métricas de check-ins | ✅ | - |

## 🧪 Testes

```bash
# Executar testes unitários
npm run test

# Executar testes end-to-end
npm run test:e2e

# Executar testes com cobertura
npm run test:coverage

# Executar todos os testes
npm run test:all
```

## 🏗️ Estrutura do Projeto

```
api-solids/
├── prisma/                 # Schema e migrations do banco
├── src/
│   ├── http/              # Camada HTTP (controllers, middlewares)
│   ├── services/          # Lógica de negócio (use cases)
│   ├── repositories/      # Camada de acesso a dados
│   ├── lib/               # Bibliotecas e configurações
│   ├── utils/             # Utilitários e helpers
│   ├── env/               # Validação de variáveis de ambiente
│   ├── app.ts             # Configuração do Fastify
│   └── server.ts          # Ponto de entrada da aplicação
├── tests/                 # Testes e2e e unitários
├── package.json
└── tsconfig.json
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação:

- **Access Token**: Expira em 10 minutos (enviado no response body)
- **Refresh Token**: Expira em 7 dias (enviado como cookie HTTP-only)

Para renovar o access token, utilize o endpoint `PATCH /token/refresh` que automaticamente utilizará o refresh token do cookie.

## 🌐 Exemplos de Uso

### Criando um usuário
```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456"
  }'
```

### Realizando login
```bash
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "123456"
  }'
```

### Buscando academias próximas
```bash
curl -X GET "http://localhost:3333/gyms/nearby?latitude=-23.5505&longitude=-46.6333" \
  -H "Authorization: Bearer <SEU_ACCESS_TOKEN>"
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

- Verifique a [documentação do Prisma](https://www.prisma.io/docs/)
- Consulte a [documentação do Fastify](https://www.fastify.io/docs/latest/)
- Abra uma issue no repositório

## 🔗 Links Úteis

- [Documentação do Prisma](https://www.prisma.io/docs/)
- [Documentação do Fastify](https://www.fastify.io/docs/latest/)
- [Documentação do Vitest](https://vitest.dev/)

---

**Nota:** Certifique-se de configurar corretamente as variáveis de ambiente e executar as migrations antes de iniciar o servidor.
