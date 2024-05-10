# YTA Nusantara Project
Backend:
- Docker
- Python + Flask
- MySQL (Database)
- MinIO (Object Storage)

Frontend:
- React + Vite

## Installation
### Backend
`cd yta-nusantara-api`

`npm install`

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
- [ ] Make Mobile UX works
- [ ] Error handling in dashboard Admin
