const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createAt: { type: Date, default: () => new Date() },
  comment: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
});

commentSchema.statics.getAllByOwner = async (filters = {}) => {
  const customers = await Comment.find(filters).populate('addedBy');
  return customers;
};

const Comment = mongoose.model('Comments', commentSchema);
module.exports = Comment;
