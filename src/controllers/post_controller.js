import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();

  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;

  post.save()
    .then((result) => {
      res.json({ message: 'Post created!', result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find({}).then((result) => {
    res.send(result);
  });
};

export const getPost = (req, res) => {
  Post.findOne({ _id: req.params.id }).then((result) => {
    res.send(result);
  });
};

export const deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.json({ message: 'deleted post', result });
  });
};

export const updatePost = (req, res) => {
  Post.updateOne({ _id: req.params.id }, req.body).then((result) => {
    res.json({ message: 'updated post', result });
  });
};
