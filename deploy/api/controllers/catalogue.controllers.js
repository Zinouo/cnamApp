const db = require('../models'); 
const Produit = db.produit; 
const Op = db.Sequelize.Op;

exports.get = (req, res) => {
    const searchTerm = req.query.search;
    
    let condition = searchTerm ? { titre: { [Op.iLike]: `%${searchTerm}%` } } : null;

    Produit.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving products."
            });
        });
};

