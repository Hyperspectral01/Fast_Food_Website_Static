const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port=process.env.PORT || 5000;

const app = express();   //this is basically the api on this server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static('public'));

mongoose.connect(<connection_link>);
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/login", async (req, res) => {                                                                
    var user = req.body.user;
    var password = req.body.password;                                                                     

    var data = {
        "user": user,
        "password": password
    };

    const userCount = await db.collection('user').countDocuments(data);

    if (userCount > 0) {
        return res.redirect('/burger.html'); // Corrected path                                  
    }
    else {
        return res.redirect('/index.html');
    }
});

app.post("/sign_up", async (req, res) => {                                                                 
    var first = req.body.first;
    var last = req.body.last;
    var gender = req.body.gender;
    var email = req.body.email;
    var user = req.body.user;
    var password = req.body.password;                                                                       

    var data = {
        "first": first,
        "last": last,
        "gender": gender,
        "email": email,
        "user": user,
        "password": password
    };

    var data2= {
        "user":user
    }

    const userCount = await db.collection('user').countDocuments(data2);

    if (userCount>0){
        return res.redirect('/signup.html');
    }
    else{
        db.collection('user').insertOne(data, (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('Error inserting user');
            }
            console.log('User inserted successfully:', result.insertedId);
            return res.redirect('/burger.html'); // Redirect to index page after successful signup
        });
    }
});

app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*" // Corrected header
    });
    return res.redirect('/index.html'); // send file or redirect?                                               
});

app.get("/s", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*" // Corrected header
    });
    return res.redirect('/signup.html'); // send file or redirect?                                                
});


//This is for listening on port

app.listen(port, () => {                                                                                    
    console.log("Server has started listening to the port [Basically Running]");
    console.log(`PORT URL is http://localhost:${port}`);
});


//sign_up
//login to signup
