import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const [posts,setPosts] = useState([])
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')

  useEffect(()=>{
    fetchPosts()
  },[])

  const fetchPosts = async()=>{
    const response = await axios.get('http://localhost:5001/posts');
    setPosts(response.data)
  }

  const addPost = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:5001/posts',{title,content})
      setPosts([...posts,response.data])
      setTitle('')
      setContent('')
    }
    catch(error){
        console.log('error',error)
    }

  }
  return (
    <>
      <div>
        <h1>Blog Post</h1>
        <form onSubmit={addPost}>
          <input type='text' placeholder='Ttile' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
          <textarea placeholder='content' value={content} onChange={(e)=>{setContent(e.target.value)}} required/>
            <button type='submit'>Post</button>
        </form>
        <ul>
          {posts.map((posts)=>(
            <li key={posts.id}>
              <h2>{posts.title}</h2>
              <p>{posts.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
