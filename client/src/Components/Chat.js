import React, { useEffect, useState } from "react";
import { socket } from "../Socket";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import { API_BASEURL_CHAT } from "../constants";

function Chat({ userName, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("received_msg", (data) => {
      setMessageList((list) => [...list, data]);
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

      await axios
        .post(`${API_BASEURL_CHAT}/msg`, message_data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setMessageList((list) => [...list, message_data]);
      setMessage("");
    }
  };
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((message) => {
            return (
              <div
                className="message"
                id={userName === message.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{message.content}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{message.date}</p>
                    <p id="author">{message.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Type your Message..."
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button
          onClick={sendMessage}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default Chat;
