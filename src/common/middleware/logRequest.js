exports.logRequest = async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(new Date(), "↓");
    console.info(
      "request: ",
      req.method,
      " Host:",
      req.headers.origin,
      " End point:",
      req.originalUrl
    );
  }
  next();
};
