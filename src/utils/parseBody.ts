import type { IncomingMessage } from "http";


//Why body parser is needed?
//In Node.js, when you receive an HTTP request, the request body is typically sent as a stream of data. 
//To access the data in the request body, you need to parse it. The body parser function is responsible for reading the incoming data stream and converting it into a usable format (e.g., JSON) that your application can work with.

export const bodyParser = (req:IncomingMessage):Promise<any>=>{
    let body='';

    return new Promise((resolve,reject)=>{
          req.on('data',(chunk)=>{
            body+=chunk;
          });
          req.on('end',()=>{
            try {
              const jsonData = JSON.parse(body);
              resolve(jsonData);
            } catch (error) {
              reject(error);
            }
          });
    })
}  