import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();

  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;
  post.comments = [];

  post.save()
    .then((result) => {
      res.json({ message: 'post created', data: result });
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
      // tags field went from string to array, so intentionally update all old string versions to arrays
      if (typeof result.tags === 'string') {
        result.tags = result.tags.split(/[ ,]+/);
        result.save()
          .then((updated) => {
            res.send(updated);
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
        // comments field is new, add it for posts without
      } else if (result.comments === undefined) {
        result.comments = [];
        result.save()
          .then((updated) => {
            res.send(updated);
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ message: 'deleted post', data: result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updatePost = (req, res) => {
  Post.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      // grab updated object to send back to client
      Post.findOne({ _id: req.params.id })
        .then((updatedObject) => {
          res.json({ message: 'updated post', result: updatedObject });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const addComment = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((result) => {
      result.comments.push({
        comment: req.body.comment,
        timestring: Date.now(),
      });

      result.save()
        .then((obj) => {
          Post.findOne({ _id: req.params.id })
            .then((updatedObject) => {
              res.json({ message: 'added comment', result: updatedObject });
            })
            .catch((error) => {
              res.status(500).json({ error });
            });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteComment = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((result) => {
      const output = [];

      result.comments.forEach((comment) => {
        if (comment.timestring !== req.body.comment.timestring) {
          output.push(comment);
        }
      });

      result.comments = output;

      result.save()
        .then((obj) => {
          Post.findOne({ _id: req.params.id })
            .then((updatedObject) => {
              res.json({ message: 'deleted comment', result: updatedObject });
            })
            .catch((error) => {
              res.status(500).json({ error });
            });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
