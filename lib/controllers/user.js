const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const User = require('../models/User');
const UserService = require('../services/UserService');


const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()

  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in Success!' });
    } catch (e) {
      next(e);
    }
  })

  .get('/me', authenticate, async (req, res, next) => {
    try {
      const user = await User.getByEmail(req.user.email);
      res.json(user);
    } catch (e) {
      next(e); 
    }
    
  })

  .get('/protected', authenticate, async (req, res) => {
    res.json({ message: 'Going to a protected route' });
  })

  .get('/', [authenticate, authorize], async (req, res, next) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  })

  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.SECURE_COOKIES === 'true',
        sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
        maxAge: ONE_DAY_IN_MS,
      })
      .status(204)
      .send();
  })


  .post('/update', authenticate, async (req, res, next) => {
    try {
      const updatedData = { bio:req.body.bio, platforms:req.body.platforms, channelLinks:req.body.channelLinks };
      const user = await User.addUserBio(updatedData, req.user.email);
      res.status(200);
      res.json(user);
    } catch (e) {
      next(e);
    }
  })


  .post('/updateAvatar', authenticate, async (req, res, next) => {
    try {
      const updatedData = { avatar_png: req.body.avatar_png };
      const user = await User.uploadAvatar(updatedData, req.user.email);
      res.status(200);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });