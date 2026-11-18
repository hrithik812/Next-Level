import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { IProduct } from "../types/product";

const productController=(req:IncomingMessage,res:ServerResponse)=>{
    
    //product->GET ,POST,PUT,DELETE
    const url=req.url
    const method=req.method;
    // GET all products
    const urlParmas=url?.split('/');
    const id=urlParmas?.[2]?Number(`${urlParmas[2]}`):null;
    console.log("id",id);
    if(url==='/products' && method==='GET'){
      const products=productService();
     res.writeHead(200,{"Content-Type":"application/json"});
     res.end(JSON.stringify({message:"Products retrieved successfully",data:products}));
    }
    else if(url?.startsWith('/products') && method==='GET' && id!==null){
        const products=productService();
        const product=products.find((product:IProduct)=>product.id===id);
        if(product){
            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify({message:"Product retrieved successfully",data:product}));
        }
        else{
            res.writeHead(404,{"Content-Type":"application/json"});
            res.end(JSON.stringify({message:"Product not found"}));
        }

    }
    else if(url==='/products' && method==='POST'){
        res.writeHead(201,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message:"Product created successfully"}));
    }

}

export default productController