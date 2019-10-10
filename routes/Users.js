const config = require('config');
const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {copyDefaultCategoriesTable} = require('../queries/registrationMethods');
const {paymentMethods, expenceCategories, incomeCategories} = require('../queries/registrationQueries');
const User = require('../models/User');
users.use(cors());

users.post('/register', async (req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if(!user){
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                userData.password = hash;
                user = await User.create(userData); 
                copyDefaultCategoriesTable(user, paymentMethods);
                copyDefaultCategoriesTable(user, expenceCategories); 
                copyDefaultCategoriesTable(user, incomeCategories);                          
                res.json({status: `${user.email} registered!`});   
            });            
        } else {
            throw new Error("User already exists!");
        }        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

users.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: ['id', 'email', 'username', 'password'],
            where: {
                email: req.body.email
            }
        });
        const { id, email, username } = user.dataValues;
        if(user && await bcrypt.compare(req.body.password, user.password)){
            let token = jwt.sign({ id, email, username }, process.env.SECRET_KEY);
            res.send(token);
        } else {
            throw new Error("Incorrect email or password");
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = users;
