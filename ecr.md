# AWS ECR (Elastic Container Registry) Setup

## 1. Create ECR Repositories

Create a separate ECR repository for each service (backend and frontend):

```sh
aws ecr create-repository --repository-name todo-backend
aws ecr create-repository --repository-name todo-frontend
```

## 2. Authenticate Docker to ECR

```sh
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 587647919393.dkr.ecr.ap-southeast-2.amazonaws.com
```

## 3. Build, Tag, and Push Images

### Backend
```sh
docker build -t todo-backend:latest ./app
docker tag todo-backend:latest 587647919393.dkr.ecr.ap-southeast-2.amazonaws.com/todo-backend:latest
docker push 587647919393.dkr.ecr.ap-southeast-2.amazonaws.com/todo-backend:latest
```

### Frontend
```sh
docker build -t todo-frontend:latest ./frontend
docker tag todo-frontend:latest 587647919393.dkr.ecr.ap-southeast-2.amazonaws.com/todo-frontend:latest
docker push 587647919393.dkr.ecr.ap-southeast-2.amazonaws.com/todo-frontend:latest
```

## Notes
- You only pay for storage and data transfer in ECR, not for the number of repositories.
- Use separate repos for each service for better organization and management.
