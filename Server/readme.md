## Getting Started

the server will run at port :=> http://127.0.0.1:4000

This is a [Node.js](https://nodejs.org/en) project

## available routes are

```bash
npm start
```

Open [list-all-users](http://127.0.0.1:4000/user/list-all) with your browser to see result

to understant the working of project visually install **_ Draw.io Integration _** extention in vscode

## Learn More

- **_ Routes _**=> this folder contains all the `available routes(url)` of the project each file in it contains the routes for its work .

- **_ Controllers _** => this directory contains the functions which will be `invoked by the routes` and utilise the methods from the services

- **_ Services _** => this directory contains the functions which will be able to `interact with database` directly

- **_ Database _** => this directory contains our both the database connection (there are two databases mainDB and staticQuestionDB)

- **_ Models _** => this directory contains all models of the project

- **_ Test.js _** => it is the file where we can test out our methods , code and routes

- **_ Index.js _** => is the `entry point` of our project

- **_ App.js _** => provides us the instance of express app and `interagtes` the routes to the main app

- **_ AiServices.js _** => This file contains all the interaction with the Ai bot

## Visual Explanation

- the **_ backendExplaination.drawio _** contains the diagram so that any one understand the project

- the **_ erDiagram.drawio _** contains the er diagram of the project
