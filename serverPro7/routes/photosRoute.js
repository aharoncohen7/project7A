const express = require("express");
const Joi = require("joi");
const db = require("../db/photos");
const {checkUser} = require('../db/login');
const getUser = require('../db/users');
const photosRoute = express.Router();
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

// קבלת תמונות מאלבום
photosRoute.get("/:albumId", async (req, res) => {
    // if(req.user.id===parseInt(req.params.postId)){
    try {
        const album = await db.getPhotos(req.params.albumId);
        if (album) {
            res.json(album);
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

// קבלת תמונה מסויימת
photosRoute.get("/:albumId", async (req, res) => {
    try {
        const post = await db.getCertainPhoto(req.params.albumId);
        if (photo) {
            res.json(photo);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

// עריכת תמונה
photosRoute.put("/:photoId", async (req, res) => {
        try {
            const photo = await db.editPhoto(req.params.photoId, req.body.title, req.body.url);
            if (photo) {
                res.json(photo);
                return;
            }
            res.status(404).send();
        } catch (error) {
            res.status(500).send();
        }
    }
);

// מחיקת תמונה
photosRoute.delete("/:photoId", async (req, res) => {
    try {
        const deletedphoto = await db.deletePhoto(req.params.photoId);
        if (deletedphoto) {
            res.json(deletedphoto);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = photosRoute;
