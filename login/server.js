//importing
const express=require("express");
const path=require("path");
const session=require("express-session");
const bodyparser=require("body-parser");
const {v4:uuidv4}=require('uuid');
const nocache=require('nocache');
const router=require('./router');

//port 
const app=express();
const PORT=process.env.PORT || 3001;

//setting view engine
app.set("view engine","ejs");

//using module bodyparse
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//style
app.use('/static',express.static(path.join(__dirname,'public')))

//images
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(nocache());

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", router);




app.listen(PORT,()=>{
    console.log("Hai")
})