import Head from "next/head";
import MeetupDetail from "../components/meetups/MeetupDetail";
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
process.env.DB_PASS  );
  const db = client.db();
  //access database

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}).toArray();
  //only fetch ids
// console.log(meetups)
  client.close();

  return {
    fallback: 'blocking',
    //if false => means paths contain all supported meetup id values
    //if true => next.js will try to generate a page for this id dynamically on server
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
      // await new Promise(resolve =>setTimeout(resolve, 3000))

  //can't use 'use  router hook' to get id from url because it only works in component function
  const meetupId = context.params.meetupId.toString();
  if(!ObjectId.isValid(meetupId)){
    return {
      notFound:true,
    }
  }
  // console.log(meetupId)
  const client = await MongoClient.connect(
process.env.DB_PASS  );
  const db = client.db();
  //access database

  const meetupsCollection = db.collection("meetups");


  const selectedMeetup = await meetupsCollection.findOne({
    _id:new ObjectId(meetupId),
  });
// console.log(selectedMeetup)
  //finds one single doc

  client.close();
if (!selectedMeetup) {
  return {
    notFound: true,
  }
}
  return {
    props: {
      meetupData: {
        _id: selectedMeetup._id.toString(),
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
