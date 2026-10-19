const { createValidationError } = require('../utils/errors');

const MAX_TEXT_LENGTH = 200;

// Tjekker opgavens tekst og returnerer den uden mellemrum i enderne
function validateTaskText(text) {
  if (text === undefined || text === null) {
    throw createValidationError('Opgave tekst mangler.');
  }

  if (typeof text !== 'string') {
    throw createValidationError('Opgave tekst skal være en streng.');
  }

  const trimmedText = text.trim();

  if (trimmedText.length === 0) {
    throw createValidationError('Opgave tekst må ikke være tom.');
  }

  if (trimmedText.length > MAX_TEXT_LENGTH) {
    throw createValidationError(`Opgave tekst må højst være ${MAX_TEXT_LENGTH} tegn.`);
  }

  return trimmedText;
}

module.exports = { validateTaskText };
