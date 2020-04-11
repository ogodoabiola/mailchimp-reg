const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    
    res.sendfile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    
    var email = req.body.email;
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    
    var data = {
        members:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
        ]            
    };
    
    var jsonData = JSON.stringify(data);
    var options = {
        url:"https://us17.api.mailchimp.com/3.0/lists/264f97e7c9",
        method: "POST",
        headers:{
            "Authorization": "beestudiox d72eec55ae48a8f34298a7fbea61fda4-us17"
        },
        //body: jsonData
    };
    
    
    request(options, function(error, response, body){
        if (error){
            res.sendFile(__dirname + "/failure.html");
        }else if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            
            res.sendFile(__dirname + "/failure.html");
        }
    });
    
}); 

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(req, res){
    console.log("The server is now listening on port 3000");
});


//d72eec55ae48a8f34298a7fbea61fda4-us17

//264f97e7c9