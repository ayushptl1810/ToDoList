## ToDo List

A minimal full‑stack To‑Do application showcasing a clean CRUD API with a modern client UI. The project is split into a Next.js client and an Express + MongoDB server, designed for clarity, rapid iteration, and easy local replication.

### Features

- **Create tasks**: Add new to‑dos with a simple form.
- **List tasks**: View all tasks stored in MongoDB.
- **Delete tasks**: Remove tasks when done.
- **Animated interactions**: Subtle motion for list items.

### Tech Stack

- **Client**: Next.js (App Router), React, Tailwind CSS, Axios, @react-spring/web
- **Server**: Node.js, Express, Mongoose (MongoDB), dotenv, CORS
- **Database**: MongoDB (Atlas or local)

### Monorepo Layout

```
ToDo List/
  client/        # Next.js application (React UI)
  server/        # Express API (MongoDB via Mongoose)
```

## Prerequisites

- Node.js (LTS recommended)
- A MongoDB connection string (local or Atlas)

## Quick Start (Local)

### 1) Configure the server

Create a `.env` file at `server/.env` with at least:

```
MONGO_URI=<your-mongodb-connection-string>
# Optional: override the port (defaults to 5001)
# PORT=5001
```

### 2) Install dependencies

From the project root, install client and server dependencies separately:

```bash
cd server && npm install
cd ../client && npm install
```

### 3) Run the services

Open two terminals (one for the API, one for the client):

API (Express):

```bash
cd server
npm start
```

Client (Next.js):

```bash
cd client
npm run dev
```

By default:

- API listens at `http://localhost:5001`
- Client runs at `http://localhost:3000`

The client expects the API to be reachable at the API’s base URL. If you change the server port or host, you’ll need to align the client’s API base URL accordingly.

## Replication Checklist

1. Prepare a MongoDB URI and place it in `server/.env` (`MONGO_URI=...`).
2. Install dependencies in both `server/` and `client/`.
3. Start the API first, confirm you see “MongoDB Connected” and the port log.
4. Start the client and open `http://localhost:3000`.
5. Create a task, toggle its completion, delete it — verify CRUD works end‑to‑end.

## API Reference

- **Base URL**: `<API_BASE_URL>/api`

  - Default during local development: `http://localhost:5001/api`

- **Create To‑Do**

  - Method: `POST`
  - Path: `/todos`
  - Body:
    ```json
    { "task": "Write documentation" }
    ```
  - Example:
    ```bash
    curl -X POST "<API_BASE_URL>/api/todos" \
      -H "Content-Type: application/json" \
      -d '{"task":"Write documentation"}'
    ```

- **Get All To‑Dos**

  - Method: `GET`
  - Path: `/todos`
  - Example:
    ```bash
    curl "<API_BASE_URL>/api/todos"
    ```

- **Update (toggle/rename) To‑Do**

  - Method: `PUT`
  - Path: `/todos/:id`
  - Body (example to toggle):
    ```json
    { "completed": true }
    ```
  - Example:
    ```bash
    curl -X PUT "<API_BASE_URL>/api/todos/<id>" \
      -H "Content-Type: application/json" \
      -d '{"completed":true}'
    ```

- **Delete To‑Do**
  - Method: `DELETE`
  - Path: `/todos/:id`
  - Example:
    ```bash
    curl -X DELETE "<API_BASE_URL>/api/todos/<id>"
    ```

## Environment Variables

- **Server (`server/.env`)**
  - `MONGO_URI` (required): MongoDB connection string.
  - `PORT` (optional): Port for the Express server. Defaults to `5001`.
- **Client**
  - If you plan to externalize the API base URL, you can adopt a variable like `NEXT_PUBLIC_API_BASE_URL` and use it in API calls. This repository currently calls the API directly; align the client’s base URL with your server’s host/port when replicating or deploying.

## Scripts

- **Server**
  - `npm start`: start Express API
- **Client**
  - `npm run dev`: start Next.js dev server
  - `npm run build`: build for production
  - `npm start`: start production server (after build)

## Deployment (General Guidance)

- **API**: Deploy to any Node‑friendly host (e.g., Render, Railway, Fly.io, AWS). Set `MONGO_URI` and optionally `PORT`. Ensure the service exposes the chosen port.
- **Client**: Deploy to a Next.js host (e.g., Vercel, Netlify with adapters). Align the client’s API base URL with the deployed API’s public URL.

## Troubleshooting

- **MongoDB connection fails**: Verify `MONGO_URI` is correct and accessible from your machine/host.
- **Port already in use**: Change `PORT` in `server/.env` or stop the process using that port, then align the client’s API base URL to match.
- **CORS errors**: Ensure the API URL you call matches your running server and that CORS is enabled (it is by default in this server).

## Notes

- Keep secrets out of source control. Use environment variables for credentials.
- For production, consider request validation and stronger error handling.
