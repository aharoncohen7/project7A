const express = require("express");
const Joi = require("joi");
const db = require("../db/photos");
const IAM = require('../db/monitoring');

const photosRoute = express.Router();

// Get photos from a specific album
photosRoute.get("/:albumId", IAM.validationParams,async (req, res) => {
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

});

// get certain image
photosRoute.get("/:photoId",IAM.validationParams, async (req, res) => {
    try {
      
        const photo = await db.getCertainPhoto(req.params.photoId);
        if (photo) {
            res.json(photo);
            return;
        }
        res.status(404).send();
       
    } catch (error) {
        res.status(500).send();
    }
});

// Image editing
photosRoute.patch("/:photoId",IAM.validationParams, async (req, res) => {
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

// Deleting images 
photosRoute.delete("/:photoId",IAM.validationParams, async (req, res) => {
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
