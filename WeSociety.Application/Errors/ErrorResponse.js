class NotfoundError {
  constructor() {
    (this.success = false), 
    (this.status = 200), 
    (this.message = "NOTFOUND");
  }
}

class UnauthorizedError {
  constructor() {
    (this.success = false),
    (this.status = 401),
    (this.message = "UNAUTHORIZED");
  }
}

class TokenExpiredError {
  constructor() {
    (this.success = false),
    (this.status = 401),
    (this.message = "TOKENEXPIRED");
  }
}

module.exports = { NotfoundError, UnauthorizedError,TokenExpiredError };
