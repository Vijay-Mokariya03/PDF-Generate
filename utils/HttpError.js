class HttpError extends Error {
    constructor(message, status, statusText, data = {}) {
        super(message)
        this.status = status;
        this.statusText = statusText;
        this.data = data;
        Error.captureStackTrace(this, HttpError);
    }
}

module.exports = HttpError;