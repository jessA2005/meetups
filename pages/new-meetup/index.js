import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Head from 'next/head'

const NewMeetupPage = () => {
    const router = useRouter()
    async function addMeetupHandler(enteredMeetupData) {
        //could be done with axius
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
        router.push('/')
    }
    return (
        <>
        <Head>
            <title>Add new Meetup</title>
            <meta name="description" content="add meetups"/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>);
}

export default NewMeetupPage;