# Instructions: EKS Todo App with React Frontend, Node.js Backend, and AWS ALB Ingress

## 1. Prerequisites
- eksctl, kubectl, Docker, and AWS CLI installed
- AWS IAM permissions for EKS and ALB Ingress

## 2. Create EKS Cluster
```
cd /tmp/eks-microservice-demo
eksctl create cluster -f cluster.yaml
```

## 3. Install AWS Load Balancer Controller
Follow AWS docs: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html

## 4. Build & Push Docker Images
Replace <YOUR_DOCKERHUB_USERNAME>:
```
# Backend
cd app
npm install
# Build and push backend image
# docker build -t <YOUR_DOCKERHUB_USERNAME>/todo-backend:latest .
# docker push <YOUR_DOCKERHUB_USERNAME>/todo-backend:latest

# Frontend
cd ../frontend
npm install
# Build and push frontend image
# docker build -t <YOUR_DOCKERHUB_USERNAME>/todo-frontend:latest .
# docker push <YOUR_DOCKERHUB_USERNAME>/todo-frontend:latest
```

## 5. Update Kubernetes Manifests
- Edit `k8s/backend.yaml` and `k8s/frontend.yaml` to use your DockerHub username.

## 6. Deploy to EKS
```
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml
```

## 7. Access the App
- Get the ALB DNS from the Ingress:
```
kubectl get ingress todo-ingress
```
- Open the ADDRESS in your browser.

---

For more details, see AWS EKS and ALB Ingress documentation.
