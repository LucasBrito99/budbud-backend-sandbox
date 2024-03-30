const { authJwt } = require("../middlewares");
const controller = require("../controllers/categories.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // ROUTES
  app.post("/api/categories", [authJwt.verifyToken], controller.create);
  app.get("/api/categories", [authJwt.verifyToken], controller.list);
  // app.get("/api/categories/:id", [authJwt.verifyToken], controller.show);
  app.post("/api/categories/:id", [authJwt.verifyToken], controller.update);
};
