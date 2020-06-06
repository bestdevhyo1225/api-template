# Boilerplate API

<br>

## Main modules

- [awilix](https://github.com/jeffijoe/awilix)
- [mali](https://github.com/malijs/mali)
- [typeorm](https://github.com/typeorm/typeorm)

<br>

## Playing locally

- NodeJS >= 12.x.x
- Docker Image
- .env file

### Ready

Run the `npm install` command

```zsh
$ npm install
```

Copy the `.env.sample` file to `./.env`

```zsh
$ cp .env.sample ./.env
```

### Running with docker

Build the docker image

```zsh
$ docker build -t user-api:latest .
```

Run the docker container

```zsh
$ docker-compose up -f docker-compose.yml
```

### Running with Local

Run the command as below

```zsh
# lint
$ npm run lint

# type check
$ npm run type-check

# start
$ npm start
```

<br>

## Project structure

```
src
├── common
│   ├── config
│   ├── types
│   └── utils
├── data
├── domain
│   ├── entity
│   └── usecase
├── infrastructure
│   ├── grpc-caller
│   ├── mali
│   └── typeorm
└── web
│   ├── grpc
│   └── request
test
├── integration
│   └── grpc
└── unit
    ├── data
    └── domain
```
