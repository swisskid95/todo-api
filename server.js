const express = require("express");
const bodyParser = require("body-parser");
const _ = require("underscore");

const app = express();

const PORT = process.env.PORT || 3000;
let todoNextId = 4;

app.use(bodyParser.json());

const todos = [
  {
    id: 1,
    description: "Bath Willie's puppy",
    completed: false
  },
  {
    id: 2,
    description: "Take cloths to dry cleaner",
    completed: false
  },
  {
    id: 3,
    description: "Take the trash out",
    completed: true
  }
];


app.get("/", (req, res) => {
  res.send("Todo Api Root");
});

// Get todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Get todos:id
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  let matchedTodo = _.findWhere(todos, {id: todoId});

  if(matchedTodo){
    res.json(matchedTodo);
  } else {
    res.status(404).send('requested todo does not exist');
  }

  // res.send(`you requested for todo with id: ${todosId}`);
});

// Post /todos
app.post('/todos', (req, res) => {
  let body = _.pick(req.body, "description", "completed");

  // Validating 
  if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
    return res.status(400).send("Failed validation test")
  }

  //  Add Id to field and increment by one
  body.id = todoNextId++;
  body.description = body.description.trim();
  
  // Push new todo to todos
  todos.push(body);
  
  res.json(body);
  console.log(JSON.stringify(todos, null, 2));
});

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}!`);
});
