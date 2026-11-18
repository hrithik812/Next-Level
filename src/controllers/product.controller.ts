import type { IncomingMessage, ServerResponse } from "http";

const productController=(req:IncomingMessagessage,res:ServerResponseesponse)=>{
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify({message:"This is product route"}));
    

}

export default productController