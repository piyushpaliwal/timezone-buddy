# Get started

In order to locally develop app execute following commands ([pnpm](https://pnpm.io) you need to have already installed)

```
pnpm install
pnpm run build
pnpm run dev
```

## Environment Variable

You should create a new `.env.development` file. Following are the variables that are required by the project.

- Auth Client ID - Register a new app in Azure because the app makes a connection to the `Graph API` by `Microsoft` and allows you to choose your team members.
  - After app registration, copy the `Client ID` and put it to the following variable

```
VITE_AUTH_CLIENT_ID=<guid-without-quotes>
```

# Kubernetes Deployment (optional)

## Building docker image

Generate a docker image for the project by running the following command

```
docker build -t timezone-buddy:1.0.0 -f dockerfile .
```

## K8s ingress controller deployment

This controller will help setup a reverse proxy from your `localhost`.

### Pre-requisites

- Kubernetes installed on your system
  - Alternatively, you can use someting like `minikube` to test deployment locally
    - **Note: There might be some challenges setting up `minikube` with the instructions from this document. Waiting for a fix, and post that the instructions will be updated accordingly.**
- Helm - Get it [here](https://helm.sh)

### Steps

```
helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace local --create-namespace
```

### Self signed cert for ingress

Generate a self-signed certificate as the app currently runs only on `https`

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout keyfile -out certfile
```

```
kubectl create secret tls domaincert --key .\keyfile --cert .\certfile
```

### Update hosts file

Modify local host file to redirect `localhost` traffic to `timezone-buddy.local` domain

- Windows: Hosts file is generally available at `C:\Windows\System32\drivers\etc\hosts`
- Linux/Mac: Hosts file is located at `/etc/hosts`

```
127.0.0.1 timezone-buddy.local
```

# K8s ingress configuration deployment

kubectl apply -f K8s/ingress.yaml

# K8s image deployment

helm upgrade --install --namespace=local front-timezone-buddy . --set image.tag="1.0.0"
