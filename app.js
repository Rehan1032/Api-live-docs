let express = require('express');
let app = express();
let morgan = require('morgan');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 7800;
let mongo = require('mongodb');
let cors = require('cors')
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser')
let MongoUrl = "mongodb+srv://rehan321:test321@cluster0.5fw4xxl.mongodb.net/?retryWrites=true&w=majority"
let db;

app.use(morgan('common'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hii From express')
})

app.get('/category', (req, res) => {
    db.collection('category').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})


// app.get('/Subcategory', (req, res) => {
//     db.collection('Subcategory').find().toArray((err, result) => {
//         if (err) throw err;
//         res.send(result)
//     })
// })

app.get('/Subcategory',(req,res) => {
    let query = {}
    let categoryId = Number(req.query.categoryId);
    let subcategoryId = Number(req.query.subcategoryId);
    if(categoryId){
       query = {category_id:categoryId}
    }else if(subcategoryId){
         query = {"subcategory_id":subcategoryId}
    } else {
        query = {}
    }
    db.collection('product').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// app.get('/product', (req, res) => {
//     db.collection('product').find().toArray((err, result) => {
//         if (err) throw err;
//         res.send(result)
//     })

// })




app.get('/product',(req,res) => {
    let query = {}
    let categoryId = Number(req.query.categoryId);
    let brandId = Number(req.query.brandId);
    if(categoryId){
       query = {category_id:categoryId}
    }else if(brandId){
         query = {"Brand.brand_id":brandId}
    } else {
        query = {}
    }
    db.collection('product').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/Carousel', (req, res) => {
    db.collection('Carousel').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})

app.get('/grocery', (req, res) => {
    db.collection('grocery').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})

app.get('/snacks', (req, res) => {
    db.collection('snacks').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})

app.get('/details', (req, res) => {
    let productId=Number(req.query.productId)
    db.collection('product').find({product_id:productId}).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})

app.get('/menu/:id',(req,res) => {
    let id = Number(req.params.id)
    db.collection('product').find({subcategory_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get(`/filter/:categoryId`,(req,res) => {
    let query = {}
  let categoryId = Number(req.params.categoryId);
    let subcategoryId = Number(req.query.subcategoryId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);

    if(subcategoryId && lcost && hcost){
        query = {
            category_id:categoryId,

         subcategory_id:subcategoryId,
            $and:[{price:{$gt:lcost,$lt:hcost}}]
        }
    }
    else if(subcategoryId){
        query = {
           category_id:categoryId,

         subcategory_id:subcategoryId
        }
    }else if(lcost && hcost){
        query = {
            category_id:categoryId,
            $and:[{price:{$gt:lcost,$lt:hcost}}]
        }
    }
    else{
        query = {
           category_id:categoryId
        
    }
}
    db.collection('product').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })

})







// connection with db
MongoClient.connect(MongoUrl, (err, client) => {
    if (err) console.log(`Error While Connecting`);
    db = client.db('MyProject2');
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
})