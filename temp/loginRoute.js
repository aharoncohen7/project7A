
const express = require("express");
const Joi = require("joi");
const getUser = require("../db/users");
const db = require("../db/login");
const loginRoute = express.Router();

// // אימות
async function authenticate(req, res, next){
    const auth = req.headers.auth;
    const [username, password] = auth.split(':');
    console.log(username, password);
    try{
        const check = await db.checkUser(username, password);
        if(!check){
           res.status(400).send()
           return;
        }
        const user = await getUser(check)
        req.user = user;
        console.log("next");
        next();
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
   }


// // אימות
// async function authenticate(req, res, next) {
//     const username = req.body.username;
//     const password = req.body.password;
//     const check = await db.checkUser(username, password);
//     if (!check) {
//         res.status(400).send()
//         return;
//     }
//     const user = await getUser(check)
//     req.user = user;
//     next();
// } catch (err) {
//     console.log(err);
//     res.status(500).send();
// }
//

// לוגין
loginRoute.post("/",async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

    try {
        const check = await db.checkUser(username, password);
        if (!check) {
            res.status(404).send()
            return;
        }
        const user = await getUser(check)
        if (user) {
            res.json(user);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});


//קבלת משתמש מסויים - לא זמין
loginRoute.get("/:id",authenticate, async (req, res) => {
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







// //קבלת משתמש מסויים - לא זמין
// loginRoute.get("/:id", async (req, res) => {
//     try {
//         const user = await getUser(req.params.id);
//         if (user) {
//             res.json(user);
//             return;
//         }
//         res.status(404).send();
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

module.exports = loginRoute;