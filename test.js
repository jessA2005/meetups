const { MongoClient } = require("mongodb");

async function test() {
  try {
    const client = await MongoClient.connect(
      process.env.DB_PASS
    );

    // 👇 explicitly use the DB name
    const db = client.db("meetups");

    const meetups = await db.collection("meetups").find().toArray();
    console.log("Meetups:", meetups);

    client.close();
  } catch (err) {
    console.error("DB ERROR:", err);
  }
}

test();
