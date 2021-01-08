const Comment = require('../models/Comment');

const save = async (req, res) => {
  const temp = { ...req.body, addedBy: req.user._id };
  const commentModal = new Comment(temp);
  const comment = await commentModal.save();
  res.status(201).send(comment);
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  const data = await Comment.deleteOne({ _id: id });
  res.send(data);
};

const getAllByOwner = async (req, res) => {
  const id = req.params.id;
  const data = await Comment.getAllByOwner({ owner: id });
  data;
  res.send(data);
};
module.exports = {
  save,
  deleteComment,
  getAllByOwner,
};
