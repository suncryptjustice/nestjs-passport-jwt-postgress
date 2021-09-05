<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

NestJS + Passport + PostgreSQL simple auth example

## API Test

- Create new user

```bash

curl --location --request POST 'YOUR_APP_URL/users/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@test.com",
    "password": "test"
}'

```

- Login with your credentials

```bash

curl --location --request POST 'YOUR_APP_URL/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@test.com",
    "password": "test"
}'

```

in response you should get access_token which you can attach for further requests with a Authorization header.

- Get profile info

```bash

curl --location --request GET 'YOUR_APP_URL/auth/profile/' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'

```

- Get your profile info

```bash

curl --location --request GET 'YOUR_APP_URL/auth/profile/' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'

```

## Installation

Simply clone this repo and run

```bash
$ npm install
```

Add enviroment variables for db and jwt

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

[MIT licensed](LICENSE).
