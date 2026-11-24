import express, { type Application, type Request, type Response } from "express"
import { Pool } from "pg";
const app :Application= express()
const port = 3000

const pool=new Pool({
  connectionString:"postgresql://neondb_owner:npg_B7QSetUjKC3u@ep-fragrant-star-aowhu2rj.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=false"
})


app.use(express.json()) //For json
app.use(express.text()) //For text
app.use(express.urlencoded({extended:true}))  //For Form Data


const initDB=async()=>{
     try{
         await pool.query(`
          CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          age INT,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
         )
          
          `)
         console.log('Database connected');
         
     }catch(error){
         console.log(error);
         
     }
}

initDB()



app.get('/', (req:Request, res:Response) => {
    console.log(req);
    
//   res.send('This is root route')
   res.status(200).json({
    success:true,
    message:'This is root route',
    author:'PH'
   })
})

app.post("/api/v1/users",async(req:Request,res:Response)=>{


    try{
      const {name,age,password,email}=req.body

    const result=await pool.query(`INSERT INTO users (name,email,password,age) values ($1,$2,$3,$4) RETURNING *`,[name,email,password,age])
      
    console.log("Result----",result);
    
    res.status(200).json({
    success:true,
    message:'User Created',
    data:result.rows[0]
   })
    }catch(err:any){
      
    res.status(500).json({
    success:false,
    message:err.message,
    error:err
   })
      
    }
   
})

app.get("/api/v1/users",async(req:Request,res:Response)=>{
    try{ 
      const result=await pool.query(`SELECT * FROM users`)
      console.log("Result----",result);
      res.status(200).json({
      success:true,
      message:'User Fetched',
      data:result.rows
     })

    }catch(err:any){
      res.status(500).json({
      success:false,
      message:err?.message,
      error:err
     })
    }


})
app.get("/api/v1/users/:id",async(req:Request,res:Response)=>{
    try{ 
      const {id}=req.params;
      const result=await pool.query(`SELECT * FROM users where id=$1`,[id])
      if(result?.rowCount==0){
       return res.status(200).json({
       success:false,
       message:'No User Fetched',
     })
      }
      res.status(200).json({
      success:true,
      message:'User Fetched',
      data:result.rows[0]
     })

    }catch(err:any){
      res.status(500).json({
      success:false,
      message:err?.message,
      error:err
     })
    }
})


app.put("/api/v1/users/:id",async(req:Request,res:Response)=>{
    try{ 
      const {id}=req.params;
      const {name,age,password,is_active}=req.body;
      
      const result=await pool.query(`Update users set name=COALESCE($1,name),age=COALESCE($2,age),password=COALESCE($3,password),is_active=COALESCE($4,is_active) where id=$5 RETURNING *`,[name ?? null,age??null,password??null,is_active??null,id],)

      if(result?.rowCount==0){
       return res.status(200).json({
       success:false,
       message:'No User Found',
     })
      }
      
      res.status(200).json({
      success:true,
      message:'User Updated',
      data:result.rows[0]
     })

    }catch(err:any){
      res.status(500).json({
      success:false,
      message:err?.message,
      error:err
     })
    }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})