const { authJwt } = require("../middlewares");
const controller = require("../controllers/transactions.controller");

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

  app.post("/api/transactions", [authJwt.verifyToken], controller.create);
  app.get("/api/transactions", [authJwt.verifyToken], controller.list);
  app.delete("/api/transactions/:id", [authJwt.verifyToken], controller.delete);
  app.get("/api/transactions/:id", [authJwt.verifyToken], controller.show);
  app.post("/api/transactions/:id", [authJwt.verifyToken], controller.update);
};
