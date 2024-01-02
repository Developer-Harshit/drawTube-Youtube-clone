const errorHandler = (err, req, res, next) => {
    if (!err) return next();
    return res.status(500 || res.statusCode).json({
        error: err,
        sucess: false,
        message: "Message from error handler",
        code: 500 || res.statusCode,
        type: "SERVER",
    });
};
module.exports = errorHandler;
