# YTA Nusantara Project
Backend:
- Docker
- Python + Flask
- MySQL (Database)
- MinIO (Object Storage)

Frontend:
- React + Vite

## Installation
### Frontend
`cd yta-nusantara-api`

`npm install`

`npm run dev`

- Docker

`docker-compose up`

or

`docker-compose up --build`

### Backend

Copy `env.example` to `.env`, and adjust the config (if needed)

- Docker:

Linux/Mac:

`bash ./run.sh`

Windows:

`docker-compose up`

or

`docker-compose up --build`

### Frontend
`cd yta-nusantara`

`npm install`

`npm run dev`

## Nginx Config

### Frontend

```
    location ~ /files/(.*)$ {
      proxy_pass http://127.0.0.1:3001/files/$1;
    }
    
    location ~ /(.*)$ {
      proxy_pass http://127.0.0.1:8084/$1;
    }
```


### Backend

- API

```
	location / {
        proxy_pass http://127.0.0.1:3001;
    }
```

- Files

```

	location / {
      proxy_pass http://127.0.0.1:9000;
    }
    
		location /admin {
      proxy_pass http://127.0.0.1:9090;
    }

```

## Docs
### Login Dashboard

`http://localhost:5173/admin`

Username: `admin`

Password: `admin`

### API Documentation

[http://localhost:3001/apidocs/](http://localhost:3000/apidocs/)

## ToDo
- [x] Improve UX Navigation Program
- [x] Modal Pop-Up (for sub program & article/workshops))
- [x] Pagination for workshop
- [x] SortBy date descending Workshop Dashboard Admin
- [x] Make Mobile UX works
- [ ] Error handling in dashboard Admin
