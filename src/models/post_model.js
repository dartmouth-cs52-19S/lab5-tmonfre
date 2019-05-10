import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: String,
  tags: Array,
  content: String,
  cover_url: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: Array,
}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
