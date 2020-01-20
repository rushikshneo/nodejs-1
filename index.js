const express    = require('express');
const bodyParser = require('body-parser');
const request    = require("request");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
 res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
 var cryptotype = req.body.crypto;
 var currency   = req.body.curre;
 var amount     = req.body.amount;
 // console.log()
  var options ={
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
         from  : cryptotype,
         to    : currency,
         amount: amount,
       }
   }

request(options,function(error,response,body){
    var data  = JSON.parse(body);
    var price = data.price;
    var time  = data.time;
    res.write("<div>The Current Date is "+time+"</div>");
    res.write( "<h1>"+amount +" "+ cryptotype+" is Currently Worth "+ price+" "+currency+"</h1>" );
    res.send();
  })
})

app.listen(3000, function(){
  console.log("statred.")
})
