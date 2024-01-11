module.exports = (sequelize, Sequelize) => {
    const Commande = sequelize.define("commande", {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        utilisateurId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'utilisateurs',
                key: 'id'
            }
        },
        coûtTotal: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        },
        // Add any other fields that you need for the commande
    });

    return Commande;
};
