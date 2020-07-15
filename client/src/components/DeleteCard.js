import React from 'react';
import '../App.css';

export default function DeleteCard({deleted}) {
if(deleted === 0){return null}
else {
return (
    <div className='delete-box'>
        <div>
            <h1>{deleted}</h1>
        </div>
    </div>
  );}
}

