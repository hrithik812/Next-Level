import express, { type Application, type Request, type Response } from "express"
const app :Application= express()
const port = 3000

app.get('/', (req:Request, res:Response) => {
    console.log(req);
    
//   res.send('This is root route')
   res.status(200).json({
    success:true,
    message:'This is root route',
    author:'PH'
   })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})