const express = require('express');
const Emp = require('../models/Employee');
const router = express.Router();


/**Returns all employee entries */
router.get('/', async (req, res) => {
    try {
        const allEmps = await Emp.find();
        res.json(allEmps);
    }catch (err){
        res.json({ message: err});
    }
});


/**Enter new employee entry */
router.post('/', async (req, res) => {
    const emp = new Emp({
        name: req.body.name,
        jobTitle: req.body.jobTitle,
        salary: req.body.salary,
        email: req.body.email
    });

    try{
        const savedEmp = await emp.save()
        res.json(savedEmp);
    } catch(err){
        res.json({ message: err});
    }
});


/**Return a specific employee entry */
router.get('/:empID', async (req, res) => {
    try {
        const specEmp = await Emp.findById(req.params.empID);
        res.json(specEmp);

    }catch (err) {
        res.json({message: err});
    }
})


/**Delete employee entry */
router.delete('/:empID', async (req, res) => {
    try{
        const deletedEmp = await Emp.remove({_id: req.params.empID});
        res.json(deletedEmp);
    } catch(err){
        res.json({ message: err});
    }
})


/**Update employee entry */
router.patch('/:empID', async (req, res) => {
    try{
        const updatedEmp = await Emp.updateOne(
            {_id: req.params.empID}, 
            {$set: {salary: req.body.salary}}
            );
        res.json(updatedEmp);
    } catch(err){
        res.json({ message: err});
    }
})

module.exports = router;