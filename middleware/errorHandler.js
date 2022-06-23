/**
 * @function errorHandler
 * @Description errorHandler is also a request handler which handles all the errors occured inside this API, either intentional or actual errors.
 */
export default function errorHandler(err, req, res, next) {
  // server errors.
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'production') {
    // finally send error to user
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
      });
    } else {
      // server error
      console.log('Error - ', err);
      res.status(err.statusCode).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message || 'Something went wrong!',
      });
    }
  } else {
    // Development
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      err,
      stack: err.stack,
    });
  }
}
