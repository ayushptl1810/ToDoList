## ToDo List

A minimal full‑stack To‑Do application showcasing a clean CRUD API with a modern client UI. The project is now consolidated into a single service that serves both the Next.js frontend and Express backend from one deployment.

### Features

- **Create tasks**: Add new to‑dos with a simple form.
- **List tasks**: View all tasks stored in MongoDB.
- **Delete tasks**: Remove tasks when done.
- **Responsive UI**: Styled with modern utility classes.
- **Animated interactions**: Subtle motion for list items.
- **Single deployment**: Frontend and backend served from one service.

### Tech Stack

- **Client**: Next.js (App Router), React, Tailwind CSS, Axios, @react-spring/web
- **Server**: Node.js, Express, Mongoose (MongoDB), dotenv, CORS
- **Database**: MongoDB (Atlas or local)

### Monorepo Layout

```
ToDo List/
  client/        # Next.js application (React UI)
  server/        # Express API (MongoDB via Mongoose)
  package.json   # Root package.json for single-service management
```

## Prerequisites

- Node.js (LTS recommended)
- A MongoDB connection string (local or Atlas)

## Quick Start

### 1) Configure the server

Create a `.env` file at `server/.env` with at least:

```
MONGO_URI=<your-mongodb-connection-string>
# Optional: override the port (defaults to 5001)
# PORT=5001
```

### 2) Install all dependencies

From the project root, install all dependencies at once:

```bash
npm run install:all
```

### 3) Run the application

#### Development Mode (separate client/server)

```bash
npm run dev
```

This runs both client and server concurrently:

- API at `http://localhost:5001`
- Client at `http://localhost:3000`

#### Production Mode (single service)

```bash
npm start
```

This builds the client and serves everything from the Express server at `http://localhost:5001`

## Replication Checklist

1. Prepare a MongoDB URI and place it in `server/.env` (`MONGO_URI=...`).
2. Run `npm run install:all` from the project root.
3. For development: use `npm run dev` to run both services.
4. For production: use `npm start` to build and serve everything from one port.
5. Test CRUD operations end‑to‑end.

## API Reference

- **Base URL**: `/api` (relative to the server root)

  - During development: `http://localhost:5001/api`
  - In production: `/api` (same domain as frontend)

- **Create To‑Do**

  - Method: `POST`
  - Path: `/api/todos`
  - Body:
    ```json
    { "task": "Write documentation" }
    ```
  - Example:
    ```bash
    curl -X POST "/api/todos" \
      -H "Content-Type: application/json" \
      -d '{"task":"Write documentation"}'
    ```

- **Get All To‑Dos**

  - Method: `GET`
  - Path: `/api/todos`
  - Example:
    ```bash
    curl "/api/todos"
    ```

- **Update (toggle/rename) To‑Do**

  - Method: `PUT`
  - Path: `/api/todos/:id`
  - Body (example to toggle):
    ```json
    { "completed": true }
    ```
  - Example:
    ```bash
    curl -X PUT "/api/todos/<id>" \
      -H "Content-Type: application/json" \
      -d '{"completed":true}'
    ```

- **Delete To‑Do**

  - Method: `DELETE`
  - Path: `/api/todos/:id`
  - Example:
    ```bash
    curl -X DELETE "/api/todos/<id>"
    ```

## Environment Variables

- **Server (`server/.env`)**
  - `MONGO_URI` (required): MongoDB connection string.
  - `PORT` (optional): Port for the Express server. Defaults to `5001`.

## Scripts

- **Root Level**

  - `npm run install:all`: Install dependencies for all packages
  - `npm run dev`: Run both client and server in development mode
  - `npm start`: Build client and start production server
  - `npm run build`: Build the Next.js client for production

- **Server**

  - `npm run dev:server`: Start Express API only (development)
  - `npm start`: Build client and start production server

- **Client**
  - `npm run dev`: Start Next.js dev server
  - `npm run build`: Build for production
  - `npm start`: Start production server (after build)

## Deployment (Single Service)

The application is now designed to deploy as a single service:

1. **Set environment variables**: `MONGO_URI` and optionally `PORT`
2. **Build and start**: Run `npm start` to build the client and start the server
3. **Deploy**: Deploy the entire project to any Node.js hosting platform (Render, Railway, Fly.io, AWS, etc.)

The Express server will serve both the API endpoints and the static Next.js frontend from the same port.

## Troubleshooting

- **MongoDB connection fails**: Verify `MONGO_URI` is correct and accessible from your machine/host.
- **Port already in use**: Change `PORT` in `server/.env` or stop the process using that port.
- **Build fails**: Ensure all dependencies are installed with `npm run install:all`.
- **Static files not served**: Verify the client build completed successfully and the `client/out` directory exists.

## Notes

- Keep secrets out of source control. Use environment variables for credentials.
- For production, consider request validation and stronger error handling.
- The application now serves as a single service, making deployment simpler and more cost-effective.
