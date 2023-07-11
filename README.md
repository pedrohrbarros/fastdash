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

### Build

With AWS:

- Connect to the AWS instance
- Check if the database is running
- Build the app with:
```
npm run build
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
pm2 start index.js
```

### Prerequisites

- Node.js
- Next.js
- TailwindCSS
- PostgreSQL
