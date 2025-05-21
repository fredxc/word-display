# ⚡ Ephemeral Word Display

This is my submission for the **Frontend/Fullstack Challenge** by Struck.

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/word-display.git
cd word-display
```

### 2. Create `.env`

Add a `.env` file at the project root with:

```env
DATABASE_URL="postgresql://postgres:pass@localhost:5432/postgres"
```

### 3. Start PostgreSQL via Docker

Make sure you have Docker installed, then run:

```bash
docker run -d \
  --name pgdev \
  -e POSTGRES_PASSWORD=pass \
  -p 5432:5432 \
  postgres
```

> This runs a local PostgreSQL instance with the same credentials used in `.env`.

### 4. Install dependencies

```bash
npm install
```

### 5. Generate and migrate Prisma schema

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Run the app locally

```bash
npm run dev
```

App will be running at [http://localhost:3000](http://localhost:3000)

---

## 🔎 Scripts

| Command                  | Purpose                       |
| ------------------------ | ----------------------------- |
| `npm run dev`            | Start local dev server        |
| `npx prisma migrate dev` | Reset or apply schema changes |

---

## 📬 Questions?

Reach out at [fredxcapanema@gmail.com](mailto:fredxcapanema@gmail.com) or connect on [LinkedIn](https://linkedin.com/in/fredericocapanema)
