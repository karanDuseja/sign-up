const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_feilds: {

        FNAME: firstName,
        LNAME: lastName,

        }

      }
    ]
  };

  console.log(firstName, lastName, email);

  const jsonData= JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/c02b4478e8";
  const options= {
    method:"POST",
    auth:"karan59193:86c04cdf527ff192bbf44d79d247d0d8-us7",
  }



  const request= https.request(url, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname+"/success.html");
    } else {
      res.sendFile(__dirname+"/failure.html");

    }

  response.on("data",function(data){
     console.log(JSON.parse(data));
  });
});
  request.write(jsonData);
  request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/")
})


app.listen(process.env.PORT, function(){
  console.log("server on 3000");

});

//apikey
//845cd9d79f051dae200e77d3f22f48ef-us7  845cd9d79f051dae200e77d3f22f48ef-us7 86c04cdf527ff192bbf44d79d247d0d8-us7

//listid
// c02b4478e8
