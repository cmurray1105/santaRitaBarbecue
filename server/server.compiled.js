"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _queries = _interopRequireDefault(require("../db/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config();

var multerS3 = require('multer-s3');

var multer = require('multer');

var url = require('url');

var AWS = require("aws-sdk");

console.log("ENV", process.env.BUCKET, process.env.ACCESS_KEY, process.env.SECRET);
var s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET,
  Bucket: process.env.BUCKET
}); // Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

var profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    acl: 'public-read',
    key: function key(req, file, cb) {
      cb(null, _path["default"].basename(file.originalname, _path["default"].extname(file.originalname)) + '-' + Date.now() + _path["default"].extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 2000000
  },
  // In bytes: 2000000 bytes = 2 MB
  fileFilter: function fileFilter(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profileImage');

function checkFileType(file, cb) {
  // Allowed ext
  var filetypes = /jpeg|jpg|png|gif/; // Check ext

  var extname = filetypes.test(_path["default"].extname(file.originalname).toLowerCase()); // Check mime

  var mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

var bodyParser = require("body-parser");

var PORT = process.env.HTTP_PORT || 8080;
var app = (0, _express["default"])();
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../client/dist")));
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("just gonna send it");
});
app.get("/products", function (req, res) {
  // console.log('server', req.query.product)
  _queries["default"].getProducts(req.query.product, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      res.send(result);
    }
  });
});
app.post("/addOrder", function (req, res) {
  console.log("query", req.body);
  var currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log("del date", req.body.deliveryDate.slice(0, 19).replace("T", " "));
  var order = [req.body.address, req.body.customerName, "Liberty Hill", currentDate, req.body.deliveryDate.slice(0, 19).replace("T", " "), req.body.neighborhood, req.body.email, req.body.phone]; // console.log("order:", order)

  var id;

  _queries["default"].addDelivery(order, function (err, results) {
    if (err) {
      res.send(err);
    } else {
      // console.log("RESULT FROM ADDING", results.insertId)
      var _id = results.insertId;

      for (var item in req.body.cartItems) {
        var params = [req.body.cartItems[item].id, _id, req.body.cartItems[item].quantity];

        _queries["default"].addItemToOrder(params, function (err, secondResult) {
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
app.post("/updateQuantity", function (req, res) {
  console.log(req.body.quantity, req.body.productName);
  var quantity = [req.body.quantity.toString(), req.body.productName];

  _queries["default"].updateQuantity(quantity, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/getOrders", function (req, res) {
  _queries["default"].getOrders(function (err, result) {
    console.log("RESULTTTTT1", result); // result = result[0]

    if (err) {
      console.log(err);
    } else {
      console.log("type", result); // res.send(result)

      var orders = {};

      for (var item in result) {
        console.log("ITEM: ", result[item]);

        if (!orders[result[item].id]) {
          orders[result[item].id] = {
            customer: result[item].name,
            address: result[item].street_address,
            deliveryDate: result[item].scheduled_delivery,
            neighborhood: result[item].neighborhood,
            email: result[item].email,
            phone: result[item].phone,
            products: [{
              productName: result[item].product_name,
              quantity: result[item].quantity,
              price: result[item].price
            }]
          };
        } else {
          orders[result[item].id].products.push({
            productName: result[item].product_name,
            quantity: result[item].quantity,
            price: result[item].price
          });
        }
      }

      res.send(orders);
    }
  });
});
app.get("/categories", function (req, res) {
  _queries["default"].getCategories(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("categories", result);
      res.send(result);
    }
  });
});
app.get("/inventory", function (req, res) {
  // console.log('server', req.query.product)
  _queries["default"].getInventory(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("inventory", result);
      res.send(result);
    }
  });
}); // console.log("req", req.body);
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

app.post('/profile-img-upload', function (req, res) {
  profileImgUpload(req, res, function (error) {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if (error) {
      console.log('errors', error);
      res.json({
        error: error
      });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        // If Success
        var imageName = req.file.key;
        var imageLocation = req.file.location; // Save the file name into database into profile model

        res.json({
          image: imageName,
          location: imageLocation
        });
      }
    }
  });
});
app.post('/addItem', function (req, res) {
  console.log("ITEM OBJECT BEING ADDED", req.body);
  var item = [];

  for (var property in req.body) {
    item.push(req.body[property]);
  }

  console.log(item);

  _queries["default"].addInventoryItem(item, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app["delete"]('/inventory', function (req, res) {
  console.log(req.body);
  var id = [req.body.id];

  _queries["default"].removeInventoryItem(id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  }); // res.send('Got a DELETE request at /user')

}); // End of single profile upload
// s3bucket.upload(params, function(err, data) {
//   if (err) {
//     res.status(500).json({ error: true, Message: err });
//   } else {
//     res.send({ data });
//     var newFileUploaded = {
//       description: req.body.description,
//       fileLink: s3FileURL + file.originalname,
//       s3_key: params.Key
//     };
// var document = new DOCUMENT(newFileUploaded);
// document.save(function(error, newFile) {
//   if (error) {
//     throw error;
//   }
// });

app.listen(PORT, function () {
  console.log("Server listening at port ".concat(PORT, ". cwm"));
});
