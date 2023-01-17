
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

// app.get("/items", (req, res) => {
//   db.collection("items").find().toArray((err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
// });

app.get('/items',(req,res) => {
  let categoryId = Number(req.query.categoryid)
  let query={}
  if(categoryId){
    query = {category_id:categoryId}
  }
  db.collection('items').find(query).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
});

app.get('/category',(req,res) => {
  let categoryId = Number(req.query.id)
  let query={}
  if(categoryId){
    query = {id:categoryId}
  }
  db.collection('category').find(query).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
});



MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, dc) => {
  if (err) console.log("Error while connecting");
  db = dc.db("Hotstar");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});


//Here url of apis

// to show all items:
//http://localhost:9500/items

// to show all cotegory:
// http:localhost:9500/category

//to show items by there cotegry:
// http://localhost:9500/items?categoryid=1  

// to show there cotegory of any particular id:
// http://localhost:9500/category?id=2
