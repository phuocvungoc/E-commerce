exports.getError40x = (status, err) => {
  const error = new Error();
  error.httpStatusCode = status;
  error.message = err;
  return error;
};
