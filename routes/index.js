var express = require('express');
var router = express.Router();

const CommentDAO = require('../module/comment-dao');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('here');
  res.render('index', { title: 'Express' });
});

router.get('/comment', async function(req, res) {
  try {
    const results = await CommentDAO.find();
    res.json(results);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.delete('/comment', async function(req, res) {
  try {
    const results = await CommentDAO.remove();
    res.json(results);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.post('/comment', async function(req, res) {
  try {
    await CommentDAO.insertOne(req.body);
    res.json(req.body);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
