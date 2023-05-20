const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Img = require('../models/img');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname);
    },
});


const upload = multer({storage: storage}).single('img');

const imgUpload = (req, res) => {
    upload(req, res, (err) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                message: 'Error uploading file',
                error: err
            });
        }
        else{
            console.log(req.file);
            const img = new Img({
                name: req.file.originalname,
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            });
            img.save((err, img) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        message: 'Error saving file to database',
                        error: err
                    });
                }
                else{
                    return res.status(200).json({
                        message: 'File saved to database',
                        img: img
                    });
                }
            });
        }
    });
}

const imgGet = (req, res) => {
    Img.find({}, (err, imgs) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                message: 'Error getting files',
                error: err
            });
        }
        else{
            return res.status(200).json({
                message: 'Files retrieved',
                imgs: imgs
            });
        }
    });
}

const imgGetOne = (req, res) => {
    Img.findById(req.params.id, (err, img) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                message: 'Error getting file',
                error: err
            });
        }
        else{
            return res.status(200).json({
                message: 'File retrieved',
                img: img
            });
        }
    });
}

const imgDelete = (req, res) => {
    Img.findByIdAndDelete(req.params.id, (err, img) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                message: 'Error deleting file',
                error: err
            });
        }
        else{
            return res.status(200).json({
                message: 'File deleted',
                img: img
            });
        }
    });
}

module.exports = {
    imgUpload,
    imgGet,
    imgGetOne,
    imgDelete
}