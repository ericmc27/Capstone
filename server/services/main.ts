import { prisma } from '../lib/prisma'

export const getProducts = async () => {
  return prisma.orders.findMany()
}