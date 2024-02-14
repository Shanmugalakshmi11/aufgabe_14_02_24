const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// Simulated database for todos
let todos = [
  { id: 1, task: "Complete project", completed: false },
  { id: 2, task: "Review code", completed: true },
  { id: 3, task: "QA", completed: true },
  { id: 4, task: "Developer Team", completed: false },
];

const todosRouter = Router();

// GET - /todos/all: Return all todos
todosRouter.get("/all", (req, res) => {
  res.json({ todos });
});
//  ***GET REQUESTS***
// Return todos from a specific user
todosRouter.get("/id", (req, res) => {
  const todosId = parseInt(req.query.todosId);
  if (!todosId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const usertodos = todos.find((item) => item.id === todosId);
  res.status(StatusCodes.OK).json({ profile: usertodos });
});

//  ***PUT REQUESTS***
todosRouter.put("/update", (req, res) => {
  const { todostask, todosId } = req.body;

  const currenttask = todos.find((item) => item.id === todosId);
  currenttask.todostask = todostask;

  const deletedProfiles = todos.filter((item) => item.id !== todosId);
  deletedProfiles.push(currenttask);

  profiles = deletedProfiles;

  res.json({ updatedProfile: currenttask });
});

//  ***DELETE REQUESTS***
todosRouter.delete("/delete", (req, res) => {
  const { todosId } = req.body;

  const deletedProfiles = todos.filter((item) => item.id !== todosId);
  todos = deletedProfiles;

  res.json({ deletedUserId: todosId });
});

// PUT - /todos/mark: Mark todo completed
todosRouter.put("/mark", (req, res) => {
  const { taskId } = req.body;
  const todoToMark = todos.find((todo) => todo.id === taskId);

  if (!todoToMark) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todoToMark.completed = true;
  res.json({ markedTodo: todoToMark });
});

// POST - /todos/create: Create todo
todosRouter.post("/create", (req, res) => {
  const { task, userId } = req.body;
  const newTodo = { id: todos.length + 1, task, completed: false, userId };

  todos.push(newTodo);
  res.json({ createdTodo: newTodo });
});

// GET - /todos/byuserid: All todos from a user
todosRouter.get("/byuserid", (req, res) => {
  const userId = parseInt(req.query.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  const userTodos = todos.filter((todo) => todo.userId === userId);
  res.json({ userTodos });
});
module.exports = { todosRouter };
