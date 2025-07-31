

Get the name of a running backend pod:
Exec into the pod (replace <pod-name> with the actual pod name):
Inside the pod, check the environment variable:


# Enable oidc-prodider for eks cluster in order to use IAM polidy
eksctl utils associate-iam-oidc-provider \
  --region ap-southeast-2 \
  --cluster eks-demo-cluster \
  --approve

# Create IAM Policy
aws iam create-policy \
  --policy-name TodoBackendSecretsManagerPolicy \
  --policy-document file://k8s/secretsmanager-policy.json

# Create service account
kubectl apply -f todo-backend-sa.yaml

# Apply policy to service account

eksctl create iamserviceaccount \
  --name todo-backend-sa \
  --namespace default \
  --cluster eks-demo-cluster \
  --attach-policy-arn arn:aws:iam::587647919393:policy/TodoBackendSecretsManagerPolicy \
  --approve \
  --override-existing-serviceaccounts