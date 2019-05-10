import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const CommentSchema = new Schema({
  text: String,
  timestamp: Number,
  username: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
