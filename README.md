# Task-Manager Full-Stack 🚀

A complete learning project that demonstrates how to build, test and deploy a task-management web app with **React, Express, PostgreSQL and Docker**.  
Live CI/CD via GitHub Actions · JWT authentication · Project board & issues in GitHub Projects.

---

## ✨ Features
- **User auth** – registration & login with hashed passwords + JWT  
- **Task CRUD** – create, list, update, delete tasks per user  
- **RESTful API** – built with Express 4 + CORS middleware  
- **Responsive UI** – React 18 + React Router v6  
- **PostgreSQL** – via Docker volume and init scripts  
- **CI pipeline** – lint, unit tests, build on every PR  
- **One-command dev** – `docker-compose up --build`

---

## 📁 Tech stack

| Layer     | Tech                                                                          |
|-----------|-------------------------------------------------------------------------------|
| Front-end | React 18, Vite (CRA initially), React Router v6, Fetch API                    |
| Back-end  | Node 18, Express 4, JWT, bcrypt, dotenv                                      |
| Database  | PostgreSQL 15                                                                 |
| Tooling   | ESLint, Prettier, Jest, Supertest, Nodemon                                    |
| DevOps    | Docker + Compose, GitHub Actions                                              |

---

## 🏗️ Local setup

```bash
# clone + install deps
git clone https://github.com/neo050/task-manager-fullstack.git
cd task-manager-fullstack
npm install --prefix client
npm install --prefix server

# start both services with Docker
docker-compose up --build
# client -> http://localhost:3000
# API    -> http://localhost:3001/api/health
```
Environment variables are defined in .env.example.

---

## 🚦 CI status

| Branch | Build |
|--------|-------|
| `main` | ![build](https://github.com/neo050/task-manager-fullstack/actions/workflows/build.yml/badge.svg) |

---

## 🗺 Project board & roadmap

All issues, epics and Story Points are tracked in the  
[**GitHub Projects Board**](https://github.com/neo050/task-manager-fullstack/projects/1).  
Current milestone: **MVP – Auth & Tasks**.

---

## 📚 Learning objectives

1. **Hands-on GitHub Flow** – feature branches, Pull Requests, protected `main`.
2. **Conventional Commits** – clean, searchable history.
3. **Docker-first** – identical dev/prod environments.
4. **T-shaped testing** – unit + integration tests.

---

## 🤝 Contributing

This repo is primarily my learning playground, but PRs with improvements are welcome – please open an issue first to discuss.

---

## 📄 License

MIT © 2025 Neoray Hagag (<neoray.asking666@gmail.com>)



