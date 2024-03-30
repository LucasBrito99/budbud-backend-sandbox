const { authJwt } = require("../middlewares");
const controller = require("../controllers/account.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // ROUTES
  // app.get("/api/accounts", [authJwt.verifyToken], controller.getAccounts);

  app.post("/api/accounts", [authJwt.verifyToken], controller.create);
  app.get("/api/accounts", [authJwt.verifyToken], controller.list);
  app.get("/api/accounts/:id", [authJwt.verifyToken], controller.show);
  app.post("/api/accounts/:id", [authJwt.verifyToken], controller.update);
};
