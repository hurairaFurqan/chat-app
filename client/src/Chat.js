import React, { useEffect, useState } from "react";
import { socket } from "./Socket";

function Chat({ userName, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket.on("received_msg", (data) => {
      setMessageList((list) => [...list, data.content]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (message !== "") {
      const message_data = {
        room,
        content: message,
        author: userName,
        date:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_msg", message_data);
      setMessage("");
    }
  };
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Type your Message..."
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button onClick={sendMessage}>&#8594;</button>
      </div>
    </div>
  );
}

export default Chat;
