import fs from "fs";
import path from "path";


const filePath=path.join(process.cwd(),'./src/database/db.json');
export const productService=()=>{
//    console.log(filePath);
//We have specified utf-8 for reading the file as a string. If we don't specify the encoding, it will return a buffer instead of a string.
const result=fs.readFileSync(filePath,'utf-8');
return JSON.parse(result);
}