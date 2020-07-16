const express = require('express');

const PostDb = require('../posts/postDb.js')


const router = express.Router();

router.get('/', (req, res) => {
  PostDb.get()
  .then(posts =>
    res.status(200).json(posts))
  .catch(err =>
    res.status(500).json({ errormessage: 'Could not get posts'}))
});

router.get('/:id', validatePostId,(req, res) => {
  const { id } = req.params
  PostDb.getById(id)
    .then(posts => {
      if(posts.text.length > 0){
      res.status(200).json(posts)}})
    .catch(err => 
      res.status(500).json({ errormessage: "Could not find posts with that ID"}))
});

router.delete('/:id', validatePostId,(req, res) => {
  const { id } = req.params;
  PostDb.getById(id)
    .then(post =>{
      if(post.id){
        PostDb.remove(post.id)
        .then(response => 
          res.status(200).json({ message: `${response} post has been removed!`}))
        .catch(err =>
        res.status(500).json({ errormessage: 'The post could not be found and is not removed.'})
        )} else { res.status(404).json({errormessage: "Could not find the post."})}
      }
        )
    .catch(err =>
      res.status(500).json({ errormessage:'Could not find that post.'}))
});

router.put('/:id', validatePostId,(req, res) => {
  const { id } = req.params;
  const body = req.body;

  PostDb.update(id, body)
    .then(num => 
      res.status(200).json({ message:`${num} post has been updated successfully!`}))
    .catch(err =>
      res.status(500).json({ message: 'The post has not been updated!'}))
});

// custom middleware

function validatePostId(req, res, next) {
 const { id } = req.params;
 PostDb.getById(id)
  .then(post => {
    if(post.id){
      next();
    }
  })
  .catch(err =>
    res.status(500).json({errormessage: 'It seems as though this post is not found!'}))
}

module.exports = router;
