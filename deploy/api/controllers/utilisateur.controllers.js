const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
  }

// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const { login, password } = req.body;

  // Specific credentials to check against
  const validLogin = "emma";
  const validPassword = "toto";

  if (login === validLogin && password === validPassword) {
    const uuid = uuidv4();
    const utilisateur = {
      nom: "Martin",
      prenom: "Jean",
      login: "emma",
      email: "martin.jean@gmail.com",
      password: "toto",
      id: uuid
    };

    const user = {
      id: utilisateur.id,
      name: utilisateur.nom,
      email: utilisateur.email
    };

    let accessToken = generateAccessToken(user);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    console.log(accessToken);
    res.send(utilisateur);
  } else {
    // Send an appropriate response if login credentials are invalid
    res.status(401).send("Invalid login credentials");
  }
};
 



