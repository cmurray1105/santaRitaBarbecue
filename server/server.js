const path = require("path");
const express =require("express");
require("dotenv").config();
const  db= require("../db/queries");
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const url = require('url');
const AWS = require("aws-sdk");

// SQL_HOST: 'localhost'
// SQL_USER: 'root'
// SQL_PASSWORD: 'Bruins2011!'
// SQL_DATABASE: 'barbecue'
console.log("ENV AND STUFF", process.env.BUCKET, process.env.ACCESS_KEY, process.env.SECRET, process.env.SQL_HOST, process.env.SQL_USER, process.env.SQL_PASSWORD, process.env.SQL_DATABASE)
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET,
  Bucket: process.env.BUCKET
});
// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
const profileImgUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: process.env.BUCKET,
   acl: 'public-read',
   key: function (req, file, cb) {
    cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  }),
  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function( req, file, cb ){
   checkFileType( file, cb );
  }
 }).single('profileImage');

 function checkFileType( file, cb ){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  // Check mime
  const mimetype = filetypes.test( file.mimetype );
 if( mimetype && extname ){
   return cb( null, true );
  } else {
   cb( 'Error: Images Only!' );
  }
 }


const bodyParser = require("body-parser");
const PORT = process.env.HTTP_PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/loaderio-52db470b27d41c196eddc9a3350511ce', (req, res) => {
  res.send("loaderio-52db470b27d41c196eddc9a3350511ce");
})

app.get("/", (req, res) => {
  res.send("just gonna send it");
});


app.get("/products", (req, res) => {
  // console.log('server', req.query.product)
  db.getProducts(req.query.product, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      res.send(result);
    }
  });
});
app.post("/addOrder", (req, res) => {
  console.log("query", req.body);
  let currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log("del date", req.body.deliveryDate.slice(0, 19).replace("T", " "));
  const order = [
    req.body.address,
    req.body.customerName,
    "Liberty Hill",
    currentDate,
    req.body.deliveryDate.slice(0, 19).replace("T", " "),
    req.body.neighborhood,
    req.body.email,
    req.body.phone,
  ];
  // console.log("order:", order)
  let id;
  db.addDelivery(order, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      // console.log("RESULT FROM ADDING", results.insertId)
      let id = results.insertId;
      for (let item in req.body.cartItems) {
        let params = [
          req.body.cartItems[item].id,
          id,
          req.body.cartItems[item].quantity,
        ];
        db.addItemToOrder(params, (err, secondResult) => {
          // console.log("callback called")
          if (err) {
            res.send(err);
          } else {
            console.log("sent: ", secondResult);
          }
        });
      }
      res.send(results);
    }
  });
});
app.post("/updateQuantity", (req, res) => {
  console.log(req.body.quantity, req.body.productName);
  let quantity = [req.body.quantity.toString(), req.body.productName];
  db.updateQuantity(quantity, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/getOrders", (req, res) => {
  db.getOrders((err, result) => {
    console.log("RESULTTTTT1", result);
    // result = result[0]
    if (err) {
      console.log(err);
    } else {
      console.log("type", result);
      // res.send(result)
      let orders = {};

      for (let item in result) {
        console.log("ITEM: ", result[item]);
        if (!orders[result[item].id]) {
          orders[result[item].id] = {
            customer: result[item].name,
            address: result[item].street_address,
            deliveryDate: result[item].scheduled_delivery,
            neighborhood: result[item].neighborhood,
            email: result[item].email,
            phone: result[item].phone,
            products: [
              {
                productName: result[item].product_name,
                quantity: result[item].quantity,
                price: result[item].price,
              },
            ],
          };
        } else {
          orders[result[item].id].products.push({
            productName: result[item].product_name,
            quantity: result[item].quantity,
            price: result[item].price,
          });
        }
      }
      res.send(orders);
    }
  });
});
app.get("/categories", (req, res) => {
  db.getCategories((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("categories", result);
      res.send(result);
    }
  });
});

app.get("/inventory", (req, res) => {
  // console.log('server', req.query.product)
  db.getInventory((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("inventory", result);
      res.send(result);
    }
  });
});


  // console.log("req", req.body);
  // const file = req.file;
  // const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;


    //Where you want to store your file

    // var params = {
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   Key: file.originalname,
    //   Body: file.buffer,
    //   ContentType: file.mimetype,
    //   ACL: "public-read"
    // };

    /**
 * Single Upload
 */


app.post( '/profile-img-upload', ( req, res ) => {
  profileImgUpload( req, res, ( error ) => {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if( error ){
     console.log( 'errors', error );
     res.json( { error: error } );
    } else {
     // If File not found
     if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( 'Error: No File Selected' );
     } else {
      // If Success
      const imageName = req.file.key;
      const imageLocation = req.file.location;
  // Save the file name into database into profile model
  res.json( {
       image: imageName,
       location: imageLocation
      } );
     }
    }
   });
  });

  app.post('/addItem', (req, res)=>{
    console.log("ITEM OBJECT BEING ADDED", req.body)
    let item = []
    for (let property in req.body){
      item.push(req.body[property])
    }
    console.log(item)
    db.addInventoryItem(item, (err, result)=>{
      if (err){
        console.log(err)
      }else{
        res.send(result)
      }
    })
  })

  app.delete('/inventory', function (req, res) {
    console.log(req.body)
    let id = [req.body.id]
    db.removeInventoryItem(id, (err, result)=>{
      if (err){
        console.log(err)
      }else{
        console.log(result)
        res.send(result)
      }
    });
  })
  // End of single profile upload

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}. cwm`);
});
