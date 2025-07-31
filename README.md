
# Instructions: EKS Todo App with React Frontend, Node.js Backend, and AWS ALB Ingress
## Handling Secrets in the Backend

To securely provide sensitive values (like API keys) to your backend, use Kubernetes Secrets:

### 1. Create a Secret

```
kubectl create secret generic todo-secret --from-literal=API_KEY=my-secret-key
```

### 2. Reference the Secret in the Backend Deployment

In `k8s/backend.yaml`, the deployment references the secret as an environment variable:

```yaml
env:
  - name: API_KEY
    valueFrom:
      secretKeyRef:
        name: todo-secret
        key: API_KEY
```

### 3. Access the Secret in Your App

In your Node.js backend, use:

```js
const API_KEY = process.env.API_KEY;
```

You can now use `API_KEY` in your application logic.

## 1. Prerequisites
- eksctl, kubectl, Docker, and AWS CLI installed
- AWS IAM permissions for EKS and ALB Ingress

## Local Development with Docker Compose

To run both backend and frontend locally using Docker Compose:

1. Make sure Docker is running.
2. In the project root, run:
   ```sh
   docker-compose up --build
   ```
3. Access the frontend at http://localhost:8080
4. The backend API will be available at http://localhost:3000

Any changes to the code will require rebuilding the containers (Ctrl+C to stop, then rerun the command above).

## Create ECR



---

## 2. Create EKS Cluster
```
cd /tmp/eks-microservice-demo
eksctl create cluster -f eks-cluster.yaml
```

## 3. Install AWS Load Balancer Controller
Follow AWS docs: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html

## 4. Build & Push Docker Images for EKS (Multi-Arch)
Replace <your-dockerhub-username> with your Docker Hub username:
```
# Backend
cd app
npm install
# Build for amd64 (EKS compatible)
docker buildx build --platform linux/amd64 -t <your-dockerhub-username>/todo-backend:latest .
docker push <your-dockerhub-username>/todo-backend:latest

# Frontend
cd ../frontend
npm install
docker buildx build --platform linux/amd64 -t <your-dockerhub-username>/todo-frontend:latest .
docker push <your-dockerhub-username>/todo-frontend:latest
```
**Note:** Always use `--platform linux/amd64` to ensure compatibility with EKS nodes.

## 5. Update Kubernetes Manifests
- Edit `k8s/backend.yaml` and `k8s/frontend.yaml` to use your DockerHub username.

## 6. Deploy to EKS
```
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/nlb.yaml
```

## 7. Access the App
- Get the ALB DNS from the Ingress:
```
kubectl get ingress todo-ingress
```
- Open the ADDRESS in your browser.

---

For more details, see AWS EKS and ALB Ingress documentation.
