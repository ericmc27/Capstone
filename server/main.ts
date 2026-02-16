import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'

const app = express()
const PORT = process.env.PORT || 1234

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true
}))

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get('/api/profile', async (req, res)=>{
  const session = await auth.api.getSession({headers: req.headers})
  
  if(!session){
    res.status(401).json({error: 'Unauthorized'})
  }else{
    res.status(200).json({data: session})
  }
})

app.listen(PORT, ()=>{
  console.log(`Server listening at http://localhost:${PORT}`)
})