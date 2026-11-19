import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from '../service/product.service';
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { privateDecrypt } from "crypto";

const productController=async (req:IncomingMessage,res:ServerResponse)=>{
    
    //product->GET ,POST,PUT,DELETE
    const url=req.url
    const method=req.method;
    // GET all products
    const urlParmas=url?.split('/');
    const id=urlParmas?.[2]?Number(`${urlParmas[2]}`):null;
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
        
        const body=await bodyParser(req);
        const newProduct={
            id:Date.now(),
            ...body
        }
        const products=productService();
         products.push(newProduct)        
        createProduct(products);
        res.writeHead(201,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message:"Product created successfully",data:newProduct}));
    }
    else if(method==='PUT' && id!==null){
          const body=await bodyParser(req);
        const products=productService();
        const index=products.findIndex((p:IProduct)=>p.id===id)
        console.log(index);
        if(index<0){
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message:"Product not found"}));
        }

        products[index]={
            id:products[index].id,
            ...body
        }
        createProduct(products);
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message:"Product updated successfully",data:products[index]}));
    }

}

export default productController