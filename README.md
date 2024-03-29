# FastDash

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

Interactive responsive full-stack dashboard with advanced capabilities for automatic reporting.This comprehensive solution incorporates cutting-edge technologies such as Next.js with Typescript, Node.js with Express and Typescript, and leverages the power of a reliable PostgreSQL database. The dashboard seamlessly integrates front-end and back-end.

## Getting Started <a name = "getting_started"></a>

Clone the repository with
```
git clone https://github.com/pedrohrbarros/fastdash.git
```

Go to the backend directory and install all the dependencies

```
npm i
```

or 

```
yarn install
```

Create a .env file with all the parameters on the .env.example file 

Go to the frontend directory and install all the dependecies

```
npm i
```

or 

```
yarn install
```

After this just run for the backend

```
npm run start:dev
```

And for the frontend

```
npm run dev
```

### Build Production

With AWS:

- Connect to the AWS instance
- Check if the database is running
- Build the app with:

- Clone the app
```
git clone https://github.com/pedrohrbarros/fastdash.git
```
- Install NVM and node
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install node
```
- Install pm2
```
npm install -g pm2
```
- Install all the dependencies
```
cd fastdash/{frontend or backend}
npm i
```
- Build the js files
```
npm run build
```
- Redirect the port used in the project to the port 80(HTTP) and port 443 (HTTPS)
```
sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports ${your_port}
sudo iptables -t nat -I PREROUTING -p tcp --dport 443 -j REDIRECT --to-ports ${your_port}
```
- Check if the app is running
```
npm run start
``` 
- Start with the pm2
```
cd src
```
```
pm2 "npm run start" fastdash
```

### Prerequisites

- Node.js
- Next.js
- TailwindCSS
- PostgreSQL
