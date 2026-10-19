function isApiRequest(req) {
  return req.originalUrl.startsWith('/api');
}

const statusByErrorName = {
  ValidationError: 400,
  QueryError: 404
};

// Fanger alle ruter, som ingen router har svaret på
function notFound(req, res) {
  if (isApiRequest(req)) {
    return res.status(404).json({ error: 'Ikke fundet' });
  }

  res.status(404).type('text').send('Siden blev ikke fundet');
}

// next skal blive stående – Express kræver fire parametre i fejl-middleware
function errorHandler(err, req, res, next) {
  const status = err.status || statusByErrorName[err.name] || 500;

  console.error(err);

  // Ved serverfejl (500) vises den interne fejlbesked ikke for klienten
  const message = status < 500 ? err.message : 'Der skete en fejl på serveren';

  if (isApiRequest(req)) {
    return res.status(status).json({ error: message });
  }

  res.status(status).type('text').send(message);
}

module.exports = { notFound, errorHandler };
