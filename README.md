# Get started

In order to locally develop app execute following commands (pnpm you need to have already installed)

- pnpm install
- pnpm run build
- pnpm run dev

Remember to create .env.development and provide value for VITE_AUTH_CLIENT_ID

example:

VITE_AUTH_CLIENT_ID=GUID

# Building docker image

docker build -t timezone-buddy:1.0.0 -f dockerfile .

# K8s ingress controller deployment

You need to have helm installed first

helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace local --create-namespace

# Self signed cert for ingress

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout keyfile -out certfile

kubectl create secret tls domaincert --key .\keyfile --cert .\certfile

in C:\Windows\System32\drivers\etc\hosts add entry : 127.0.0.1 timezone-buddy.local

# K8s ingress configuration deployment

kubectl apply -f K8s/ingress.yaml

# K8s image deployment

helm upgrade --install --namespace=local front-timezone-buddy . --set image.tag="1.0.0"
