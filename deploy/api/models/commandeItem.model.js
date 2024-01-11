module.exports = (sequelize, Sequelize) => {
    const CommandeItem = sequelize.define("commandeItem", {
        orderId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'commandes', 
                key: 'id'
            }
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'produits',
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: { min: 1 } 
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: { min: 0 } 
        },

    });

    return CommandeItem;
};