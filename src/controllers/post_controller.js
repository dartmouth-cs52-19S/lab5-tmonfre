import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();

  post.title = req.body.title;
  post.tags = req.body.tags.split(/[ ,]+/);
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;

  post.save()
    .then((result) => {
      res.json({ message: 'post created', result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ message: 'deleted post', result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updatePost = (req, res) => {
  if (req.body.tags) {
    req.body.tags = req.body.tags.split(/[ ,]+/);
  }

  Post.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.json({ message: 'updated post', result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
