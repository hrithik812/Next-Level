import {createServer} from "http";

const server:Server=createServer((req:IncomingMessage,res:ServerResponse)=>{
    // res.writeHead(200,{"Content-Type":"text/plain"});
    // res.end("Hello World");
    console.log(req);
    const url=req.url; // "/","/products","/about"
    const method=req.method;  //"GET","POST","PUT","DELETE"
    if(url=="/" && method==="GET"){
        res.writeHead(200,{"Content-Type":"text/plain"});
        // res.end("<h1>Welcome to the Home Page</h1>");
    }else{
        // res.writeHead(200,{"Content-Type":"text/html"});
        // res.end("<h1>Welcome to the About Page</h1>");
        console.log("This route is not defined");
    }

})

server.listen(5000,()=>{
    console.log("Server is running on port 5000");
});


//Incoming Message means 

//Server Response consists

// Status Code
// Message
// Headers