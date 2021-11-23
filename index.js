const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded()); //middleware
app.use(express.static('assets'));   // to add the css js images files


var contactList = [
    {
        name: "Akash",
        phone: "9362587122"
    },
    {
        name: "Shivangi",
        phone: "7456321455"
    },
    {
        name: "Reshu",
        phone: "7852369812"
    }
]
app.get('/',function(req,res){

    // console.log('from the get route controller',req.myName);
     return res.render('home',{ 
        title: "My Contacts List",
        contact_list: contactList
    });

   
});


app.post('/create-contact', function(req,res){
   contactList.push(req.body);
   return res.redirect('back');
});

// for deleting a contact
app.get('/delete-contact',function(req,res){
    // get the query from the url
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('/');
});


app.listen(port,function(err){
   if(err){
       console.log('Error in running the server',err);
   }
   console.log('Yup!My Express Server is running on port:',port);
});