import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as Comments from './controllers/comment_controller';
import * as Users from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.route('/posts')
  .post(requireAuth, Posts.createPost)
  .get((req, res) => {
    Posts.getPosts(req, res);
  });

router.route('/posts/:id')
  .get((req, res) => {
    Posts.getPost(req, res);
  })
  .put(requireAuth, Posts.updatePost)
  .delete(requireAuth, Posts.deletePost);

router.route('/addcomment/:id')
  .post(requireAuth, Comments.createComment);

router.route('/deletecomment/:id')
  .post(requireAuth, Comments.deleteComment);

router.post('/signin', requireSignin, Users.signin);

router.post('/signup', Users.signup);

export default router;
