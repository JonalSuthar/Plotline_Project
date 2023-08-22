const createError = require('http-errors');
const User = require('../models/User.model');
const { authSchema } = require('../helpers/validation_schema');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt_helpers');

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);

      const doesExist = await User.findOne({ email: result.email });
      if (doesExist) {
        throw createError.Conflict(`${result.email} is already registered`);
      }

      const user = new User(result);
      const savedUser = await user.save();
      const accessToken = await signAccessToken(savedUser.id);
      const refreshToken = await signRefreshToken(savedUser.id);
      const getemail = result.email
      // const getname = result.name
      console.log({savedUser, accessToken, refreshToken})

      res.send({ accessToken, refreshToken,getemail });
    } catch (error) {
      if (error.isJoi === true) {
        error.status = 422;
      }
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });
      const getemail = result.email
      // const getname = result.getname
      if (!user) {
        throw createError.NotFound('User not registered');
      }

      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch) {
        throw createError.Unauthorized('Username/password not valid');
      }
      
      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);
      
      res.send({ accessToken, refreshToken ,getemail});
    } catch (error) {
      if (error.isJoi === true) {
        return next(createError.BadRequest('Invalid Username/Password'));
      }
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw createError.BadRequest();
      }
      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);
      res.send({ accessToken, refreshToken: refToken });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw createError.BadRequest();
      }
      const userId = await verifyRefreshToken(refreshToken);

      await TokenModel.deleteOne({ userId, refreshToken });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
  getUserEmail: async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw createError.BadRequest('User ID is required');
      }
      const user = await User.findById(userId);
      if (!user) {
        throw createError.NotFound('User not found');
      }
      
      const userEmail = user.email;

      res.send({ email: userEmail });
    } catch (error) {
      next(error);
    }
  }
};
