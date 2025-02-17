const errorHandler = (error, req, res, next) => {
    error.status = error.status || 500;
    error.statusText = error.statusText || 'BAD_REQUEST';
    console.log(error);
    return res.status(error.status).json({
        statusText: error.statusText,
        message: error.message || "Something went wrong",
    });
};

module.exports = errorHandler;
