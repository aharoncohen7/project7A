const express = require("express");
const Joi = require("joi");
const getUser = require("../db/users");
const usersRoute = express.Router();

//קבלת משתמש מסוים
usersRoute.get("/:id", async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        if (user) {
            res.json(user);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});



// וולידציה 
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


// function handleWrongId(req, res, next) {
//     const idSchema = Joi.number().min(1);
//     const { error } = idSchema.validate(req.params.id);
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//     next();
// }

module.exports = usersRoute;
