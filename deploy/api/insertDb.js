const db = require('./models'); 
const Produit = db.produit;

const catalogue = [
    { titre: "Valyrian Steel Sword", prix: 1000, image: "https://static.wikia.nocookie.net/ironthroneroleplaygame/images/4/43/Oathkeeper.jpg", categorie: "Armes", stock: 10 },
    { titre: "Handcrafted Direwolf Cloak", prix: 150, image: "https://media.glamour.com/photos/5992f51673e5c76b06a02018/master/pass/b5fba2f1f981564db877dfdca34ed1ede382210df5fabbcd798fe7785f3f2a0b.jpg", categorie: "Vêtements", stock: 20 },
    { titre: "Dothraki War Horse", prix: 500, image: "https://static.wikia.nocookie.net/gameofthrones/images/6/67/S6_Horse_Statues.png", categorie: "Animaux", stock: 5 },
    { titre: "Dragon Egg", prix: 10000, image: "https://i0.wp.com/wikiofthrones.com/wp-content/uploads/2022/09/three-dragons-eggs-8356978-e1664382678339.jpg?resize=740%2C416&ssl=1", categorie: "Animaux", stock: 3 },
    { titre: "Dragon Glass", prix: 100, image: "https://static.wikia.nocookie.net/gameofthrones/images/d/d8/Dragonglass.jpg", categorie: "Armes", stock: 100 },
    { titre: "Hand of the King Pin", prix: 10, image: "https://i.pinimg.com/736x/9d/ad/3a/9dad3af1eff514913f544d6de2a2ac4c.jpg", categorie: "Accessoires", stock: 50 }
];

Produit.bulkCreate(catalogue)
    .then(() => console.log("Produits initiaux ajoutés avec succès"))
    .catch(err => console.error("Erreur lors de l'ajout des produits initiaux", err));
