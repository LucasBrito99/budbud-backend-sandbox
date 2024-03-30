const { authJwt } = require("../middlewares");
const controller = require("../controllers/services.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // ROUTES
  app.get("/api/services/currencies", [authJwt.verifyToken], controller.getCurrencies);
  app.get("/api/services/account-types", [authJwt.verifyToken], controller.getAccountTypes);
};
