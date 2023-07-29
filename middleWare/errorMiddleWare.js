const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    success: false,
    msg: err.message,
  });
};

module.exports = {
  errorHandler,
};
