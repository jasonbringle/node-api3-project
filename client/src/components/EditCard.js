import React, { useState } from 'react';
import axios from 'axios';

import '../App.css';

export default function EditCard({postToEdit}) {

    const [ edit, setEdit] = useState(postToEdit[0])

    const changeHandler = e => {
        setEdit({
            ...edit,
          [e.target.name]: e.target.value
        })
      }

    const editSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:3000/api/posts/${e.target.id}`, edit)
        .then(res => res)
        .catch(err => console.log("Error", err.message));
        window.location.reload(true)
    }

    console.log("Post to edit on Edit Card", edit)


return (
    <div className='delete-box'>
        <div>
            <h1>{postToEdit[0].title}</h1>
            <h2>{postToEdit[0].contents}</h2>
        <form >
          <input type='text' name='title' placeholder={postToEdit[0].title} value={edit.title}onChange={changeHandler}/>
          <input type='text' name='contents' placeholder={postToEdit[0].contents} value={edit.contents} onChange={changeHandler}/>
          <button id={postToEdit[0].id} onClick={editSubmit}>Submit</button>
        </form>
        </div>
    </div>
  );
}

