const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("home",{name:null ,temp:null , desc:null ,imgurl:null,symb:null});
})

app.post("/",function(req,res){
    var txt = req.body.txt;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+txt+"&units=metric&appid=798170624dbaefc2b7e16330057b6dd6";
   
    https.get(url,function(response){
        response.on("data",function(data){
            const wd = JSON.parse(data);
            const temp = wd.main.temp;
            const desc=wd.weather[0].description;
            const icon = wd.weather[0].icon;
            const name = wd.name;
            const imurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
           res.render("home",{name:name,desc:desc,imgurl:imurl,temp:temp,symb:" degree celcius"});
    })
    })

})

app.listen("3000",function(){
    console.log("Server Started On Port 3000");
})


