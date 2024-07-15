## react-ssr

React web app boilerplate, powered by Express web framework as backend.

## Features

- Server-rendered [`react`](https://github.com/facebook/react) + [`react-frontload`](https://github.com/davnicwil/react-frontload) for async data loading.
- [`Express`](https://github.com/expressjs/express) - Node.js framework for backend work.
- Code splitting for server rendered components via [`loadable-components`](https://github.com/gregberge/loadable-components) library.
- Combination of [`babel`](https://github.com/babel/babel) and [`webpack`](https://github.com/webpack) enables writing next generation JavaScript and code optimization.
- [`webpack-hot-server-middleware`](https://github.com/60frames/webpack-hot-server-middleware) - hot reload for bundled file on server-side.
- Static route configuration with [`react-router-dom`](https://github.com/remix-run/react-router/tree/main/packages/react-router-dom) for React Router.
- Sass as extension of CSS and [`PostCSS`](https://github.com/postcss/postcss) for transforming styles, as well as [CSS modules](https://github.com/css-modules/css-modules) implementation out of the box.
- Enforce convention and avoid errors with code linter and formatter. ([`eslint`](https://github.com/eslint/eslint), [`prettier`](https://github.com/prettier/prettier), [`stylelint`](https://github.com/stylelint/stylelint))
- Implement security good practices with Express [`helmet`](https://github.com/helmetjs/helmet) and [`hpp`](https://github.com/analog-nico/hpp) middlewares.
- Using [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) to visualize size of webpack output files.
- Delightful testing with [`jest`](https://github.com/facebook/jest) framework for React components.
- SEO ready with [`react-helmet`](https://github.com/nfl/react-helmet) component to manage document head.
- [`husky`](https://github.com/typicode/husky) for better git commits experience.
- [`babel-watch`](https://github.com/kmagiera/babel-watch) to monitor changes made on server-side and automatically restart server.

## Requirement

Before you proceed, please make sure your machine has met the following requirements:

| Dependency |   Version   |
| ---------- | :---------: |
| Node       | >= v12.13.0 |
| NPM        | >= v6.12.0  |

## Installation

```bash
# cloning git repository into `react-ssr` folder
git clone --depth=1 https://github.com/xuanhoa88/react-ssr.git react-ssr

# install project dependencies
cd react-ssr && npm install
```

## Running

For **development**:

Create `.env.development` for development usage:

```bash
cp .env.defaults .env.development
```

Change environment variables to serve your app.

```bash
npm run dev
```

For **production**:

Change environment variables in `.env.defaults` to serve your app.

```bash
npm run build # or,
npm run build:analyze # to analyze built bundles

npm start
```

For **test**:

Create `.env.test` for staging usage:

```bash
cp .env.defaults .env.test
```

Change environment variables to serve your app.

```bash
npm test
```

## Project Structure

Below is overview of project folder structure in this starter along with the short descriptions, respectively:

<details><summary>CLICK ME</summary>
<p>

```
├── assets                      # contains other resources
|  ├── images                   # contains images for the app
├── coverage                    # generated test coverage folder
├── shared                      # util files for the app
|  ├── env.js                   # environment util
|  └── paths.js                 # project defined paths
├── src                         # contains all app source files
|  ├── components               # contains React components
|  ├── ssr                      # contains server components
|  ├── pages                    # contains page components
|  ├── routes                   # contains react route's configuration
|  ├── services                 # services registered for react frontload api
|  ├── static                   # contains static files that used in components
|  └── theme                    # contains app styels and variables
|  ├── client.js                # webpack's client entry
|  ├── server.js                # Express http server of the app
├── tools                       # contains webpack bundler config files
|  ├── webpack.client.js        # webpack config for client
|  ├── webpack.common.js        # webpack common config for both client/server
|  └── webpack.server.js        # webpack config for server
├── babel.config.js             # default babel configuration object
├── jest.config.js              # jest testing framework config file
├── package.json                # required dependencies, scripts, etc
├── postcss.config.js           # PostCSS config file
├── prettier.config.js          # Prettier formatter config file
├── stylelint.config.js         # stylelint config file
```

</p>
</details>

## NPM Scripts

- The following are available scripts in the project to perform respective tasks;
- We can execute script by running: `npm run <script name here>`

<details><summary>CLICK ME</summary>
<p>

| Script Name     | Description                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `clean`         | Remove `dist` folder and respective built files.                                                              |
| `build`         | Remove previous built files and build production ready files to be served.                                    |
| `build:analyze` | Same with `build` script, except it comes with webpack bundle analyzer to visualize size of the output files. |
| `dev`           | Start app server in development environment.                                                                  |
| `start`         | Start app server in production environment.                                                                   |
| `test`          | Perform tests execution.                                                                                      |
| `test:update`   | Running tests with snapshots get updated on.                                                                  |
| `test:watch`    | Running tests with watch mode turned on.                                                                      |
| `test:coverage` | Running tests with coverage report output.                                                                    |
| `lint`          | Perform source code lint checks for JS, React and styles based on the ESLint and stylelint config.            |
| `lint:style`    | Perform lint checks for Sass style.                                                                           |
| `lint:js`       | Perform lint checks for JS and React.                                                                         |

</p>
</details>
<br>

**Environment Variables**

The .env file is loaded based on the defined `process.env.NODE_ENV` value:

| File name          | NODE_ENV    |    In Source Control    |
| ------------------ | ----------- | :---------------------: |
| `.env.test`        | test        |           Yes           |
| `.env.development` | development |           Yes           |
| `.env.defaults`    | production  | No (Need to create new) |

Defined custom environment variables can be accessed via `process.env.[VARIABLE_NAME]`, for in instance:

```js
process.env.PORT; // this will give us PORT value
```

## Changelog

All notable changes made to the project will be documented on [release page](https://github.com/xuanhoa88/react-ssr/releases). For new project, always using the latest version. This project adheres to [Semantic Versioning](http://semver.org/).

## License

[MIT](https://raw.githubusercontent.com/xuanhoa88/react-ssr/main/LICENSE)
