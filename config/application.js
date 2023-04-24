module.exports = {
  JWT_SIGNATURE_KEY: process.env.JWT_SIGNATURE_KEY || 'Rahasia123',
  MORGAN_FORMAT: ':method :url :status :res[content-length] - :response-time ms'
};
