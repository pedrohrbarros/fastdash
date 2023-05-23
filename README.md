# FastDash

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

Interative full stack dashboard with automatic reporting.

## Getting Started <a name = "getting_started"></a>

Clone the repository with
```
git clone https://github.com/pedrohrbarros/fastdash.git
```

Go to the backend file and install all the dependencies

```
npm i
```

or 

```
yarn install
```

Now we set up the docker container and start the database

Install Docker and docker-compose plugin (Windows install it automatically with Docker Desktop)

Create a .env file with all the parameters on the .env.example file 

After this run the following commands:

Create a external volume:
```
docker volume create fastdash_volume
```

Launch Postgres Database with docker compose:
```
docker-compose up -d
```

The command above will launch the Postgres Database and create the necessary tables defined in the init.sql

### Prerequisites

What things you need to install the software and how to install them.

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo.

## Usage <a name = "usage"></a>

Add notes about how to use the system.
