import { MongoClient } from 'mongodb'


async function newMeeting(req,res){
    if(req.method=='POST'){
        const newMeetData=req.body;
        //saving data to MongoDB database   
        //here we are ignoring error handling using try-catch just to keep it simple 
        
                const client= await MongoClient.connect('mongodb+srv://sdcode001:ZlDtftXH13xexart@cluster0.3yr72o9.mongodb.net/database1?retryWrites=true&w=majority')
                const db=client.db()
                const result=await db.collection('meetups').insertOne(newMeetData)
                console.log(result)
                client.close()
        res.status(201).json({message:'Okk'})
        
    }
   
}

export default newMeeting