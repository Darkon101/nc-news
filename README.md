# NC News API
A RESTful API for a reddit-style social news application built with Node.js, Express, and PostgreSQL.

This repo contains the necessary code to seed a database, and provides core endpoints for CRUD operations.

## Live Version
 The live version of this API can be accessed at:

 https://nc-news-ldgq.onrender.com/
 
## Installation & Setup

### Requirements:
- Node.js version >= v18.x 
- PostgreSQL version >= 16.x

### 1. Clone this repository

```bash
git clone https://github.com/Darkon101/nc-news.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup databases

```bash
npm run setup-dbs
```

### 4. Setup environment variables

Create the following .env files and amend accordingly:

`.env.test`

```
PGDATABASE = nc_news_test
```

`.env.development`

```
PGDATABASE = nc_news
```

To host the api create a: `.env.production` file
```
# example connection-string
PGDATABASE = postgres://postgres.apbkobhfnmcqqzqeeqss:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

The `connection-string` can vary depending on the method used to host the API. This project uses [Supabase](https://supabase.com/) and [Render](https://render.com/).

>Ensure .env files are gitignored if making changes to the codebase
### 4. Verify setup

```bash
npm run test-seed
npm run seed-dev
npm test
npm run seed-prod
```
