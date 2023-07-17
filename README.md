# Scaleway Homework - Servers web app

## Fill environment variables
### Copy the example file
```bash
cp .env.example .env
```
### Fill the environment variables
Fill the environment variables in the `.env` file.
- VITE_SERVERS_API_URL is the URL of the API to get the servers list. (in local env use : `http://localhost:API_PORT/api/v1`)


## Install dependencies
```bash
pnpm install
```


## Start the app
```bash
pnpm run start:local
```

### Access the local web app
[http://localhost:5173](http://localhost:5173)


## Run tests
```bash
pnpm run test
```

### With coverage
```bash
pnpm run test:coverage
```
