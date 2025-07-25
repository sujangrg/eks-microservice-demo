# EKS Microservice Demo: Setup Guide

## Prerequisites
- AWS CLI installed and configured (`aws configure`)
- `eksctl` installed
- `kubectl` installed
- Docker installed
- AWS IAM permissions for EKS

## 1. Create EKS Cluster
```
eksctl create cluster -f eks-cluster.yaml
```

## 2. Build & Push Docker Images
```
cd app
# Backend
# Replace <dockerhub-user> with your Docker Hub username or ECR repo

docker build -t <dockerhub-user>/eks-backend:latest .
docker push <dockerhub-user>/eks-backend:latest
cd ../frontend
# Frontend
docker build -t <dockerhub-user>/eks-frontend:latest .
docker push <dockerhub-user>/eks-frontend:latest
cd ..
```

## 3. Update Kubernetes Manifests
- Edit `k8s/backend.yaml` and `k8s/frontend.yaml` to use your image tags.

## 4. Deploy to EKS
```
kubectl apply -f k8s/
```

## 5. Access the Application
- For ingress:
  ```
  kubectl get ingress
  ```
- For service external IP:
  ```
  kubectl get svc
  ```

## 6. Clean Up
```
eksctl delete cluster -f eks-cluster.yaml
```
