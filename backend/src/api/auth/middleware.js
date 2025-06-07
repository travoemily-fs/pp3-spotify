/* 
middleware functions live here:
validateTokenStatus
errorHandler
validateLoginForm

note for self: middleware functions bridge the request and the route. it checks authentication, formats data, and add things to a request object
*/
// pull in verifyToken helper
const { verifyToken } = require("./utils");

// validate token middleware
const validateTokenStatus = async (req, res, next) => {
  // grab authorization header
  const authHeader = req.headers.authorization;
  // check for missing header
  if (!authHeader) {
    // handle w/ a 401 unauthorized error
    return res.status(401).json({
      error: "No header was provided.",
    });
  }
  try {
    const verified = verifyToken(authHeader);
    // attach verified payload to continue
    req.user = verified;
    // send it forward to next handler
    next();
  } catch (err) {
    // checks for expired token
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({
        // handle w/ a 403 forbidden error
        error: "Token has expired.",
        // provides extra debugging info on what went wrong
        details: err.message,
      });
    }
    // checks for invalid token
    else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({
        // handle w/ a 403 forbidden error
        error: "Invalid token.",
        // provides extra debugging info on what went wrong
        details: err.message,
      });
    }
    // failsafe catch
    else {
      return res.status(403).json({
        // handle w/ a 403 forbidden error
        error: "Token verification failed.",
        // provides extra debugging info on what went wrong
        details: err.message,
      });
    }
  }
};

// global error handler
const errorHandler = async (err, req, res, next) => {
  // grab fallback error handler
  const status = err.statusCode || 500;
  // grab fallback error message
  const message = err.message || "An unexpected error occurred.";
  // respond with json
  res.status(status).json({
    error: message,
  });
};

module.exports = {
  validateTokenStatus,
  errorHandler,
};
