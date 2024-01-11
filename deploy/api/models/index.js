const { Sequelize } = require ("sequelize");
const { BDD }  = require ('../config');
const sequelize = new Sequelize(`postgres://${BDD.user}:${BDD.password}@${BDD.host}/${BDD.bdname}`
,{
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
      native:true
    },
    define:  {
    	timestamps:false
    }
  });

  const db = require('../models');

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.utilisateur = require("./utilisateur.model.js")(sequelize, Sequelize);
db.produit = require('./produit.model.js')(sequelize, Sequelize);
db.commande = require('./commande.model.js')(sequelize, Sequelize);
db.commandeItem = require('./commandeItem.model.js')(sequelize, Sequelize);

db.commande.hasMany(db.commandeItem, { as: 'items' });
db.commandeItem.belongsTo(db.commande, {
  foreignKey: 'commandeId',
  as: 'commande'
});

db.produit.hasMany(db.commandeItem, { as: 'commandeItems' });
db.commandeItem.belongsTo(db.produit, {
  foreignKey: 'produitId',
  as: 'produit'
});


module.exports = db;
