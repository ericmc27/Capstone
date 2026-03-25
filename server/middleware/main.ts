import type { Request, Response, NextFunction } from 'express'
import { auth } from '../lib/auth'

export const isAdmin = async (req: Request, res: Response, next: NextFunction)=>{
  const session = await auth.api.getSession({ headers: req.headers });

  if(session?.user.role !== 'admin'){
    return res.sendStatus(403)
  }

  next()
}

