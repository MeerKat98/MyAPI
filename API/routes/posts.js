const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Returns all Books
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err});
    }
});

//Submits a book
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        author: req.body.author
    });
    try {
 
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }

});

//Find specific book
router.get('/:title', async ( req,res ) => {
    try {
        const post = await Post.findById(req.params.title);
        res.json(post);
    } catch (err) {
        res.json({ message: err});
    }
});


//Delete a specific book
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postId });
        res.json(removedPost);
    } catch(err) {
        res.json({ message: err});
    }
}); 


//Update Book
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({_id: req.params.postId }, { $set: {title: req.body.title} });
        res.json(updatedPost);
    } catch(err) {
        res.json({ message: err});
    }
})
module.exports = router;