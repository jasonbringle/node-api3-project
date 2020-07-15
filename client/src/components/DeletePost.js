import React, {useState, useEffect} from 'react';
import DeleteCard from './DeleteCard'
import axios from 'axios';

export default function App() {
  const [ posts, setPosts] = useState([
  ])
  const [ deletedPost, setDeletedPost] = useState();
  
  const deleteHandler = (e) => {
    axios
    .delete(`http://localhost:3000/api/posts/${e.target.id}`)
    .then(res => setDeletedPost(res.data))
    .catch(err => console.log("Error", err.message));
    asyncRefresh()
  }

  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  async function asyncRefresh(){
    const result = await resolveAfter2Seconds()
    const windowRefresh = window.location.reload(true)
    console.log("You deleted it")
    return windowRefresh
  }

useEffect(()=>{
  axios
  .get("http://localhost:3000/api/posts")
  .then(res => setPosts(res.data))
  .catch( err => console.log("Error", err.message, err.response))
},[deletedPost])

return (
    <div>
        <DeleteCard deleted={deletedPost} />
        <div>
            {posts && posts.map(post => 
            (<div  key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.contents}</p>
                <button id={post.id} onClick={deleteHandler}>Delete</button>
            </div> ) 
            )}
        </div>
    </div>
  );
}

