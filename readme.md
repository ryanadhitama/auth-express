# Authentication using Express

## Tools

- Visual Studio Code

## Extension Visual Studio Code

- Prettier - Code formatter
- GitLens — Git supercharged
- EditorConfig for VS Code

## How to Use

1. Clone this repository
2. Make sure project folder already active at terminal / command line.
3. Run `npm install` to install dependency
4. Run `npm run db:create` to configure db, `npm run db:migrate` to migrate table, `npm run db:seed` to insert initial data into db
5. Run `npm run prepare` to setup husky
6. Run `npm run start` to run project
7. Happy Hacking

## Endpoint list

| Route        | Method | Description         |
| ------------ | ------ | ------------------- |
| /v1/login    | `POST` | Login existing user |
| /v1/register | `POST` | Create new user     |
| /v1/me       | `GET`  | Get user login      |

## Swagger

| Route    | Method | Description     |
| -------- | ------ | --------------- |
| /v1/docs | `GET`  | Show swagger UI |

## Test

`npm run test`
