exports.getErr500 = (err) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  error.message = err.message;
  return error;
};
