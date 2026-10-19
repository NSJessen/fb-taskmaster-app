// errorHandler oversætter error.name til en statuskode

function createValidationError(message) {
  const error = new Error(message);
  error.name = 'ValidationError';
  return error;
}

function createQueryError(message) {
  const error = new Error(message);
  error.name = 'QueryError';
  return error;
}

module.exports = { createValidationError, createQueryError };
