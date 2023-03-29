# Get started
- pnpm install
- pnpm run build
- pnpm run dev


# Building docker image

docker build -t timezone-buddy:latest -f dockerfile .

# K8s ingress controller deployment

helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace default --create-namespace

# K8s ingress configuration deployment

kubectl apply -f K8s/ingress.yaml

# K8s image deployment

helm upgrade --install --namespace=default timezone-buddy-service .  --set image.tag="latest"

# TODOs
## HTTPS configuration for K8s ingress

