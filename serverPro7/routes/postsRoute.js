const express = require("express");
const db = require("../db/posts");
const IAM = require('../db/monitoring');
const postsRoute = express.Router();

// Get all posts
postsRoute.get("/",  async (req, res) => {
    try {
        const posts = await db.getAllPosts();
        if (posts) {
            res.status(200).json(posts);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a particular post
postsRoute.get("/:postId/", IAM.validationParams,  async (req, res) => {
    try {
        const post = await db.getCertainPost(req.params.postId);
        if (post) {
            res.status(200).json(post);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Search by title
postsRoute.get("/searchPosts/:userId/:str", IAM.validationParams,  async (req, res) => {
    try {
        const posts = await db.searchPost(req.params.userId, req.params.str);
        if (posts) {
            res.status(200).json(posts);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Search by ID
postsRoute.get("/searcById/:userId/str", IAM.validationParams,  async (req, res) => {
    try {
        const posts = await db.searcById(req.params.userId, req.params.str);;
        if (posts) {
            res.status(200).json(posts);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Added new post
postsRoute.post("/", IAM.handleNewPost,  async (req, res) => {
    try {
        if (req.body.userId !== req.user.id) {
            res.status(400).send();
            return
        }
        const newPost = await db.addPost(req.body.userId, req.body.title, req.body.body);
        if (newPost) {
            res.status(201).json(newPost);
            return;
        }
        res.status(400).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Editing post
postsRoute.patch("/:postId", IAM.validationParams, IAM.handleEditPost,  async (req, res) => {
    try {
        const oldPost = await db.getCertainPost(req.params.postId);
        if (!oldPost){
            res.status(404).send();
            return;
        }
        if(oldPost.userId!==req.user.id) {
            res.status(400).send();
            return;
        }
        const editedPost = await db.editPost(req.params.postId, req.body.title, req.body.body);
        if (editedPost) {
            res.status(200).json(editedPost);
            return;
        }
        res.status(404).send();
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}
);

// Deleting post
postsRoute.delete("/:postId", IAM.validationParams,  async (req, res) => {
    try {
        const post = await db.getCertainPost(parseInt(req.params.postId));
        if (!post) {
            res.status(404).send();
            return;
        }
        if (req.user.id !== post.userId) {
            res.status(400).send("You are not allowed to delete this post");
            return;
        }
        const deletedPost = await db.deletePost(parseInt(req.params.postId));
        if (deletedPost) {
            res.status(200).json(deletedPost);
            return;
        }
        res.status(404).send();
        return;
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = postsRoute;
























// // אימות
// async function authenticate(req, res, next) {
//     try {
//         const auth = req.headers.auth;
//         if (!auth) {
//             res.status(400).send()
//             return;
//         }
//         const [username, password] = auth.split(':');
//         const check = await checkUser(username, password);
//         if (!check) {
//             res.status(400).send()
//             return;
//         }
//         const user = await getUser(check)
//         req.user = user;
//         next();
//     } catch (err) {
//         console.log(err);
//         res.status(500).send();
//     }
// }

// וולידציה פרמס
// function validationParams(req, res, next) {
//     const schema = Joi.number().min(1);
//     const { error } = schema.validate(req.params.postId || req.params.userId);
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return
//     }
//     next();
// };

// ולידציה פוסט חדש
// function handleNewPost(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         body: Joi.string().required(),
//         userId: Joi.number().min(1).max(10).required()
//     })
//     const { error } = schema.validate(req.body);
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//     next();
// }

// וולדיציה עריכה
// function handleEditPost(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         body: Joi.string().required(),
//     })
//     const { error } = schema.validate(req.body);
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//     next();
// }
