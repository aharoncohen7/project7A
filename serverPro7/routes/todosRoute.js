const express = require("express");
const Joi = require("joi");
const db = require("../db/todos");
const {checkUser} = require('../db/login');
const getUser = require('../db/users');
// import axios from "axios";
// import { log } from "console";


const todosRoute = express.Router();

// אימות
async function authenticate(req, res, next){
     const auth = req.headers.auth;
     const [username, password] = auth.split(':');
     const check = await checkUser(username, password);
     if(!check){
        res.status(400).send()
        return;
     }
     const user = await getUser(check)
     req.user = user;
     next();
    }

    //  כל כל טודוס משתמש
todosRoute.get("/:userId", async (req, res) => {
    // if(req.user.id===parseInt(req.params.userId)){
    try {
        const todos = await db.getTodosByUserId(parseInt(req.params.userId));
        if (todos) {
            res.json(todos);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
// }
    // else{
    //     res.status(404).send();
    // }
});

// קבלת טודו מסויים
todosRoute.get("/:todoId/", async (req, res) => {
    try {
        const todo = await db.getCertainTodo(req.params.todoId);
        if (todo) {
            res.json(todo);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

// חיפוש לפי כותרת
todosRoute.get("/searchTodos/:userId/:str", async (req, res) => {
    try {
        const todos = await db.searchTodo(req.params.userId, req.params.str);
        if (todos) {
            res.json(todos);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

// חיפוש לפי מזהה
todosRoute.get("/searcById/:userId/str", async (req, res) => {
    try {
        const todos = await db.searcById(req.params.userId, req.params.str);;
        if (todos) {
            res.json(todos);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

// הוספת חדש
todosRoute.post("/", async (req, res) => {
    try {
        const newTodo = await db.addTodo(req.body.userId, req.body.title);
        if (newTodo) {
            res.status(201).json(newTodo);
            return;
        }
        res.status(400).send();
    } catch (error) {
        res.status(500).send();
    }
});

// עריכה
todosRoute.put("/:todoId",
    // handleWrongId,
    // handleBodyValidation,
    async (req, res) => {
        try {
            const todo = await db.editTodo(req.params.todoId, req.body.title);
            if (todo) {
                res.json(todo);
                return;
            }
            res.status(404).send();
        } catch (error) {
            res.status(500).send();
        }
    }
);

// החלפה מצב ביצוע
todosRoute.put("/updateCompleted/:todoId",
    // handleWrongId,
    // handleBodyValidation,
    async (req, res) => {
        try {
            const todo = await db.updateCompleted(req.params.todoId);
            if (todo) {
                res.json(todo);
                return;
            }
            res.status(404).send();
        } catch (error) {
            res.status(500).send();
        }
    }
);

// מחיקה
todosRoute.delete("/:todoId",  async (req, res) => {
    try {
        const deletedTodo = await db.deleteTodo(req.params.todoId);
        if (deletedTodo) {
            res.json(deletedTodo);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});


module.exports = todosRoute;




// function handleWrongId(req, res, next) {
//     const idSchema = {
//         todoId: Joi.number().min(1),
//         userId: Joi.number().min(1)
//     }
//     const { error } = idSchema.validate(req.params.id);
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//     next();
// }




// function handleBodyValidation(req, res, next) {
//     const userSchema = Joi.object({
//         name: Joi.string().min(2),
//         age: Joi.number().min(1),
//     });
//     const { error } = userSchema.validate(req.body);
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//     next();
// }




// const getUsers2 = async () => {
//   const response = await axios.get("/api/users");
//   console.log(response.data);
//   return response.data;
// };