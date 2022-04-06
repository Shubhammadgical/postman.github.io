
let express=require("express");
let app = express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
        next();
});
var port = process.env.PORT || 2410;
app.listen(port, ()=> console.log(`Node app listening on port ${port}!`));

let {questions}=require("./data.js");

app.get("/alldata",function(req,res){
    res.send(questions)
    console.log(questions)
})

app.post("/alldata",function(req,res){
    let body=req.body;
    try{
        questions.push(body);
        res.send(body);
        console.log(questions)
    }catch{
        res.status(404).send("Error in posting Data. URL not found or check internet connection");
        console.log("err")
    }
})

let newdata={url:"",method:"",body:""};

app.post("/newdata",function(req,res){
    let body=req.body;
    newdata.url=body.url;
    newdata.method=body.method;
    newdata.body=body.json;
    console.log(newdata)
    console.log("hello")
})