import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [ info, setInfo] = useState({
    title:'',
    contents:'',
    created_at:'',
    updated_at:''
  })

  const [ posts, setPosts] = useState();
  
  const changeHandler = e => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }
  
  const submitHandler = e => {
    e.preventDefault();
    axios
    .post("http://localhost:3000/api/posts", info)
    .then(res => console.log(res))
    .catch(err => console.log("Error", err.message));
    window.location.reload(true)
  }

useEffect(()=>{
  axios
  .get("http://localhost:3000/api/posts")
  .then(res => setPosts(res.data))
  .catch( err => console.log("Error", err.message, err.response));
},[])

return (
  <div>
      <div className="App" onSubmit={submitHandler}>
        <form >
          <input type='text' name='title' placeholder="Title" value={info.title}onChange={changeHandler}/>
          <input type='text' name='contents' placeholder="contents" value={info.contents} onChange={changeHandler}/>
          <button>submit</button>
        </form>
      </div>

      <div>
        {posts && posts.map(post => 
        (<div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.contents}</p>
        </div> ) 
        )}
      </div>
    </div>
  );
}

export default App;
