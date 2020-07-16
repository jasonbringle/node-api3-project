const express = require('express');

const UserDb = require('../users/userDb.js')
const PostDb = require('../posts/postDb.js')

const router = express.Router();

router.post('/', (req, res) => {
  const body = req.body;

  UserDb.insert(body)
    .then(user => 
      res.status(200).json(user))
    .catch(err =>
      res.status(500).json({ error: "Error Adding User. Please Try Again."}))
});

router.post('/:id/posts', validateUser, validateUserId, validatePost,(req, res) => {
 const body = req.body;

 PostDb.insert(body)
  .then(post => 
    res.status(201).json(post))
  .catch(err =>
    res.status(500).json({errormessage: 'Could not get posts.'}))
});

router.get('/', (req, res) => {
  UserDb.get()
  .then(users =>
    res.status(201).json(users))
  .catch(err =>
    res.status(500).json({errormessage: 'Could not get users!'}))
});

router.get('/:id',  validateUser, (req, res) => {
  const { id } = req.params;

  UserDb.getById(id)
    .then(user => 
      res.status(200).json(user))
    .catch(err => 
      res.status(500).json({ errormessage: 'Could not get user'}))
});

router.get('/:id/posts', validateUser, (req, res) => {
  const { id } = req.params
  UserDb.getUserPosts(id)
    .then(posts =>{
        res.status(200).json(posts)})
    .catch(err => 
        res.status(500).json({ errormessage: 'Could not get post from that user'}))
});

router.delete('/:id', validateUser, (req, res) => {
  const { id } = req.params;

  UserDb.remove(id)
    .then(num => 
      res.status(200).json(`${num} user has been eliminated`))
    .catch(err =>
      res.status(500).json({ errormessage: 'User has not been eliminated.'}))
});

router.put('/:id', validateUser, (req, res) => {
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
const body = req.body
  UserDb.getById(body.user_id)
    .then(user =>{
      if(user.id == body.user_id){ ;
        next();
      }else{ res.status(404).json({errormessage: "ID for this user does not exist."})};
    })
    .catch(err => 
      res.status(500).json({ errormessage: "User ID not found"})
      );
}

function validateUser(req, res, next) {
  const body = req.body;
  const { id } = req.params;

  UserDb.getById(id)
    .then(user =>
      {if(user.name){
        next();
      }})
    .catch(err =>
      res.status(500).json({ errormessage: " Did not find user"}))
}

function validatePost(req, res, next) {
  const body = req.body;
  if(body.text.length > 0){
    next()
  } else{
    res.status(500).json({ errormessage: "Please add text to your post!"})
  }
}

module.exports = router;
