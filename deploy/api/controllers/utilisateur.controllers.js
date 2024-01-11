const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '180000s' });
  }

const db = require("../models");
const Utilisateur = db.utilisateur;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  // Validate input format
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (!pattern.test(login) || !pattern.test(password)) {
    return res.status(400).send({ message: "Login or password format is incorrect" });
  }

  Utilisateur.findOne({ where: { login: login } })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      // Compare passwords
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return res.status(500).send({ message: 'Error during password comparison.' });
        }

        if (result) {
          const userData = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            login: user.login
          };

          let accessToken = generateAccessToken(userData);
          res.setHeader('Authorization', `Bearer ${accessToken}`);
          res.send({ 
            message: "Login successful",
            user: userData,
            accessToken: accessToken
          });
        } else {
          res.status(401).send({ message: 'Invalid Password!' });
        }
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.register = (req, res) => {

  if (!req.body.nom || !req.body.email || !req.body.login || !req.body.password) {
    return res.status(400).send({ message: 'Missing required fields' });
  }
  
  const user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    adresse: req.body.adresse,
    codepostal: req.body.codepostal,
    ville: req.body.ville,
    sexe: req.body.sexe,
    login: req.body.login,
    password: req.body.password,
    telephone: req.body.telephone
  };

  bcrypt.hash(user.password, saltRounds, function(err, hash) {
    if (err) {
      return res.status(500).send({ message: 'Error hashing password.' });
    }

    user.password = hash;

  Utilisateur.create(user)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
});

};

