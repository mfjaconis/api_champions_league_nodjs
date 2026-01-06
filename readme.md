# 🏆 Champions League API

API REST desenvolvida para gerenciamento de clubes e jogadores de futebol, inspirada no contexto da Champions League. Este projeto foi desenvolvido com o objetivo de demonstrar e aprimorar conhecimentos em desenvolvimento backend, aplicando boas práticas de arquitetura de software, padrões de projeto e tecnologias modernas.

## 📋 Sobre o Projeto

Este projeto consiste em uma API RESTful completa para gerenciamento de clubes de futebol e seus jogadores, incluindo estatísticas detalhadas de cada atleta. A aplicação foi construída seguindo princípios de Clean Architecture, com separação clara de responsabilidades e alta testabilidade.

### 🎯 Características Principais

- **Gerenciamento de Clubes**: CRUD completo com soft delete através de status ativo/inativo
- **Gerenciamento de Jogadores**: CRUD completo com relacionamento com clubes
- **Estatísticas de Jogadores**: Sistema detalhado de estatísticas (Overall, Pace, Shooting, Passing, Dribbling, Defending, Physical)
- **Validação de Dados**: Validação robusta usando Zod
- **Tratamento de Erros**: Middleware centralizado para tratamento de erros
- **Type Safety**: TypeScript em todo o projeto para maior segurança de tipos

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript
- **TypeScript**: Linguagem de programação com tipagem estática
- **Express.js**: Framework web para Node.js
- **Prisma**: ORM moderno e type-safe para TypeScript
- **PostgreSQL**: Banco de dados relacional
- **Zod**: Biblioteca de validação de schemas
- **Docker**: Containerização do banco de dados

### Ferramentas de Desenvolvimento
- **tsx**: Execução de TypeScript sem compilação prévia
- **tsup**: Bundler para produção
- **dotenv**: Gerenciamento de variáveis de ambiente

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **DDD (Domain-Driven Design)**, organizando o código em camadas bem definidas:

```
src/
├── config/          # Configurações da aplicação (env, etc)
├── lib/             # Bibliotecas e utilitários (Prisma client)
├── middlewares/     # Middlewares do Express (error handler, validation)
├── modules/         # Módulos de negócio (clubs, players)
│   ├── clubs/
│   │   ├── clubs-controller.ts    # Camada de controle (HTTP)
│   │   ├── clubs-service.ts       # Camada de serviço (lógica de negócio)
│   │   ├── clubs-repository.ts    # Camada de repositório (acesso a dados)
│   │   ├── clubs.routes.ts        # Definição de rotas
│   │   └── dtos/                   # Data Transfer Objects
│   └── players/
│       └── [estrutura similar]
├── routes/          # Agregação de rotas
├── app.ts           # Configuração do Express
└── server.ts        # Ponto de entrada da aplicação
```

### Camadas da Arquitetura

1. **Controller**: Responsável por receber requisições HTTP, validar entrada e retornar respostas
2. **Service**: Contém a lógica de negócio da aplicação
3. **Repository**: Abstrai o acesso aos dados, utilizando Prisma como ORM
4. **DTOs**: Objetos de transferência de dados para validação e tipagem

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose (para o banco de dados)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd project_champios_league
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5429/champions_league_db
PORT=3001
```

4. **Inicie o banco de dados com Docker**
```bash
docker-compose up -d
```

5. **Execute as migrações do Prisma**
```bash
npm run prisma:dev
```

6. **Gere o cliente Prisma**
```bash
npm run prisma:generate
```

7. **Inicie o servidor em modo desenvolvimento**
```bash
npm run start:dev
```

O servidor estará rodando em `http://localhost:3001` ou a porta definida na env.

### Scripts Disponíveis

