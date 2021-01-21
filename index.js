const express = require('express')
const bodyParser = require('body-parser')
const cors= require('cors')
require('dotenv').config()
const ObjectId=require('mongodb').ObjectId;

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://volunterNetwork:volunterNetwork1234@cluster0.atcbg.mongodb.net/volunter?retryWrites=true&w=majority`;


const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 5000;


app.get('/', (req, res) => {
  res.send('Hello World!')
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("volunter").collection("bookings");

  app.post('/addBooking',(req,res) => {
    const newBooking=req.body;
    productCollection.insertOne(newBooking)
    .then(result=>{
      res.send(result.insertedCount>0)
    })
  })
  app.post('/add',(req,res) => {
    const newBooking=req.body;
    productCollection.insertOne(newBooking)
    .then(result=>{
      res.send(result.insertedCount>0)
    })
  })

  app.get('/booking', (req, res)=>{
    productCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
  app.get('/allUser', (req, res)=>{
    productCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })

  app.delete('/delete/:id',(req,res)=>{
    productCollection.deleteOne({_id:ObjectId(req.params.id)})
    .then(result=>{
      res.send(result.deletedCount>0)
    })

  })
  app.delete('/admin/delete/:id',(req,res)=>{
    productCollection.deleteOne({_id:ObjectId(req.params.id)})
    .then(result=>{
      res.send(result.deletedCount>0)
    })

  })



  console.log("database connected successfully");
 
});


app.listen(port) 