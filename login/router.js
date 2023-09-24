var express=require('express');
const session = require('express-session');
var router=express.Router();

const credential={
    name:"Abhinav",
    email:"abhinav@gmail.com",
    password:"abhi123",
};
const pro=[
    {
        name:"Taj mahal",
        imgurl:"/assets/taj.jpg"
    },
    {
        name:"Mumbai",
        imgurl:"/assets/mumbai.jpg"
    },
    {
        name:"Mysore",
        imgurl:"/assets/mysore.jpg"
    },
    {
        name:"Rajasthan",
        imgurl:"/assets/raj.png"
    },
    {
        name:"Delhi",
        imgurl:"/assets/delhi.jpg"
    },
    {
        name:"Uttakhand",
        imgurl:"/assets/uttarakhand.jpeg"
    },
];
router.get('/',(req,res)=>{
    if(req.session.loged){
        return redirect("home");
    }
    else{
        res.render('login',{title:"login",errmsg:null});
    }

})
router.get('/home',(req,res)=>{
    if(req.session.user){
        return res.render('index',{
            title:'Home',
            name:credential.name,
            pro:pro,
    })
   }
   else{
    return res.redirect('/');
   }
});

//login 

router.post('/login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user=credential.email;
        req.session.loged=true,
        res.redirect('/home');
    }
    else{
        if(req.body.email !=credential.email){
            res.render('login',{ title: "login", errmsg: "Invalid user" });
        }
        else if(req.body.password !=credential.password){
            res.render('login',{title:"login",errmsg:"Wrong password"});
        }
        else{
            res.render('login',{title:"login",errmsg:"You are not registered"});
        }
    }
})

router.get("/signout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.redirect("/");
      }
    });
  });

module.exports=router;