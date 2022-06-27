export default class NetworkError extends Error {
    constructor(statusCode = 500, message = '') {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
