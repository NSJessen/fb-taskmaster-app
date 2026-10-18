const createError = require('http-errors');

function isApiRequest(req) {
  return req.originalUrl.startsWith('/api');
}

const statusByErrorName = {
  ValidationError: 400,
  QueryError: 404
};

// Fanger alle ruter, som ingen router har svaret på
function notFound(req, res, next) {
  if (isApiRequest(req)) {
    return res.status(404).json({ error: 'Ikke fundet' });
  }

  next(createError(404));
}

// Fejl på /api svarer med JSON { error }, andre fejl viser HTML-siden views/error.pug
function errorHandler(err, req, res, next) {
  const status = err.status || statusByErrorName[err.name] || 500;

  console.error(err);

  if (isApiRequest(req)) {
    // Ved serverfejl (500) vises den interne fejlbesked ikke for klienten
    const message = status < 500 ? err.message : 'Der skete en fejl på serveren';
    return res.status(status).json({ error: message });
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(status);
  res.render('error');
}

module.exports = { notFound, errorHandler };
