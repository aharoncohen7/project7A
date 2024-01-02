const express = require("express");
const {checkUser} = require('../db/login');
const getUser = require('../db/users');
const Joi = require("joi");
const db = require("../db/comments");
const commentsRoute = express.Router();


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
// קבלת כל התגובות לפוסט מסוים
commentsRoute.get("/:postId", async (req, res) => {
    // if(req.user.id===parseInt(req.params.postId)){
    try {
        const comments = await db.getCommentsByUserId(req.params.postId);
        if (comments) {
            res.json(comments);
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
// קבלת תגובה מסוימת
commentsRoute.get("/:commentId/", async (req, res) => {
    try {
        const comment = await db.getCertainComment(req.params.commentId);
        if (comment) {
            res.json(comment);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});
// הוספת תגובה
commentsRoute.post("/", async (req, res) => {
    try {
        const newComment = await db.addPost(req.body.postId, req.body.name, req.body.email, req.body.body);
        if (newComment) {
            res.status(201).json(newComment);
            return;
        }
        res.status(400).send();
    } catch (error) {
        res.status(500).send();
    }
});
//מחיקת תגובה
commentsRoute.delete("/:commentId", async (req, res) => {
    try {
        const deletedComment = await db.deleteComment(req.params.commentId);
        if (deletedComment) {
            res.json(deletedComment);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});


module.exports = commentsRoute;