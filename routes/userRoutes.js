const express = require('express');
const { registerUser, loginUser, updateProfile, fetchUserProfile, fetchUser } = require('../controllers/userControllers');
const authVerify = require('../middlewares/auth');
const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile/:id', fetchUserProfile);
userRouter.get('/me',authVerify, fetchUser);
userRouter.put('/update-profile',authVerify, updateProfile);

module.exports = userRouter;