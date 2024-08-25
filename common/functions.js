const makeResponse = async (res, statusCode, success, message, payload) => {
  res.status(statusCode).send({
    success,
    message,
    data: payload,
  });
  return statusCode;
};

const throwError = (statusCode, message) => {
  const error = new Error(message);
  error.status = statusCode;
  throw error;
};

module.exports = {
  makeResponse,
  throwError,
};
