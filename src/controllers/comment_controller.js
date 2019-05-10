import Comment from '../models/comment_model';
import Post from '../models/post_model';

export const createComment = (req, res) => {
  const comment = new Comment();

  comment.text = req.body.comment;
  comment.timestamp = Date.now();
  comment.username = req.user.username;

  comment.save()
    .then((commentObj) => {
      Post.findOne({ _id: req.params.id })
        .then((postObj) => {
          postObj.comments.push(commentObj);

          postObj.save()
            .then(() => {
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
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteComment = (req, res) => {
  Comment.deleteOne({ _id: req.body._id })
    .then(() => {
      Post.findOne({ _id: req.params.id })
        .then((postObj) => {
          const output = [];

          postObj.comments.forEach((comment) => {
            if (comment._id.toString() !== req.body._id.toString()) {
              output.push(comment);
            }
          });

          postObj.comments = output;

          postObj.save()
            .then(() => {
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
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
