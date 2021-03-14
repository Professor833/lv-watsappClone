import React, { useEffect, useState } from "react";
import "./css/chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoveVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./Fbase";
import { useStateValue } from "./StateProvider";
// import firestore from 'firebase/firestore'
import firebase from "firebase";

function Chat({ defaultPage }) {
  const [noRoomSelected, setNoRoomSelected] = useState(true);

  // States
  const [input_msg, setinput_msg] = useState("");
  const [seed, setSeed] = useState("");
  const [messages, setmessages] = useState([]);

  const { roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();

  const [roomName, setroomName] = useState("");

  useEffect(() => {
    if (!defaultPage) {
      setNoRoomSelected(false);
    }

    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setroomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId, defaultPage]);

  useEffect(() => {
    // change seed value once when page loads and another when roomId changes
    Math.floor(setSeed(Math.random() * 5000));
  }, [roomId]);
  const random_url = `https://avatars.dicebear.com/api/bottts/${seed}.svg?r=50&b=%23e8e3e3`;

  const sendMessage = (e) => {
    // this func will be fired off when user hits enter we have input value
    e.preventDefault();

    console.log("Message Sent! >>> ", input_msg);

    db.collection("rooms").doc(roomId).collection("messages").add({
      id: roomId,
      message: input_msg,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setinput_msg("");
  };

  // messages.map((msg, index) => {console.log("msg Id ==>>>> ", messages, index)})
  return (
    <div className="chat">
      <div className="chat__header">
        {/* Info about chat */}
        <Avatar src={random_url} />
        <div className="chatHeader__info">
          <h3>{noRoomSelected ? user.displayName : roomName}</h3>
          <p>
            {noRoomSelected
              ? "selcect any chat "
              : "last seen " +
                new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton color="inherit">
            <SearchOutlined />
          </IconButton>
          <IconButton color="inherit">
            <AttachFileIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoveVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, idx) => (
          <p
            className={
              // this logic is only good for testing purposes coz two people can have same google username
              `chat__message ${
                message.name === user.displayName && "chat__receiver"
              }`
            }
            key={idx}
          >
            <span className="user__name"> {message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input_msg}
            onChange={(event) => setinput_msg(event.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button disabled={!input_msg} onClick={sendMessage} type="submit">
            {" "}
            Send Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
