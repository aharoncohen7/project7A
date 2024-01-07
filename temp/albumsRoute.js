const express = require("express");
const Joi = require("joi");
const db = require("../db/albums");
const {checkUser} = require('../db/login');
const getUser = require('../db/users');

const albumsRoute = express.Router();

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

// קבלת כל אלבומי משתמש
albumsRoute.get("/:userId", async (req, res) => {
    // if(req.user.id===parseInt(req.params.userId)){
    try {
        const albums = await db.getAlbumsByUserId(req.params.userId);
        if (albums) {
            res.json(albums);
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

// קבלת אלבום מסויים
albumsRoute.get("/:albumId/", async (req, res) => {
    try {
        const album = await db.getCertainAlbum(req.params.albumId);
        if (album) {
            res.json(album);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

// חיפוש לפי כותרת
albumsRoute.get("/searchAlbums/:userId/:str", async (req, res) => {
    try {
        const albums = await db.searchAlbums(req.params.userId, req.params.str);
        if (albums) {
            res.json(albums);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

// חיפוש לפי מזהה
albumsRoute.get("/searcById/:userId/str", async (req, res) => {
    try {
        const albums = await db.searcById(req.params.userId, req.params.str);;
        if (albums) {
            res.json(albums);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});






module.exports = albumsRoute;
