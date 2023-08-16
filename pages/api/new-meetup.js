// /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
    
    const client = await MongoClient.connect('mongodb+srv://user0:JgWgUdhNKxkCX1GR@cluster0.fqgnv9z.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    //access database

    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne({data})
    //inserts one new document to collection
        client.close()

        res.status(201).json({message: 'meetup inserted'})

    }
}
export default handler