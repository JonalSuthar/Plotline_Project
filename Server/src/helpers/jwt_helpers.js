const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const TokenModel = require("../models/Token.model");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "pickurpage.com",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },

  signRefreshToken: async (userId) => {
    try {
      const refreshToken = await jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1y",
          issuer: "pickurpage.com",
        }
      );
      await TokenModel.create({ userId, refreshToken });

      return refreshToken;
    } catch (error) {
      throw error;
    }
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },

  verifyRefreshToken: async (refreshToken) => {
    try {
      const decoded = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      console.log({decoded})
      const tokenRecord = await TokenModel.findOne({
        userId: decoded.userId,
        refreshToken,
      });

      console.log({tokenRecord})

      if (!tokenRecord) {
        throw new Error("Refresh token not found");
      }

      console.log({decoded})

      return decoded.userId;
    } catch (error) {
      throw error;
    }
  },

  getUserIdFromToken: async function getUserIdFromToken(req, res, next) {
    const authorization = req.headers.authorization;

    const [_bearer, token] = authorization.split(" ");

    console.log({token})

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token not provided" });
    }

    try {
      console.log("REFRESH_TOKEN_SECRET", process.env.REFRESH_TOKEN_SECRET)


      const decoded = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
      );

      console.log("Decoded", decoded)
      req.body.userid = decoded.userId;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  },
};

