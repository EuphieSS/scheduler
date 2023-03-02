# Interview Scheduler

This project is a single page application built using React. It is a simple and easy-to-use scheduler that allows students to book, edit, and cancel interviews as needed, with just a few clicks. The client application communicates with an API server over HTTP, using the JSON format. Data is persisted by the API server using a PostgreSQL database.

## Features

- Colour-coordinated user interface
- Simple navigation
- Real time update of appointment information
- Real time update of time slot availability
- Built following best practices of TDD (Test Driven Development)

## Final Product

!["day-selected"](https://github.com/EuphieSS/scheduler/blob/master/docs/day-selected.png?raw=true)
!["edit-mode"](https://github.com/EuphieSS/scheduler/blob/master/docs/edit-mode.png?raw=true)
!["delete-mode"](https://github.com/EuphieSS/scheduler/blob/master/docs/delete-mode.png?raw=true)
!["error-mode"](https://github.com/EuphieSS/scheduler/blob/master/docs/error-mode.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## API Server/Database Setup

For full functionality, please ensure both the client and the API server are running concurrently.
- Fork and clone [this](https://github.com/lighthouse-labs/scheduler-api) repo
- Follow the steps outlined in README to set up database and API server

## Project Stack

__Front-End:__ React, Axios, JSX, HTML, SASS, JavaScript

__Back-End:__ Express, Node.js, PostgreSQL

__Testing:__ Storybook, Webpack Dev Server, Jest, React Hooks Testing Library and Cypress

## Dependencies

- Node v12.22.x (WSL) or v15.14.0 (M1)
- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
- Babel/core
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Babel-loader
- Sass
- Prop-types