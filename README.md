
<h1 align="center">Nodejs API Boilerplate</h1>

<p align="center">
  <a href="https://github.com/ssjblue197/nodejs-template">
    <img src="https://travis-ci.org/w3tecch/express-typescript-boilerplate.svg?branch=master" alt="travis" />
  </a>
  <a href="https://github.com/ssjblue197/nodejs-template">
    <img src="https://ci.appveyor.com/api/projects/status/f8e7jdm8v58hcwpq/branch/master?svg=true&passingText=Windows%20passing&pendingText=Windows%20pending&failingText=Windows%20failing" alt="appveyor" />
  </a>
  <a href="https://github.com/ssjblue197/nodejs-template">
    <img src="https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat" alt="StackShare" />
  </a>
</p>

<p align="center">
  <b>A delightful way to building a Node.js RESTful API Services with beautiful code written in Vanilla Javascript.</b></br>
  <span>Inspired by the awesome framework & other repo(s) on Github, Gitlab, Gitee,...</span></br>
  <sub>Made with ❤️ by <a href="https://www.facebook.com/ssjblue197">ssjblue197</a></sub>
</p>

<br />

## ❯ Why I should be use it

My main goal with this project is a feature complete server application.
I like you to be focused on your business and not spending hours in project configuration.

Try it!! I'm happy to hear your feedback or any kind of new features.

### Features

- [x] **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- [x] **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- [x] **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- [x] **Dependency management**: with [Yarn](https://yarnpkg.com)
- [x] **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- [x] **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- [x] **Santizing**: sanitize request data against xss and query injection
- [x] **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- [ ] **Code coverage**: using [coveralls](https://coveralls.io)
- [ ] **Code quality**: with [Codacy](https://www.codacy.com)
- [x] **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- [x] **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- [x] **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)
- [x] **Authentication and authorization**: using [passport](http://www.passportjs.org)
- [x] **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- [x] **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- [ ] **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- [x] **Error handling**: centralized error handling mechanism
- [ ] **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- [ ] **CI**: continuous integration with [Travis CI](https://travis-ci.org)
- [ ] **Docker support**

## ❯ Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install yarn globally

```bash
npm install --global yarn
```

### Step 2: Create new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env`-file.

Then setup your application environment.

```bash
yarn install
```

> This installs all dependencies with yarn. After that your development environment is ready to use.

### Step 3: Serve your App

Go to the project dir and start your app with this yarn script.

```bash
yarn dev
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://localhost:3000` [default].

## ❯ Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## ❯ License

[MIT](LICENSE)
