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

module.exports = { NotfoundError, UnauthorizedError };
