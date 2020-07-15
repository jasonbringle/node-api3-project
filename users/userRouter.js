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

router.post('/:id/posts', (req, res) => {
 const body = req.body;

 UserDb.insert(body)
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

router.get('/:id', (req, res) => {
  const { id } = req.params;

  UserDb.getById(id)
    .then(user => 
      res.status(200).json(user))
    .catch(err => 
      res.status(500).json({ errormessage: 'Could not get user'}))
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params
  UserDb.getById(id)
  .then(user => 
    PostDb.getById(user.id)
      .then(post =>
        res.status(200).json(post))
      .catch(err => 
        res.status(500).json({ errormessage: 'Could not get post from that user'})))
  .catch(err => 
    res.status(500).json({ errormessage: 'Could not find that user.'}))
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  UserDb.remove(id)
    .then(num => 
      res.status(200).json(`${num} user has been eliminated`))
    .catch(err =>
      res.status(500).json({ errormessage: 'User has not been eliminated.'}))
});

router.put('/:id', (req, res) => {
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
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
