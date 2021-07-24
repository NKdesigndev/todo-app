const Task = require('../models/Task');

module.exports.index = async (req, res) => {
	await Task.findAll()
            .then((data) => res.status(200).send({"data": data}))
            .catch((err) => {
                    res.status(500).send({
                    message: err.message || "Some error occurred while retrieving tutorials."
                });
            });
}

module.exports.create = async (req, res) => {

    if(!req.body.title) {
        req.status(400).send({
            message: 'Title is requried'
        });
        return;  
    }

    const task = {
        title : req.body.title,
        description : req.body.description
    };

    await Task.create(task)
            .then((data) => {
                res.send(data)
            })
            .catch((err)=>  {
                res.status(500).send({'message' : err.message || 'Server Error'});
            });
}