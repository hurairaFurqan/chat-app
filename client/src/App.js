import "./App.css";
import Layout from "./Pages/Layout";
import "./App.css"

import { Routes, Route } from "react-router-dom";
import MessageBox from "./Pages/MessageBox";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/chat" element={<MessageBox></MessageBox>}></Route>
      </Routes>
    </>
  );
}

export default App;
