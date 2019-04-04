exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle404 = (err, req, res, next) => {
  if (err.code) {next(err)}
  if (err.status === 404) {
  res.status(404).send({ msg: "Value Not Found" });
  } else {
    next({status : err.status}, err)
  }
};

exports.handle400 = (err, req, res, next) => {
  if (err.code) {next(err)}
  if (err.status === 400) {
    res.status(400).send({ msg: "Invalid Value" });
  } else {
    next({status : err.status}, err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === '23503'){
    res.status(404).json({ error: `database error: ${err.code}`})
  }
  else if (err.code) {
    res.status(400).json({ error: `database error: ${err.code}`})
  } else {
    next(err)
  }
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