- `npm run start:dev` - Inicia o servidor em modo desenvolvimento com hot reload
- `npm run start:watch` - Inicia o servidor em modo watch
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm run prisma:dev` - Executa migrações em modo desenvolvimento
- `npm run prisma:studio` - Abre o Prisma Studio para visualizar dados
- `npm run dist` - Compila o projeto para produção

## 📊 Modelo de Dados

### Club (Clube)
- `id`: UUID (identificador único)
- `name`: String (nome único do clube)
- `status`: Boolean (ativo/inativo - padrão: true)
- Relacionamento: Um clube pode ter vários jogadores

### Player (Jogador)
- `id`: UUID (identificador único)
- `name`: String (nome do jogador)
- `nationality`: String (nacionalidade)
- `position`: String (posição em campo)
- `clubName`: String? (nome do clube - opcional)
- Relacionamento: Um jogador pertence a um clube (opcional) e possui estatísticas

### PlayerStatistics (Estatísticas do Jogador)
- `id`: UUID (identificador único)
- `Overall`: Int (overall do jogador)
- `Pace`: Int (velocidade)
- `Shooting`: Int (finalização)
- `Passing`: Int (passe)
- `Dribbling`: Int (drible)
- `Defending`: Int (defesa)
- `Physical`: Int (físico)
- Relacionamento: Uma estatística pertence a um jogador (relação 1:1)

## 🔒 Soft Delete em Clubes

Uma decisão arquitetural importante foi implementada no gerenciamento de clubes: **não há exclusão física (hard delete)** de registros. Ao invés disso, foi implementado um sistema de **soft delete** através do campo `status`.

### Por que Soft Delete?

1. **Integridade Histórica**: Clubes são entidades que possuem histórico importante. Mesmo que um clube "falhe" ou seja desativado, seus dados históricos (jogadores, estatísticas, etc.) devem ser preservados para análises futuras e manutenção da integridade referencial.

2. **Rastreabilidade**: Manter registros permite auditoria e rastreamento de mudanças ao longo do tempo, essencial para sistemas que lidam com dados históricos esportivos.

3. **Relacionamentos**: Jogadores podem estar vinculados a clubes. A exclusão física de um clube poderia quebrar relacionamentos ou exigir cascatas complexas. Com soft delete, os relacionamentos são mantidos, mas o clube é marcado como inativo.

4. **Recuperação**: Em caso de erro ou necessidade de reativar um clube, o processo é simples: apenas alterar o status de `false` para `true`.

### Implementação

O campo `status` do modelo `Club` é um booleano que indica:
- `true`: Clube ativo e operacional
- `false`: Clube inativo (equivalente a "deletado" logicamente)

Quando um clube precisa ser "removido" do sistema, ao invés de deletá-lo, o status é alterado para `false`. Em consultas, filtros podem ser aplicados para retornar apenas clubes ativos quando necessário.

## 📡 Endpoints da API

### Clubs
- `GET /api/clubs` - Lista todos os clubes
- `GET /api/clubs/:id` - Busca um clube por ID
- `POST /api/clubs` - Cria um novo clube
- `PUT /api/clubs/:id` - Atualiza um clube
- `PATCH /api/clubs/:id/status` - Atualiza o status de um clube (soft delete)

### Players
- `GET /api/players` - Lista todos os jogadores
- `GET /api/players/:id` - Busca um jogador por ID
- `POST /api/players` - Cria um novo jogador
- `PUT /api/players/:id` - Atualiza um jogador
- `DELETE /api/players/:id` - Remove um jogador

## 🎓 Objetivo do Projeto

Este projeto foi desenvolvido com o propósito de:

- **Demonstrar competências técnicas** em desenvolvimento backend moderno
- **Aplicar boas práticas** de arquitetura de software e padrões de projeto
- **Mostrar conhecimento** em tecnologias atuais do ecossistema Node.js/TypeScript
- **Criar um portfólio** que atraia atenção de recrutadores e empresas do setor

O código foi escrito com foco em:
- ✅ Código limpo e legível
- ✅ Separação de responsabilidades
- ✅ Type safety com TypeScript
- ✅ Validação robusta de dados
- ✅ Tratamento adequado de erros
- ✅ Arquitetura escalável e manutenível



