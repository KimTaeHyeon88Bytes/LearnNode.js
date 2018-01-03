var express = require("express");
var path = require("path");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB);

var db = mongoose.connection;
db.once("open", function () {
  console.log("DB Connected!");
});
db.on("error", function (err) {
  console.log("DB Error : " + err);
});

var dataSchema = mongoose.Schema({
  name:String,
  age:Number
});

var Data = mongoose.model("data", dataSchema);

Data.findOne({name:"KimTaeHyeon"}, function (err, data) {
  if(err) {
    return console.log("DB Error : " + err);
  }
  if(!data) {
    Data.create({name:"KimTaeHyeon", age:17}, function (err, data) {
      if(err) {
        return console.log("DB Error : " + err);
      }
      console.log("Data were made : " + data);
    });
  }
});

var main = express();

main.set("view engine", "ejs");
//main.use(express.static(path.join(__dirname + "public")));

main.get("/", function (requset, response) {
  render(response);
});
main.get("/name/:string", function (request, response) {
  if(request.params.string) {
    getAge(response, request.params.string);
  }
});
main.listen(1234);

function render(response) {
  Data.findOne({name:"KimTaeHyeon"}, function (err, data) {
    if(err) {
      return console.log("DB Error : " + err);
    }
    response.render("index", data);
  });
}

function getAge(response, string) {
  console.log("getAge");
  Data.findOne({name:string}, function (err, data) {
    if(err) {
      return console.log("DB Error : " + err);
    }
    response.render("index", data);
  });
}
