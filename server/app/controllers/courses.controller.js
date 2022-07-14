const { Sequelize } = require("../models");
const db = require("../models");
const Courses = db.courses;

// Search Courses that match search query
exports.findAll = (req, res) => {
    let id = "";
    let condition ="";

    // Use LIKE if id contains special character
    if(req.query.id.indexOf("\&") > -1) {
        id = req.query.id + "%";
        condition = "id LIKE :id";
    }
    // USE FULLTEXT SEARCH to find courses in courses table
    else {
        req.query.id.split(" ").forEach((text,index) => { 
            if (text.trim().length > 0) {
                if(index === 0)
                    id += "+" + text;
                else 
                    id+= " +" + text;
            }
        });
        id += "*";

        // Need to config innodb_ft_min_token_size to 1 to work properly
        condition = 'MATCH(id) AGAINST (:id IN BOOLEAN MODE)';
    }

    Courses.findAll({ 
        attributes: ['id'],
        where: Sequelize.literal(condition),
        replacements: {
            id: id,
            queryId: req.query.id
        }
        }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving courses."
        })
    })
  
};

// Find Course with course id
exports.findOne = (req, res) => {
    const id = req.query.id;
    Courses.findByPk(id).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving course with id=" + id
        });
    });
};