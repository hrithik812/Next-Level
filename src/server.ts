import {createServer} from "http";
import routeHandler from "./routes/route";

const server:Server=createServer((req:IncomingMessage,res:ServerResponse)=>{
    // res.writeHead(200,{"Content-Type":"text/plain"});
    // res.end("Hello World");
    // console.log(req);
      routeHandler(req,res);

})

server.listen(5000,()=>{
    console.log("Server is running on port 5000");
});


//Incoming Message means 

//Server Response consists

// Status Code
// Message
// Headers

// Content Type 
// JSON XML PLAINTEXT


// FIle organization
// 3 main component in file organization
// 1)route ->route handling
// 2)controller-> controller handling & sending response to client
// 3)service ->db operation


