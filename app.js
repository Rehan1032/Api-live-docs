let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 7800;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let MongoUrl= "mongodb+srv://rehan321:test321@cluster0.5fw4xxl.mongodb.net/?retryWrites=true&w=majority"
let db;

app.get('/',(req,res)=>{
    res.send('Hii From express')
})

app.get('/category',(req,res)=>{
    db.collection('category').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
   
})

app.get('/Subcategory',(req,res)=>{
    db.collection('Subcategory').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
   
})

app.get('/product',(req,res)=>{
    db.collection('product').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
   
})

app.get('/Carousel',(req,res)=>{
    db.collection('Carousel').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
   
})

app.get('/snacks',(req,res)=>{
    db.collection('Carousel').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
   
})


// connection with db
MongoClient.connect(MongoUrl,(err,client) =>{
    if(err) console.log(`Error While Connecting`);
    db = client.db('MyProject2');
    app.listen(port,() => {
        console.log(`listening on port ${port}`);
    })
})




