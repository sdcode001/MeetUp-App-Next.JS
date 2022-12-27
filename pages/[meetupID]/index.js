import Layout from '../../components/layout/Layout.js'
import MeetupDetail from '../../components/meetups/MeetupDetail.js'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'


//this is a component function it works on the front end or in browser and also in backend or in server.
function Detailpage(props){
   return (
    <Layout>
      <Head>
        <title>{props.loadedMeetup.title}</title>
        <meta
          name='decsription'
          content={props.loadedMeetup.description}
        />
      </Head>
    <MeetupDetail 
            image={props.loadedMeetup.image}
            title={props.loadedMeetup.title}
            address={props.loadedMeetup.address}
            description={props.loadedMeetup.description}
          />
    </Layout>
   )
}

export async function getStaticPaths(){
   const clint=await MongoClient.connect('mongodb+srv://sdcode001:ZlDtftXH13xexart@cluster0.3yr72o9.mongodb.net/database1?retryWrites=true&w=majority')
   const db=clint.db()
   const result=await db.collection('meetups').find({},{_id:1}).toArray()           
   clint.close()
   return {
      fallback: 'blocking',
      paths: result.map(meetupId=>({
         params:{
            meetupID:meetupId._id.toString()
         }
      }))      
   }
}

export async function getStaticProps(context){   // next/router hook can only be used in this Detailpage component function to get access to url parameters.
   const meetupID=context.params.meetupID

   //connceting to the MongoDB database and fetching data.
   const clint=await MongoClient.connect('mongodb+srv://sdcode001:ZlDtftXH13xexart@cluster0.3yr72o9.mongodb.net/database1?retryWrites=true&w=majority')
   const db=clint.db()
   const result=await db.collection('meetups').findOne({ _id: ObjectId(meetupID)})
   clint.close()
   
   return {
      props:{
         loadedMeetup: {
            id:result._id.toString(),
            image:result.image,
            title:result.title,
            address:result.address,
            description:result.description
         }
      }
   }
}

export default Detailpage