const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-qtgsl0ktp0b74mjt.us.auth0.com/.well-known/jwks.json`,
  }),
  audience: ['https://interoperable-ehr', 'yCKxo0dO5ODtFJgE6IkFKNSTG5SYXAm5'],
//   issuerBaseURL: 'https://dev-qtgsl0ktp0b74mjt.us.auth0.com/',
//   audience: ["http://localhost:3001", "http://localhost:3001"],
  issuer: `https://dev-qtgsl0ktp0b74mjt.us.auth0.com/`,
  algorithms: ["RS256"],
});

module.exports = authCheck;
