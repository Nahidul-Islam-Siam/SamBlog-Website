const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookisParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require ('dotenv').config()
const port = process.env.PORT || 9000


const app = express()


const corsOptions = {
    origin:["http://localhost:5174",
     "http://localhost:5173",
      "https://samblog-176bb.web.app",
       "https://euphonious-mousse-a2e75e.netlify.app"
      ],
    credentials:true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oj7uysy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
    // Connect the client to the server	(optional starting in v4.7)
  const blogsCollection = client.db('samblog').collection('blogs')
  const wishCollection = client.db('samblog').collection('wish')
  const commentsCollection = client.db('samblog').collection('comments')

// jwt generate
app.post('/jwt', async(req,res)=>{
  const user = req.body
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECURE,{
    expiresIn:'365d'
  })
  
 res.cookie('token', token,{
  httpOnly:true,
  secure: process.env.NODE_ENV === 'production',
  sameSite:process.env.NODE_ENV === 'production'?'none': 'strict'
 })
 .send({success:true})
})

//clear token on logout
app.get('/logout',(req,res)=>{
  res
  .clearCookie('token',{
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:process.env.NODE_ENV === 'production'?
    'none': 'strict',
    maxAge:0,
   })
   .send({success:true})
})






  // get recent post data from db
  app.post('/allblog',async(req,res)=>{
    const blogData = req.body
   
    const result= await blogsCollection.insertOne(blogData) 
    res.send(result)
  })


  app.post('/wishlist',async(req,res)=>{
    const blogData = req.body
   
    const result= await wishCollection.insertOne(blogData) 
    res.send(result)
  })


  // get all comment from db
  app.post('/comment',async(req,res)=>{
    const commentData=req.body
   const result=await commentsCollection.insertOne(commentData) 
    res.send(result)
  })

//   get all blog from db
app.get('/blogs', async(req,res)=>{
    const result = await blogsCollection.find().toArray()
    res.send(result)
   
})





app.get('/wishlists/:email',async (req,res)=>{
  const email = req.params.email
  const query = {'author.email':email}
  const result =await wishCollection.find(query).toArray()
  res.send(result)
})


// get comments
app.get('/comments/:id', async (req, res) => {
  const id = req.params.id; 
  const query = { blogid: id }; 
  try {
    const result = await commentsCollection.find(query).toArray(); 
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});



app.get('/blog/:id',async (req,res)=>{
  const id = req.params.id
  const query = {_id:new ObjectId(id)}
  const result =await blogsCollection.findOne(query)
  res.send(result)
})


app.delete('/wishlist/:id', async(req,res)=>{
  const id = req.params.id
  const query = {_id:new ObjectId(id)}
  const result = await wishCollection.deleteOne(query)
  res.send(result)
})

// update blog


app.put(`/blog/:id`, async (req,res)=>{
  const id = req.params.id
const blogData=req.body
const query ={_id: new ObjectId(id)}
const options = { upsert: true}
const updateDoc = {
  $set: {
    ...blogData,
  },

}

const result  = await blogsCollection.updateOne(query, updateDoc, options)
res.send(result)


})



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
 
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('Hey there . Welcone to SAM BlOG Server...')
})
app.listen(port, ()=> console.log(`Server running on port ${port}`))
