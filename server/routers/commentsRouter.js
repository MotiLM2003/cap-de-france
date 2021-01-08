const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const {
  save,
  deleteComment,
  getAllByOwner,
} = require('../controllers/commentsController');
router.post('/', auth, save);
router.delete('/delete/:id', auth, deleteComment);
router.get('/:id', auth, getAllByOwner);

module.exports = router;
