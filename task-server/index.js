require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://taskManagement:5WyuJ0tB4izv5ChF@cluster0.03occsr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // database collection 
    const taskCollection = client.db("taskDB").collection("tasks");

    // insert all task
    app.post("/createTask", async(req,res)=>{
        const tasks = req.body;
        // console.log(tasks)
        const result = taskCollection.insertOne(tasks);
        res.send(result);
    })

    //get task
    
    app.get("/getTask", async(req,res)=>{
        const email = req?.query?.email;
        // console.log(email)
        const query = {email: email}
      const result = await taskCollection.find(query).toArray();
      res.send(result);
    })

    // todo delete
    app.delete("/todoDelete/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = taskCollection.deleteOne(query);
      res.send(result);
    })
    // add to progress 

    app.patch("/addToProgress/:id", async(req,res)=> {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updateOne = {
        $set: {
          status: "progress"
        }
      };
      const result = taskCollection.updateOne(filter,updateOne);
      res.send(result);
    })

    // task completed
    app.patch("/taskCompleted/:id", async(req,res)=> {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updateOne = {
        $set: {
          status: "completed"
        }
      };
      const result = taskCollection.updateOne(filter,updateOne);
      res.send(result);
    })

    // edit 

    app.get("/taskGet/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await taskCollection.find(query).toArray();
      res.send(result)
    })

    // update task

    app.put("/updateTask/:id", async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const taskItem = req.body;
      const updateOne = {
        $set: {
          title: taskItem.title,
          deadline: taskItem.deadline,
          description: taskItem.description,
          priority: taskItem.priority
        }
      }
      
      const result = taskCollection.updateOne(filter,updateOne);
      res.send(result);

    })


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);
















app.get("/", (req, res) => {
    res.send("Hello server is running!");
  });
  
  // start server
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
  });