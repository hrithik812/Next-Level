import {createServer} from "http";

const server=createServer((req,res)=>{
    // res.writeHead(200,{"Content-Type":"text/plain"});
    // res.end("Hello World");
    console.log(req);
});

server.listen(5000,()=>{
    console.log("Server is running on port 5000");
});