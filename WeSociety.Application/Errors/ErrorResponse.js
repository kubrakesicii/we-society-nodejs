class NotfoundError {
  constructor() {
    (this.success = false), 
    (this.status = 200), 
    (this.message = "NOTFOUND");
  }
}

class UserExistsError {
  constructor() {
    (this.success = false), 
    (this.status = 200), 
    (this.message = "USEREXISTS");
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


class LoginError {
  constructor() {
    (this.success = false),
    (this.status = 200),
    (this.message = "LOGINERROR");
  }
}


module.exports = { NotfoundError, UnauthorizedError,TokenExpiredError,UserExistsError, LoginError };
