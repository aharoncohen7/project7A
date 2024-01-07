const express = require("express");
const IAM = require("../db/monitoring");
const usersRoute = express.Router();

//Get a specific user
usersRoute.get("/:id",IAM.validationParams, async (req, res) => {
    try {
        if(req.user.id != req.params.id){
            res.status(400).send("You are not allowed to get this user");
            return;
        }
        const user = await IAM.getUser(req.params.id);
        if (user) {
            res.json(user);
            return;
        }
        res.status(404).send("User not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = usersRoute;
