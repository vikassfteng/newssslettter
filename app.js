//jshint esversion: 6
const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const client = require("@mailchimp/mailchimp_marketing")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var password = req.body.password;

  console.log(firstName, lastName, email,password);

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  }

  const run = async () => {
    try {
       const response = await client.lists.addListMember("9a7a685ea6", {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
           FNAME: subscribingUser.firstName,
           LNAME: subscribingUser.lastName
         }
       });
       console.log(response);
       res.sendFile(__dirname + "/success.html");
     } catch (err) {
       console.log(err.status);
       res.sendFile(__dirname + "/failure.html");
     }
   };

   run();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

client.setConfig({

  apiKey: "2e16c1f3b55f271356f14dca572d5bbc-us6",

  server: "us6",

});



app.listen(process.env.PORT ||3000, function(){
  console.log("Server is running on port 3000");
});


// const jsonData = JSON.stringify(data);
//
// const url = "https://$API_SERVER.api.mailchimp.com/3.0/lists/63d3a63335"


// apiKey
// 6a14ab0590d21039370e61258b67d578-us6

//list
//63d3a63335

//url of mailchimp
//"https://$API_SERVER.api.mailchimp.com/3.0/lists" \




// const mailchimp = require("@mailchimp/mailchimp_marketing");
// const express = require("express");
// const request = require("request");
// const bodyParser = require("body-parser");
// const https = require("https");
// // const { getMaxListeners } = require("process");

// const app = express();

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));
// app.get("/", function(req, res){
//     res.sendFile(__dirname + "/signup.html");

// });
// mailchimp.setConfig({
//     apiKey: "3c82efe6b30ed748602c8ccc91540302-us6",
//     server: "us6"
// })


// app.post("/", function(req, res){
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;
//     const lsitId = "9a7a685ea6";
//     const subscribingUser = {
//         firstName: firstName,
//         lastName: secondName,
//         email: email
//        };
//        //Uploading the data to the server
//         async function run() {
//        const response = await mailchimp.lists.addListMember(listId, {
//         email_address: subscribingUser.email,
//         status: "subscribed",
//         merge_fields: {
//         FNAME: subscribingUser.firstName,
//         LNAME: subscribingUser.lastName
//        }
//        });
//        //If all goes well logging the contact's id
//         res.sendFile(__dirname + "/success.html")
//         console.log(
//        `Successfully added contact as an audience member. The contact's id is ${
//         response.id
//         }.`
//        );
//        }
       //Running the function and catching the errors (if any)
       // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
       // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
    //     run().catch(e => res.sendFile(__dirname + "/failure.html"));
    //    });
    // const data = {
    //     memebers:[
    //         {
    //             email_address: email,
    //             status: "subscriber",
    //             merge_fields:{
    //                 FNAME: firstName,
    //                 LNAME: lastName 
    //             }
    //         }
    //     ]
    // };
    // const jsonData = JSON.stringify(data);
    // const url = "https://us6.api.mailchimp.com/3.0/lists/9a7a685ea6";
    // const options = {
    //     method: "POSt",
    //     auth: "vikasj:3c82efe6b30ed748602c8ccc91540302-us6"
    // }



//     const mailchimpClient = require("mailchimp_transactional")("3c82efe6b30ed748602c8ccc91540302-us6");

//     const run = async () => {
//       const response = await mailchimpClient.messages.sendTemplate({
//         template_name: "vikas's temp",
//         template_content: [{
//             name: "firstname",
           
//         }],
//         message: {
//             to:{
//                 email:"email@gmail.com",
//                 name: "Test",
//                 type: "to"
//             }
//         },
//       });
//       console.log(response);
//     };
    
//     run();
// });

// app.listen(3000, function(){
//     console.log("server running at port 3000");
// });

// 2e16c1f3b55f271356f14dca572d5bbc-us6
// 9a7a685ea6