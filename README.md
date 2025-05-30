# NC News Seeding

## Setup

### 1. Install npm dependencies

```bash
npm install
```

### 2. Setup databases

```bash
npm run setup-dbs
```

### 3. Setup environment variables

Create the following .env files:

`.env.test`

```
PGDATABASE = nc_news_test
```

`.env.development`

```
PGDATABASE = nc_news
```
### 4. Verify setup

```bash
npm run test-seed
npm run seed-dev
```

