# DialogueBot Admin

Admin dashboard and backend for building, publishing, and operating DialogueBot script-based chatbots.

## Overview

This repository is split into two applications:

- `client/`: React + Vite admin UI for authentication, chatbot flow editing, training intents, channel management, live conversations, help content, and subscription screens.
- `server/`: Express + TypeScript API for auth, flows, intents, channels, uploads, webhook handling, live chat, billing, email, and background jobs.

The project is designed around a chatbot-builder workflow:

- Create and manage channels
- Build chatbot flows visually
- Train intents for message classification
- Publish flows to channels
- Handle incoming webhook traffic
- Monitor live conversations
- Manage plans and subscriptions

## Tech Stack

### Frontend

- React 18
- Vite
- TypeScript
- Tailwind CSS
- TanStack Query
- TanStack Router
- Radix UI
- Socket.IO client

### Backend

- Node.js
- Express
- TypeScript
- SWC
- Drizzle ORM
- PostgreSQL
- Redis
- Socket.IO
- Stripe
- Firebase Admin
- Nodemailer
- BullMQ

## Repository Structure

```text
.
├── client/   # Admin frontend
├── server/   # API, workers, database, webhooks
└── README.md
```

## Main Features

- Authentication and account verification
- Channel management for chatbot integrations
- Visual flow builder and flow publishing
- Intent training and test prediction
- Live chat / conversation handling over Socket.IO
- Email settings and bot mail workflows
- Subscription plans and Stripe checkout support
- Public webhook endpoints for chatbot events
- Multilingual content support

## Prerequisites

- Node.js 20
- npm
- PostgreSQL
- Redis

Optional for local development:

- Docker and Docker Compose for local Postgres + Redis

## Quick Start

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd dialogue-bot-admin

cd client && npm install
cd ../server && npm install
```

### 2. Start local infrastructure

From `server/`:

```bash
docker-compose up -d
```

This starts:

- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

### 3. Configure environment variables

Create `server/.env.development` manually using the sample below.

#### `server/.env.development`

```env
NODE_ENV=development
PORT=8080

ACCESS_TOKEN_SECRET=change-me
REFRESH_TOKEN_SECRET=change-me
RESET_PASS_TOKEN_SECRET=change-me
VERIFY_EMAIL_TOKEN_SECRET=change-me

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dialoguebot

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

LOG_FORMAT=dev
LOG_DIR=logs
CREDENTIALS=true
ORIGIN=http://localhost:5173

PUBLIC_DOMAIN=http://localhost:8080
BOT_ENDPOINT=http://localhost:8080
API_TOKEN=change-me
SIGNATURE_SECRET=change-me
AUTO_REGISTER_WEBHOOK=false

MAIL_USER=
MAIL_PASS=

STRIPE_SECRET_KEY=
STRIPE_ENDPOINT_SECRET=

FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=
FIREBASE_DATABASE_URL=
```

Create a frontend env file in `client/`:

#### `client/.env`

```env
VITE_DEV_API_URL=http://localhost:8080
VITE_PROD_API_URL=https://api.dialoguebot.tech
```

### 4. Run database migration

From `server/`:

```bash
npm run push:migrate
```

Optional seed:

```bash
npm run db:seed
```

### 5. Start the applications

Backend from `server/`:

```bash
npm run dev
```

Frontend from `client/`:

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

## Available Scripts

### Client

Run from `client/`:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

### Server

Run from `server/`:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run lint:fix
npm run push:migrate
npm run gen:migrate
npm run db:seed
npm run db:studio
```

## API Surface

The Express app mounts all routes under `/api`. Major route groups include:

- `/api/auth`
- `/api/user`
- `/api/channel`
- `/api/flow`
- `/api/intent`
- `/api/conversation`
- `/api/conversation-live-chat`
- `/api/setting`
- `/api/subscriptions`
- `/api/user-subscriptions`
- `/api/upload`
- `/api/webhook`

Static assets are exposed from:

- `/public`

## Docker

The repository includes Dockerfiles for both apps:

- `client/Dockerfile`
- `server/Dockerfile`

The backend also includes:

- `server/docker-compose.yml` for local Postgres and Redis
- `server/ecosystem.config.js` for PM2-based production execution

## Development Notes

- The backend loads `.env.development` automatically when `NODE_ENV=development`.
- Minimal required server variables enforced at startup are:
  - `NODE_ENV`
  - `PORT`
  - `ACCESS_TOKEN_SECRET`
  - `REFRESH_TOKEN_SECRET`
  - `DATABASE_URL`
- Socket.IO is enabled on the backend and used by the frontend for live chat notifications.
- CORS currently allows common local frontend ports plus the production DialogueBot domains.

## Production Notes

- Build the frontend with `npm run build` in `client/`.
- Build the backend with `npm run build` in `server/`.
- The PM2 config runs the API on port `8080`.
- Stripe, Firebase, mail, and webhook-related features require valid production credentials before they will work correctly.
