import React, {useEffect, useState} from 'react'
import './sidebarchat.css'
import {Avatar} from '@material-ui/core'
import db from './Fbase'
import { Link } from 'react-router-dom'

function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState('')
    const [messages, setmessages] = useState([])
    // console.log("Name from Sidebarchat.js >>> ",name)

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snap => (
                setmessages(snap.docs.map(doc => (doc.data())))
            ))
        }
        
    }, [id])

    useEffect(() => {
        Math.floor(
            setSeed((Math.random() * 5000))
        )
    }, [])
    const random_url = `https://avatars.dicebear.com/api/bottts/${seed}.svg?r=50&b=%23e8e3e3`

    const createChat = () => {
        const roomName = prompt("Enter the room name for Chat")

        if (roomName) {
            // add new room to the DataBase
            db.collection('rooms').add({
                name: roomName
            })           
        }
    }
    return !addNewChat ? (

        <Link to={`/rooms/${id}`}>
            <div className="SidebarChat">
                <Avatar src={random_url}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{
                        // since we sorted messages in desc fashion first msg will be most recent one
                        messages[0]?.message
                    }</p>
                </div>
            </div>        
        </Link>
        
    ): (
        <div onClick={createChat} className="SidebarChat">
        <h2>Add New Chat</h2>
        </div>
    );

}

export default SidebarChat
