const noteRoutes = require("./routes.js");
module.exports = function (app, db) {
  noteRoutes(app, db);
};