const db = require("../models"); // models path depend on your structure
const imageUrl = db.image;

//Add Image Url
exports.AddImageUrl = (req, res) => {
    const Image = {
        imgurl: req.body.imgurl,
        quizname: req.body.quizname,
    };

    // Save user in the database
    imageUrl.create(Image)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ImageUrl"
            });
            res.status(404).send({
                message:
                    err.message || "Some error occurred while creating the ImageUrl."
            })
        });
};


//Get image Url By quiz name
exports.getImageUrlByquizName = (req, res) => {

    const quizname = req.body.quizname;

    imageUrl.findAll({
        where: { quizname: quizname },
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + err
            });
        });
};
