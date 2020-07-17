const express = require('express');

const UserDb = require('../users/userDb.js')
const PostDb = require('../posts/postDb.js')

const router = express.Router();

router.post('/', validateUser,(req, res) => {
  const body = req.body;

  UserDb.insert(body)
    .then(user => 
      res.status(200).json(user))
    .catch(err =>
      res.status(500).json({ error: "Error Adding User. Please Try Again."}))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
 const body = req.body;
 PostDb.insert(body)
  .then(post => 
    res.status(201).json(post))
  .catch(err =>
    res.status(500).json({errormessage: 'Could not get post.'}))
});

router.get('/', (req, res) => {
  UserDb.get()
  .then(users =>
    res.status(201).json(users))
  .catch(err =>
    res.status(500).json({errormessage: 'Could not get users!'}))
});

router.get('/:id',  validateUserId, (req, res) => {
  const { id } = req.params;

  UserDb.getById(id)
    .then(user => 
      res.status(200).json(user))
    .catch(err => 
      res.status(500).json({ errormessage: 'Could not get user'}))
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params
  UserDb.getUserPosts(id)
    .then(posts =>{
        res.status(200).json(posts)})
    .catch(err => 
        res.status(500).json({ errormessage: 'Could not get post from that user'}))
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  UserDb.remove(id)
    .then(num => 
      res.status(200).json(`${num} user has been eliminated`))
    .catch(err =>
      res.status(500).json({ errormessage: 'User has not been eliminated.'}))
});

router.put('/:id', validateUser,validateUserId, (req, res) => {
  const { id } = req.params;
  const body = req.body;
  
  UserDb.update(id,body)
    .then(edit =>
      res.status(200).json(`${edit} user name was edited.`))
    .catch(err =>
      res.status(500).json({ errormessage: 'User was not edited.'}))
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params
  UserDb.getById(id)
    .then(user =>{ 
      if(user){user = req.user;
        next()
      } else { 
        res.status(400).json({ message: "invalid user id sir" })}
      })
    .catch(err => 
      res.status(400).json({ message: "invalid user id" })
      );
}

function validateUser(req, res, next) {
  const body = req.body
  const keys = Object.keys(body)

    if(keys.length == 0){ 
      res.status(400).json({ message: "missing user data" })
    }else if(!body.name){
      res.status(400).json({ message: "missing required name field" } )
    }{
      next();
    }
}

function validatePost(req, res, next) {
  const body = req.body
  const keys = Object.keys(body)

  if (keys.length == 0) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  }{
    next();
  }
}

module.exports = router;
