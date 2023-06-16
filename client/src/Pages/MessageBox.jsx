import { useState } from "react";
import "../App.css";
import { socket } from "../Socket";
import Chat from "../Components/Chat";

const MessageBox = () => {
  const [room, setRoom] = useState("");
  const [userName, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (room !== "" && userName !== "") {
      socket.emit("join_room", room);

      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <input
            placeholder="John..."
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            placeholder="Room ID"
            type="text"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          ></input>

          <button onClick={joinRoom}>Join A room</button>
        </div>
      ) : (
        <Chat userName={userName} room={room}></Chat>
      )}
    </div>
  );
};

export default MessageBox;
