const express = require("express");
const db = require("../db/albums");
const IAM = require('../db/monitoring');
const albumsRoute = express.Router();


// Get all user albums
albumsRoute.get("/:userId",IAM.validationParams, async (req, res) => {
    try {
        if(req.user.id===parseInt(req.params.userId)){
        const albums = await db.getAlbumsByUserId(req.params.userId);
        if (albums) {
            res.json(albums);
            return;
        }
        res.status(404).send();
    }
    else{
        res.status(400).send("you are not allowed to get this album");
    }
    } catch (error) {
        res.status(500).send();
    }

});

// Get a specific album
albumsRoute.get("/:albumId/",IAM.validationParams, async (req, res) => {
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

// Search by title
albumsRoute.get("/searchAlbums/:userId/:str",IAM.validationParams, async (req, res) => {
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

// Search by ID
albumsRoute.get("/searcById/:userId/str",IAM.validationParams, async (req, res) => {
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
