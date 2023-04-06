var express = require('express');
var router = express.Router();

const uniqid = require('uniqid');


router.post('/upload', async (req, res) => {
    const photoPath = `./tmp/${uniqid()}.jpg`; // chemin de la photo 
    const resultMove = await req.files.photoFromFront.mv(photoPath); // 

    const cloudinary = require('cloudinary').v2;
    const fs = require('fs');

    // si undefined = false donc si c'est true 
    if (!resultMove) {
        const resultCloudinary = await cloudinary.uploader.upload(photoPath); // envoie la photo dans le cloud 
        fs.unlinkSync(photoPath); // fonction qui supprime la photo dans le local 
        res.json({ result: true, url: resultCloudinary.secure_url });
    } else {
        res.json({ result: false});
    }

});



module.exports = router;
