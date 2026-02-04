const { appError } = require("../utils/appError");

const validateID = (req, res, next) => {
  const id = req.params?.id?.trim();

  if (id?.length !== 24) {
    const err = appError("ID must be 24 character long!", 400);
    return next(err);
  }

  req.params.id = id;

  next();
};

module.exports = { validateID };
