// /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        
    try
    {
        const client = await MongoClient.connect(process.env.DB_PASS)
    const db = client.db()
    

    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne(data)
    // console.log(result);

    //inserts one new document to collection
        client.close()

        res.status(201).json({message: 'meetup inserted'})
} catch {console.log('error occured in new-meetup')}
    }
}
export default handler