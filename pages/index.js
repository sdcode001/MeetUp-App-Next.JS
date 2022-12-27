import MeetupList from '../components/meetups/MeetupList.js'
import Layout from '../components/layout/Layout.js'
import { MongoClient } from 'mongodb'
import Head from 'next/head'

//this is a component function it works on the front end or in browser and also in backend or in server.
function HomePage(props){
return (
     <Layout>
      <Head>
        <title>Next.JS Meetups</title>
        <meta
          name='decsription'
          content='A amazing application build using Next.JS, React and MongoDB to get and create meetups'
        />
      </Head>
     <MeetupList meetups={props.loadedMeets}/>
     </Layout>
    )  
}

export async function getStaticProps(){
   // as this getsatticProps runs only on server so we can directiely fetch data from mongoDB with out using API call
  const client= await MongoClient.connect('mongodb+srv://sdcode001:ZlDtftXH13xexart@cluster0.3yr72o9.mongodb.net/database1?retryWrites=true&w=majority')
        const db=client.db()
        const result= await db.collection('meetups').find().toArray()
        client.close()
        const meetupsArray=result.map(meetup=>({
              id:meetup._id.toString(),
              title:meetup.title,
              address:meetup.address,
              image:meetup.image,
              description:meetup.description
            }
        ))
  
  return {
    props:{
    loadedMeets: meetupsArray
    },
    revalidate: 1
  }
}

// export async function getServerSideProps(context){
//   const req=context.req
//   const res=context.res
//   //fetch data from API
//   return {
//     props:{
//       loadedMeets: meetList
//     }
//   }
// }


export default HomePage
