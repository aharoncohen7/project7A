const express = require("express");
const loginRoute = express.Router();
const IAM = require('../db/monitoring');
const db = require("../db/login");


// login
loginRoute.post("/",async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
    try {
        const check = await db.checkUser(username, password);
        if (!check) {
            res.status(404).send()
            return;
        }
        const user = await IAM.getUser(parseFloat(check));
        if (user) {
            res.json(user);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

//Get a specific user - not available
loginRoute.get("/:id",IAM.authenticate, async (req, res) => {
    console.log(req.user.id, req.params.id);
    try {
        if (parseInt(req.user.id) === parseInt(req.params.id)) {
            console.log("Success");
            res.json(req.user);
            return;
        }
        res.status(400).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


module.exports = loginRoute;