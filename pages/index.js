import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
import Head from 'next/head';
const HomePage = (props) => {
    return (
        <>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="Browse a huge list of highly active react meetups!"/>
        </Head>
        <MeetupList meetups={props.meetups}/>
    </>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     //unique to this function => for authentication


//     //fetch data
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }
//always runs on server after deployment,, not run during build process

//static generation => pre renders as soon as built for production

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://user0:JgWgUdhNKxkCX1GR@cluster0.fqgnv9z.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    //access database

    const meetupsCollection = db.collection('meetups')
   

    const meetups = await meetupsCollection.find().toArray()
    //finds all documents in collection

    client.close()



    //all code here will never render or execute on the client-side
    //fetch data from api
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.data.title,
                address: meetup.data.address,
                image: meetup.data.image,
                id: meetup._id.toString()
            }))
        },
        //set up as props for page content
        revalidate: 34000
        //no of seconds next.js will wait until it regenerates this page for an upcoming request
    }

}
//fixed name in page folder
//function is called before component
//prepare props for page
export default HomePage;
