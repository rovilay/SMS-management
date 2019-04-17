/* eslint-disable */
const errorHandler = (error, req, res, next) => {
    const { message, errors } =  error;
  
    res.status(error.status || 500).json({
        success: false,
        error: message || errors
    });
  };
  
export default errorHandler;
  