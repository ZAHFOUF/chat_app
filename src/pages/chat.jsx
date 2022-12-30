import React  from 'react';
import metaData from '../metadata.json'
import { io } from 'socket.io-client';


function Chat () {
    var socket = io(metaData['socket.io'])
    socket.emit("imhere")

    return (
        <h1>Hello</h1>
    )
}


export default Chat