    const db = require('../models');
    const Commande = db.commande;
    const CommandeItem = db.commandeItem;
    const Produit = db.produit;

    // Function to update product stock
    async function updateStock(produitId, quantity, transaction) {
        const produit = await Produit.findByPk(produitId);
        if (!produit || produit.stock < quantity) {
            throw new Error('Insufficient stock for produit ID: ' + produitId);
        }
        produit.stock -= quantity;
        await produit.save({ transaction });
    }

    // Create an order
    exports.createOrder = async (req, res) => {
        const { utilisateurId, items } = req.body;
    
        const transaction = await db.sequelize.transaction();
    
        try {
            let totalCost = 0;
    
            // Create commande first
            const commande = await Commande.create({ utilisateurId, coûtTotal: totalCost }, { transaction });
    
            // Then process each item
            for (const item of items) {
                const produit = await Produit.findByPk(item.produitId);
                if (!produit) {
                    throw new Error('Produit not found: ' + item.produitId);
                }
                const itemCost = produit.prix * item.quantity;
                totalCost += itemCost;
    
                await updateStock(item.produitId, item.quantity, transaction);
    
                // Create CommandeItem
                await CommandeItem.create({
                    commandeId: commande.id,
                    produitId: item.produitId,
                    quantite: item.quantity,
                    prix: itemCost
                }, { transaction });
            }
    
            // Update the commande's total cost after all items are processed
            commande.coûtTotal = totalCost;
            await commande.save({ transaction });
    
            await transaction.commit();
            res.status(200).json({ message: 'Commande created successfully', commandeId: commande.id });
        } catch (error) {
            console.error('Error in creating commande:', error);
            await transaction.rollback();
            res.status(500).send({ message: error.message || 'Error creating commande' });
        }
    };
    