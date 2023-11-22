const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://todolist:VxaX5TZa0e9fADx0@cluster0.df9nipl.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

 async function run(){
     
   try{

    const todoCollection = client.db('Todo-list').collection('text-data')

    app.post('/postData', async(req, res) => {
      const data = req.body;
      const result = await todoCollection.insertOne(data)
      res.send(result)
    })

    app.get("/dataGet", async (req, res) => {

      const query = {}
      const result = await todoCollection.find(query).toArray()
      res.send(result)

    })

    app.delete("/data/:id", async (req, res) => {

       const id = req.params.id
       const query = {_id: new ObjectId(id)}
       const result = await todoCollection.deleteOne(query)
       res.send(result)

    })
     
   }
   finally{

   }

 }
 run().catch(err => console.log(err))

app.get('/', (req, res) =>{
  res.send("Todo list server running")
})



app.listen(port, () => {
  console.log(`Todo list server port ${port}`)
})