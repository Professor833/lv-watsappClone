import React, {useState, useEffect} from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoveVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import db from './Fbase'
import { useStateValue } from './StateProvider';


function Sidebar() {
    const [Rooms, setRooms] = useState([])
    const [{user}, dispatch] = useStateValue();
                
    useEffect(() => {
        // run only once when the sidebar component loads (bcoz we have set empty deps arr)
        db.collection('rooms').onSnapshot(snap => {
            setRooms(snap.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
            )
        })

    }, [])

    return (
        <div className="sidebar">        
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>        
                <div className="sidebar__headerRight">
                    <IconButton color="inherit">
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <ChatIcon/>
                    </IconButton>
                    <IconButton color="inherit">
                        <MoveVertIcon/>
                    </IconButton>                
                </div>

            </div>

            <div className="sidebar__search">
                <div className="Sidebar__searchContaier">
                    <SearchOutlined/>
                    <input placeholder="Search or start new Chat" type="text"/>
                </div>            
            </div>
            
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                <div className="all__chats">
                    {Rooms.map(room => (
                        // Return a sidebar chat component made from each room name
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                    ))}                                           
                </div>
            </div>            
        </div>
    )
}

export default Sidebar
