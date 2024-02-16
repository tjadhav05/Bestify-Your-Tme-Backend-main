const { response } = require("express");
const db = require("../models");
const Questionbank = db.questionbank;
const Option = db.option;

//Create User
exports.createQuestion = (req, res) => {
    let qbank;
    //Get all options from admin
    const OptionData = {
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        optionC: req.body.optionC,
        optionD: req.body.optionD,
    }

    //get Question from admin 
    const Question = {
        questid: req.body.questid,
        quizname: req.body.quizname,
        question: req.body.question,
        category: req.body.category,
        ans: req.body.ans,
        marks: req.body.marks,
        timer: req.body.timer,
    };

    // save question in database
    Questionbank.create(Question)
        .then(data => {
            res.send(data);
            qbank = data;
            return Option.create(OptionData);
        })
        .then(opt => {
            qbank.setOption(opt)
            res.send(opt);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};


//get all questions which stored in database
exports.getAllQuestions = (req, res) => {
    Questionbank.findAll({
        attributes: ['questid', 'quizname', 'question', 'category'],
        include: [{
            model: Option,
            where: { fk_questid: db.Sequelize.col('questid') },
            attributes: ['optionA', 'optionB', 'optionc', 'optionD'],
        }]
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



exports.updateQuestions = (req, res) => {
    const questionId=req.body.questId
    

   

        optionA= req.body.optionA,
        optionB= req.body.optionB,
        optionC=req.body.optionC,
        optionD= req.body.optionD,

    
      
        quizname= req.body.quizname,
        question= req.body.question,
        category= req.body.category,
        ans= req.body.ans,
        marks= req.body.marks,
        timer= req.body.timer


    Questionbank.update(
    {
        quizname:quizname,
        question: question,
        category: category,
        ans: ans,
        marks: marks,
        timer: timer,
    
    },
   {where: {questId: questionId}}
)
  .then(data => {
    res.status(200).send(data);
   return Option.update({
        optionA: optionA,
        optionB: optionB,
        optionC: optionC,
        optionD: optionD
    },
    {where: {fk_questid: questionId}})
})
.catch(err => {
    res.status(500).send({
        message: "Error retrieving user with id=" + err
    });
});
 
};

exports.getQuetionByid = (req, res) => {
    const questid = req.params.questid;
    Questionbank.findByPk(questid, {
        attributes: ['questid', 'quizname', 'question', 'category', 'ans', 'marks', 'timer'],
        include: [{
            model: Option,
            where: { fk_questid: db.Sequelize.col('questid') },
            attributes: ['optionA', 'optionB', 'optionc', 'optionD'],
        }]
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving user with id=" + err
        });
    });
};

exports.getQuetionByCategory = (req, res) => {

    const questcat = req.params.category;

    Questionbank.findAll(
        {
            where: {
                category: questcat
            },
            attributes: ['questid', 'quizname', 'question', 'category', 'ans', 'marks', 'timer'],
            include: [{
                model: Option,
                where: { fk_questid: db.Sequelize.col('questid') },
                attributes: ['optionA', 'optionB', 'optionc', 'optionD'],
            }]
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

exports.getQuetionByQuizName = (req, res) => {
    const quiz = req.params.quizname;
    Questionbank.findAll({
        where: {
            quizname: quiz
        },
        attributes: ['questid', 'quizname', 'question', 'category', 'ans', 'marks', 'timer'],
        include: [{
            model: Option,
            where: { fk_questid: db.Sequelize.col('questid') },
            attributes: ['optionA', 'optionB', 'optionc', 'optionD'],
        }]
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

exports.getQuetionGroupByQuizName = (req, res) => {
    Questionbank.findAll({
        attributes: ['quizname', 'category'],
        group: ['quizname']
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

exports.getAllQuetionGroupByCategory = (req, res) => {

    Questionbank.findAll({
        attributes: ['category'],
        group: ['category']
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


exports.getQuetionByQuizCategory = (req, res) => {
    const catg = req.body.category;
    Questionbank.findAll({
        where: {
            category: catg
        },
        attributes: ['questid', 'quizname', 'question', 'category', 'ans', 'marks', 'timer'],
        group: ['quizname'],
        include: [{
            model: Option,
            where: { fk_questid: db.Sequelize.col('questid') },
            attributes: ['optionA', 'optionB', 'optionc', 'optionD'],
        }]
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + err,
                error: err
            });
        });
};



exports.deleteQuestionById = (req, res) => {
    const questid = req.params.questid;
    if (!req.params.questid) {
        res.status(400).send({
            message: "userId can not be empty!"
        });
        return;
    }
    Questionbank.destroy({
        where: { questid: questid },
        attributes: ['questid', 'quizname', 'question', 'category', 'ans', 'marks', 'timer'],
        include: [{
            model: Option,

            where: { fk_questid: db.Sequelize.col('questid') },
            attributes: ['optionA', 'optionB', 'optionc', 'optionD'],
        }]
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "user was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${questid}. Maybe user was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + questid,
                error: err
            });
        });



};

exports.deleteQuestionByQuizname = (req, res) => {
    const quizname = req.body.quizname;
    if (!req.body.quizname) {
        res.status(400).send({
            message: "userId can not be empty!"
        });
        return;
    }
    Questionbank.destroy({
        where: { quizname: quizname },
        attributes: ['questid', 'quizname', 'question', 'category', 'ans', 'marks', 'timer'],
        include: [{
            model: Option,

            where: { fk_questid: db.Sequelize.col('questid') },
            attributes: ['optionA', 'optionB', 'optionc', 'optionD'],
        }]
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "user was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete user with quizname=${quizname}. Maybe user was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with quizname=" + quizname,
                error: err
            });
        });

};