import NewMeetupForm from '../../components/meetups/NewMeetupForm.js'
import Layout from '../../components/layout/Layout.js'
import { useRouter } from 'next/router'
import Head from 'next/head'


//this is a component function it works on the front end or in browser and also in backend or in server.
function NewMeetupPage(){
    const router=useRouter()
    async function addMeetupHandler(newMeetupData){
        const responce = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(newMeetupData),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const resData=await responce.json()
        console.log(resData)
        
        router.push('/')
    }

    return <Layout>
        <Head>
        <title>Create Meetups</title>
        <meta
          name='decsription'
          content='Create your own meetups and show them worldwide'
        />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Layout>
}

export default NewMeetupPage