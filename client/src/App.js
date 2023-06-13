import "./App.css";

import { useState } from "react";
import Chat from "./Chat";
import { socket } from "./Socket";
function App() {
  const [room, setRoom] = useState("");
  const [userName, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (room !== "" && userName !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <div className="App">
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

      <Chat userName={userName} room={room}></Chat>
    </div>
  );
}

export default App;
