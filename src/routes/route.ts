import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";

const routeHandler=(req:IncomingMessage,res:ServerResponse)=>{
    const url=req.url; // "/","/products","/about"
    const method=req.method;  //"GET","POST","PUT","DELETE"
    if(url=="/" && method==="GET"){
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message:"This is root route"}));
    }
    else if(url?.startsWith("/products")){
        productController(req,res)
    }
    else{
        // res.writeHead(200,{"Content-Type":"text/html"});
        // res.end("<h1>Welcome to the About Page</h1>");
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.end(JSON.stringify({message:"This route is not found"}));

        // console.log("This route is not found");
    }
}

export default routeHandler