const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { User } = require("../models/users");

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") next(createError(401, "Not authorized"));

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token) next(createError(401, "Not authorized"));

    req.user = user;
    next();
  } catch (error) {
    next(createError(401, error.message));
  }
};

module.exports = authenticate;
