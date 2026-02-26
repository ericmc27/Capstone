import type { Request, Response, NextFunction } from 'express'
import { auth } from '../lib/auth'
import { productsCollection } from '../main'

export const checkUserSession = async (req: Request, res: Response)=>{
  const session = await auth.api.getSession({headers: req.headers})

  if(!session){
    res.status(401).json({error: 'Unauthorized'})
  }else{
    const userData = {name: session.user.name}
    res.status(200).json({userData})
  }
}

export const checkUserAuthenication = async (req: Request, res: Response, next: NextFunction)=>{
  const session = await auth.api.getSession({headers: req.headers})

  if(!session){
    res.status(401).json({error: 'Unauthorized'})
  }
  else{
    next()
  }
}

export const getProducts = async (req: Request, res: Response)=>{
  const products = await productsCollection.aggregate([{ $sample: {size: 6}}]).toArray()
  res.status(200).send({products})
}
