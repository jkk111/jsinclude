var fs = require("fs");
var express = require("express");
var app = express();
app.listen(80);
app.use(express.static("static"));
module.exports = function(settings) {
  return app;
}

app.get("/modules", function(req, res) {
  var modules = req.query.modules;
  modules = modules.replace(/\./g, "\\");
  modules = modules.split(",");
  moduleLoaderFactory(modules, function(code) {
    res.send(code);
  })
});

function moduleLoaderFactory(modules, cb) {
  var loader = fs.readFileSync("./moduleloader.js", "utf8");
  var response = loader;
  var code = [];
  for(var module of modules) {
    var modulepath = __dirname + "/modules/" + module + ".js";
    code.push(fs.readFileSync(modulepath, "utf8"));
  }
  cb(response.replace("{{count}}", code.length).replace("{{code}}", code.join("\n")));
}