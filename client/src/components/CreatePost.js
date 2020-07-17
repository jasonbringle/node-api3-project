import React, {useState, useEffect} from 'react';
import Posts from './Posts';
import axios from 'axios';

function App() {
  const [ info, setInfo] = useState({
    name:'',
  })
  
  const [ users, setUsers] = useState();
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
    .post("http://localhost:5000/api/users", info)
    .then(res => asyncRefresh())
    .catch(err => console.log("Error", err.message));
  }

  const getPosts = e => {
    axios
    .get(`http://localhost:5000/api/users/${e.target.id}/posts`)
    .then(res => setPosts(res.data))
    .catch( err => console.log("Error", err.message, err.response));
  }

  useEffect(()=>{
    axios
    .get("http://localhost:5000/api/users")
    .then(res => setUsers(res.data))
    .catch( err => console.log("Error", err.message, err.response));
  },[])

  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 100);
    });
  }

  async function asyncRefresh(){
    // eslint-disable-next-line
    const result = await resolveAfter2Seconds()
    const windowRefresh = window.location.reload(true)
    console.log("You deleted it")
    return windowRefresh
  }


  return (
    <div>
        <div className="App" onSubmit={submitHandler}>
          <form >
            <input type='text' name='name' placeholder="Name" value={info.name} onChange={changeHandler}/>
            <button>submit</button>       
          </form>
        </div>

        <div>
          {users && users.map(user => (
              <div key={user.id}>
                  <h1>{user.name}</h1>
                  <button id={user.id} onClick={getPosts}>Get Posts</button>
                  
                  <Posts posts={posts}/>
              </div> 
          ))}
          
        </div>

      </div>
    );
}

export default App;
