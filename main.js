var express = require("express");

var main = express();

main.get("/", function (requset, response) {
  response.send("Hello World!");
});

main.listen(1234);
