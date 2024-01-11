module.exports = (sequelize, Sequelize) => {
  const Produit = sequelize.define("produit", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    prix: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    categorie: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    },
  });

  return Produit;
};
