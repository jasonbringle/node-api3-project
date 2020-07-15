import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function DisplayUsers() {
 
const [ posts, setPosts] = useState();
  

useEffect(()=>{
  axios
  .get("http://localhost:3000/api/posts")
  .then(res => setPosts(res.data))
  .catch( err => console.log("Error", err.message, err.response));
},[])

return (
    <div>
      <div>
        {posts && posts.map(info => 
        (<div  key={info.id}>
            <h1>{info.title}</h1>
            <p>{info.contents}</p>
        </div> ) 
        )}
      </div>
    </div>
  );
}

