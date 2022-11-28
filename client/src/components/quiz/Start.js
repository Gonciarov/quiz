import React, {useState} from 'react';
import { redirect } from 'react-router';

function Start() {
   function consoleLog(e) {
       console.log('hi')
   }
    return (
        <div>
       <button onClick={consoleLog}>Click</button>
        </div>
    )
}

export default Start;