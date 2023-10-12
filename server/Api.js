const express=require('express');
const mongoose = require("mongoose");
require("./Connection");

const app=express();
const cors = require("cors"); //iske bina kam nahi kar raha
app.use(cors());
app.use(express.json())


const Product=require('./SchemaRide');
require("./SchemaRide")
require("./SchemaImage")
const Images=mongoose.model("photos")



app.get('/',(req,res)=>{
    res.send('server working');
})

app.post('/post',async (req,res)=>{
   let data=new Product(req.body);
   let result=await data.save()
   res.send(result);
})

app.delete("/delete/:_id", async (req, resp) => {
  console.log(req.params)
  let data = await Product.deleteOne(req.params);
  resp.send(data);
}) 


const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();//date.now has been used for the case when we upload same image twice. in that case it ensure unique file name.
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });


app.post("/upload-image", upload.single("image"), async (req, res) => {
  /*image is the name of the variable in which images will get stored */
  console.log(req.body);
  res.send("this page is working")
  const imageName = req.file.filename;

  try {
    await Images.create({ image: imageName });
    //The create method is used to insert a new document into the MongoDB collection.
    //Here image is the name of the field in databse and imageName has name of the corresponding image.
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});


app.get("/getter", async(req,res)=>{


    Product.find({}).then((data)=>{
      res.send(data)
    });
 
})

app.get("/get-image", async (req, res) => {
  //yaha se ham frontend me image ko bhej rahe hai to show it on browser
  try {
    Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
      //Images has access to collections data will store all the uploaded image inside it
    });
  } catch (error) {
    res.json({ status: error });
  }
});

app.listen(8000);





  

  
