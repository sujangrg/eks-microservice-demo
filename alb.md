
# https://docs.aws.amazon.com/eks/latest/userguide/lbc-helm.html

# Associate OIDC provider
eksctl utils associate-iam-oidc-provider --region=ap-southeast-2 --cluster=eks-demo-cluster --approve



eksctl create iamserviceaccount \
    --cluster=eks-demo-cluster \
    --namespace=kube-system \
    --name=aws-load-balancer-controller \
    --attach-policy-arn=arn:aws:iam::587647919393:policy/AWSLoadBalancerControllerIAMPolicy \
    --override-existing-serviceaccounts \
    --region ap-southeast-2 \
    --approve


# Install aws load balancer controller

helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=eks-demo-cluster \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  --version 1.13.0