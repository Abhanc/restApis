
let express = require("express");
let app = express();
let port = 9500;
let cors = require("cors");
let mongo = require("mongodb");
let MongoClient = mongo.MongoClient;
let bodyParser = require("body-parser");
let mongoUrl =
  "mongodb+srv://test:test231@cluster0.ra1jlo3.mongodb.net/?retryWrites=true&w=majority";
let db;

app.get("/", (req, res) => {
  res.send("hii from Express");
});
app.get("/items", (req, res) => {
  db.collection("items")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get('/cotegory',(req,res) => {
  let id = Number(req.params.cotegory_id)
  db.collection('items').find({cotegory:id}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
  })
});

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, dc) => {
  if (err) console.log("Error while connecting");
  db = dc.db("Hotstar");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

