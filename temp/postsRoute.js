const express = require("express");
const Joi = require("joi");
const db = require("../db/posts");
const {checkUser} = require('../db/login');
const getUser = require('../db/users');
const postsRoute = express.Router();


// אימות משתמש
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

// קבלת כל הפוסטים
postsRoute.get("/", authenticate, async (req, res) => {
    if(req.user.id===parseInt(req.params.userId)){
    try {
        const posts = await db.getAllPosts();
        if (posts) {
            res.json(posts);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
}
    else{
        res.status(404).send();
    }
});

// קבלת פוסט מסוים
postsRoute.get("/:postId/", async (req, res) => {
    try {
        const post = await db.getCertainPost(req.params.postId);
        if (post) {
            res.json(post);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

// חיפוש לפי כותרת
postsRoute.get("/searchPosts/:userId/:str", async (req, res) => {
    try {
        const posts = await db.searchPost(req.params.userId, req.params.str);
        if (posts) {
            res.json(posts);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

// חיפוש לפי מזהה
postsRoute.get("/searcById/:userId/str", async (req, res) => {
    try {
        const posts = await db.searcById(req.params.userId, req.params.str);;
        if (posts) {
            res.json(posts);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

// הוספת פוסט חדש
postsRoute.post("/", async (req, res) => {
    try {
        const newPost = await db.addPost(req.body.userId, req.body.title, req.body.body);
        if (newPost) {
            res.status(201).json(newPost);
            return;
        }
        res.status(400).send();
    } catch (error) {
        res.status(500).send();
    }
});

// עריכת פוסט
postsRoute.put("/:postId",
    // handleWrongId,
    // handleBodyValidation,
    async (req, res) => {
        try {
            const post = await db.editPost(req.params.postId, req.body.title, req.body.body);
            if (post) {
                res.json(post);
                return;
            }
            res.status(404).send();
        } catch (error) {
            res.status(500).send();
        }
    }
);

// מחיקת פוסט
postsRoute.delete("/:postId", async (req, res) => {
    try {
        const deletedPost = await db.deletePost(req.params.postId);
        if (deletedPost) {
            res.json(deletedPost);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = postsRoute;
