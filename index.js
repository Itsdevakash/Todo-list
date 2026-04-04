import express from 'express'
import { MongoClient } from 'mongodb';
import path from "path"



const app = express();
const publicPath = path.resolve('public')
app.use(express.static(publicPath))
app.use(express.urlencoded({extended:false}))

app.set("view engine",'ejs')

const dbName="node_todo_db"
const colledctionName = "todo_lists"
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const connection = async ()=>{
    const connect = await client.connect();
    return await connect.db(dbName)
}

app.get('/',(req,res)=>{
    res.render("list")
})

app.get('/add',(req,res)=>{
    res.render("add")
})

app.get('/update',(req,res)=>{
    res.render("update")
})

app.post('/create-todo',async (req,res)=>{
    const db = await connection ();
    const collection = db.collection(colledctionName);
    const result = collection.insertOne(req.body)
    if(result)
    {
    res.redirect("/")
    }else{
    res.redirect("/add")
    }
})

app.post('/edit',async (req,res)=>{
  
    res.redirect("/")
})

app.listen(4500)