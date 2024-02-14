const { Router } = require("express");
const { AuthRouter } = require("./auth");
const { UserRouter } = require("./user");
const { todosRouter } = require("./todos");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/user", UserRouter);
AppRouter.use("/todos", todosRouter);

module.exports = { AppRouter };
