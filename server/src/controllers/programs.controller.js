const db = require("../models");
const Programs = db.programs;
const Visits = db.visits;
const { sequelize } = require("../models");

exports.getAllPrograms = (_req, res) => {
    Visits.increment({total: 1}, { where: { id: "12345" } })
    Programs
    .findAll({ attributes: [['id','value'],['name','label'],'is_major']})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}

// return 2 Result Sets - 0: program info, 1: all courses in programs
exports.getProgram = (req, res) => {
    const id = req.body.id;
    sequelize.query(
        'CALL get_program(:id)', 
        {
            replacements: {id: id}, 
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(data => {
        res.send({
            program: Object.values(data[0]), 
            departments: Object.values(data[1]).map(row => row.department)
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}
