import { useContext, useEffect, useState } from "react";
import "../App.css";
import { socket } from "../Socket";
import Chat from "../Components/Chat";
import { AuthContext } from "../Context/AuthContext";
import chatGif from "../chatGif.gif";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MessageBox = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    if (user && token) {
      setUserLogin(true);
      setUserName(user.name);
    } else {
      setUserLogin(false);
    }
  }, [user, token]);

  const joinRoom = () => {
    if (room !== "" && user.name !== "") {
      socket.emit("join_room", room);

      setShowChat(true);
    }
  };

  const handleLogin = () => {
    navigate("/");
  };
  return (
    <div className="App">
      {!userLogin ? (
        <div>
          <p>please SignIn first</p>
          <Button onClick={handleLogin} variant="outline-primary">
            Click here to SignIn
          </Button>
        </div>
      ) : (
        <div>
          {!showChat ? (
            <div className="joinChatContainer">
              <img
                src={chatGif}
                alt="unable to load gif"
                style={{
                  height: "250px",
                  width: "250px",
                  borderRadius: "25px",
                }}
              ></img>

              {userName && (
                <p>
                  Hi {userName} Please enter your room number and get into your
                  chat right away!!!
                </p>
              )}

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
            <Chat userName={user.name} room={room}></Chat>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBox;
