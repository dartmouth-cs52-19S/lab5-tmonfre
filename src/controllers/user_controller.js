import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;

  if (!email || !password) {
    res.status(422).send('You must provide email and password.');
  }

  // here you should do a mongo query to find if a user already exists with this email.
  // if user exists then return an error. If not, use the User model to create a new user.
  // Save the new User object
  // this is similar to how you created a Post
  // and then return a token same as you did in in signin
  User.countDocuments({ email }, (err, count) => {
    if (err) {
      res.status(500).send(err);
    } else if (count > 0) {
      res.status(422).send(`A user already exists with email: ${email}.`);
    } else {
      const user = new User();

      user.email = email;
      user.password = password;

      user.save()
        .then((result) => {
          res.send({ token: tokenForUser(result) });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
  });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
