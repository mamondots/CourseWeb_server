const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
    }

app.use(cors(corsConfig))
app.options("", cors(corsConfig))

app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i6scrno.mongodb.net/?retryWrites=true&w=majority`;

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

        //await client.connect();

        const usersCollection = client.db('Eduvolt').collection('users')
        const coursesCollection = client.db('Eduvolt').collection('courses')
        const instructorsCollection = client.db('Eduvolt').collection('instructors')
        const productsCollection = client.db('Eduvolt').collection('products')
        const blogsCollection = client.db('Eduvolt').collection('blogs')
        const eventsCollection = client.db('Eduvolt').collection('events')


        //get all users

        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray()
            res.send(result)
        })

        //set role admin in user

    app.patch('/users/admin/:id', async (req, res) => {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }
        const updateDoc = {
          $set: {
            role: 'admin'
          },
        }
        const result = await usersCollection.updateOne(filter, updateDoc)
        res.send(result)
      })

        //post single user

        app.post('/users', async(req,res) =>{
            const user = req.body
            const query = {email: user.email}
            const existingUser = await usersCollection.findOne(query)
            if(existingUser){
              return res.send({message:'User already have'})
            }
            const result = await usersCollection.insertOne(user)
            res.send(result)
          })

          //delete single course

        app.delete('/users/:id', async(req,res) =>{
            const id = req.params.id
            const query = {_id : new ObjectId(id)}
            const result = await usersCollection.deleteOne(query)
            res.send(result)
        })


        //get all courses

        app.get('/courses', async (req, res) => {
            const result = await coursesCollection.find().toArray()
            res.send(result)
        })

        //post single course

        app.post('/courses', async(req,res)=>{
            const course = req.body
            const result = await coursesCollection.insertOne(course)
            res.send(result)
        })

        //details single course

        app.get('/courses/:id', async(req,res) =>{
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await coursesCollection.findOne(query)
            res.send(result)
        })

        //update single course

        app.patch('/courses/:id', async(req,res) =>{
            const id = req.params.id
            const updatedCourses = req.body
            const filter = {_id : new ObjectId(id)}
            const updatedDoc = {
                $set: {
                    ...updatedCourses
                }
            }
            const result = await coursesCollection.updateOne(filter,updatedDoc)
            res.send(result)
        })

        //delete single course

        app.delete('/courses/:id', async(req,res) =>{
            const id = req.params.id
            const query = {_id : new ObjectId(id)}
            const result = await coursesCollection.deleteOne(query)
            res.send(result)
        })

        //get all instructors

        app.get('/instructors', async (req, res) => {
            const result = await instructorsCollection.find().toArray()
            res.send(result)
        })

        //get all products

        app.get('/products', async (req, res) => {
            const result = await productsCollection.find().toArray()
            res.send(result)
        })

        //post single product

        app.post('/products', async(req,res)=>{
            const product = req.body
            const result = await productsCollection.insertOne(product)
            res.send(result)
        })

        //delete single product

        app.delete('/products/:id', async(req,res) =>{
            const id = req.params.id
            const query = {_id : new ObjectId(id)}
            const result = await productsCollection.deleteOne(query)
            res.send(result)
        })

        //get single blogs details

        app.get('/products/:id', async(req,res) =>{
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await productsCollection.findOne(query)
            res.send(result)
        })

        //get all blogs

        app.get('/blogs', async (req, res) => {
            const result = await blogsCollection.find().toArray()
            res.send(result)
        })

        //get single blogs details

        app.get('/blogs/:id', async(req,res) =>{
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await blogsCollection.findOne(query)
            res.send(result)
        })

        //get all events

        app.get('/events', async (req, res) => {
            const result = await eventsCollection.find().toArray()
            res.send(result)
        })

        //get single event details

        app.get('/events/:id', async(req,res) =>{
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await eventsCollection.findOne(query)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('eduvolt is running')
})

app.listen(port, () => {
    console.log(`eduvolt is running on port, ${port}`)
})