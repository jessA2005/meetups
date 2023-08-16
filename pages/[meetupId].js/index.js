import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  return (
    <>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta name ="description" content={props.meetupData.description}/>
    </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://user0:JgWgUdhNKxkCX1GR@cluster0.fqgnv9z.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  //access database

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  //only fetch ids

  client.close();

  return {
    fallback: false,
    //if false => means paths contain all supported meetup id values
    //if true => next.js will try to generate a page for this id dynamically on server
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
console.log(meetupId);

export async function getStaticProps(context) {
  //can't use 'use  router hook' to get id from url because it only works in component function
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://user0:JgWgUdhNKxkCX1GR@cluster0.fqgnv9z.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  //access database

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  //finds one single doc

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup.id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      },
    },
  };
}

//using getStaticProps && dynamic page => getStaticPaths

export default MeetupDetails;
