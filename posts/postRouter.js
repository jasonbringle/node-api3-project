const express = require('express');

const PostDb = require('../posts/postDb.js');
const UserDb = require('../users/userDb.js')


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
    .then(post => {
      if(post.text.length > 0){
      res.status(200).json(post)}{
        res.status(400).json({message: "No posts could be found."})
      }})
    .catch(err => 
      res.status(500).json({ errormessage: "Could not find posts with that ID"}))
});

router.delete('/:id', validatePostId,(req, res) => {
  const { id } = req.params;
  PostDb.remove(id)
        .then(response => 
          {
            if(response == 1){
              res.status(200).json({ message: `${response} post has been removed!`})
            }else{
              res.status(400).json({ message: `The post is not found and is not removed!`})
              }})
        .catch(err =>
          res.status(500).json({ errormessage: 'There was an error and the post could not be found and is not removed.'})
          )
    }
  );

router.put('/:id', validatePostId, validatePost,validateBody, validateUserId, (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body)

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
      .then(post =>{ 
        if(post !== undefined){
          next()
        }else {
          res.status(404).json({ message: "Post could not be located."})
        }})
      .catch(err =>
      res.status(500).json({ errormessage: "Retrieving the post failed"}))
}

function validatePost(req, res, next) {
  const { id } = req.params
  const body = req.body
  const keys = Object.keys(body)
  console.log(body.id)
  console.log(id)

  if(body.id = id){if (keys.length == 0) {
    res.status(400).json({ message: "missing post data" })
  } else if (!body.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next();
  }
  } else{
    res.status(404).json({ message: 'User id in post and url do not match'})
  }
}


function validateBody(req, res, next) {
  const body = req.body
  const keys = Object.keys(body)

    if(keys.length == 0){ 
      res.status(400).json({ message: "missing user data" })
    }else if(!body.text){
      res.status(400).json({ message: "missing required text field" } )
    }{
      next();
    }
}

function validateUserId(req, res, next) {
  const body = req.body
  const userKey = body.user_id
  
    if(userKey){
    UserDb.getById(body.user_id)
      .then(user =>{
        if(user){
          next()
        }else {
          res.status(404).json({ errormessage: "The   user for this comment cannot be found."})
        }
      })
  }else { 
    res.status(400).json({ errormessage:" There is no user ID"})
  }

}





module.exports = router;
