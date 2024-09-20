const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()


app.use(cors())
const PORT = 5001
app.use(bodyParser.json());

let posts = [
    {id:1 , title:'First Blog'},{id:2,title:'Second Blog'}
];



app.get('/posts',(req,res)=>{
    res.json(posts)
});

app.post('/posts',(req,res)=>{
    const {title,content} = req.body;
    const newpost = {
        id : posts.length+1,
        title,
        content
    };
    posts.push(newpost)
    res.status(201).json(newpost)
})

app.listen(PORT , ()=>{
    console.log(`Server is running at port ${PORT}`);

})