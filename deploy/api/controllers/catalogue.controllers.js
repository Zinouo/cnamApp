exports.get = (req, res) => {
	const catalogue = [
		{ ref: "GOT101", titre: "Valyrian Steel Sword", prix: 1000 },
		{ ref: "GOT102", titre: "Handcrafted Direwolf Cloak", prix: 150 },
		{ ref: "GOT103", titre: "Dothraki War Horse", prix: 500 },
		{ ref: "GOT104", titre: "Wildfire Jar", prix: 700 },
		{ ref: "GOT105", titre: "Dragon Glass Dagger Set", prix: 300 },
		{ ref: "GOT106", titre: "Iron Throne Styled Chair", prix: 1200 },
		{ ref: "GOT107", titre: "Winterfell Ale Keg", prix: 60 },
		{ ref: "GOT108", titre: "Lannister Gold Coin", prix: 200 },
		{ ref: "GOT109", titre: "Raven-Carried Scroll Delivery Service", prix: 20 },
		{ ref: "GOT110", titre: "Map of The Known World", prix: 40 }
	];
	
    const searchTerm = req.query.search;

    let filteredCatalogue = catalogue;

    if (searchTerm) {
        filteredCatalogue = catalogue.filter(item => 
            item.titre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.send(filteredCatalogue);
};
