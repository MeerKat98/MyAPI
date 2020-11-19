const express = require('express');
const Client = require('../models/Client');
const router = express.Router();


/**Get list of clients */
router.get('/', async (req, res) => {
    try {
        const allClients = await Client.find();
        res.json(allClients);
    } catch (err){
        res.json({ messege: err});
    }
});


/**Enroll new Client*/
router.post('/', async (req, res) => {
    const client = new Client({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const savedClient = await client.save();
        res.json(savedClient);
    } catch (err){
        res.json({ messege: err});
    }
});


/**Get specific user details*/
router.get('/:clientID', async (req, res) => {
    try {
        const specClient = await Client.findById(req.params.clientID);
        res.json(specClient);
    } catch (err){
        res.json({ messege: err});
    }
});


/**Update client password */
router.patch('/:clientID', async (req, res) => {
    try {
        const updatedClient = await Client.updateOne(
            {_id: req.params.clientID},
            {$set: {password: req.body.password}}
        );
        res.json(updatedClient);
    } catch (err){
        res.json({ messege: err});
    }
});


/**Terminate client account */
router.delete('/:clientID', async (req, res) => {
    try{
        const deletedClient = await Client.remove({_id: req.params.clientID});
        res.json(deletedClient);
    } catch(err){
        res.json({ message: err});
    }
});


module.exports = router;