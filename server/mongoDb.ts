import { MongoClient, ServerApiVersion } from 'mongodb'

export async function createMongoClient(){
  const client = new MongoClient(process.env.MONGO_URI!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  const db = client.db('productDb')
  const productsCollection = db.collection('products')

  return productsCollection
}