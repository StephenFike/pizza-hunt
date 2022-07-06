const { Pizza } = require('../models');

const pizzaController = {

    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });
    },
    getPizzaById({ params }, res) {
        Pizza.findOne({_id: params.id })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });
    },
};

module.exports = pizzaController;