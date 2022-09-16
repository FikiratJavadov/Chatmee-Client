import "./App.css";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./routes/RequireAuth";
import RequireLogout from "./routes/RequireLogout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

import Preview from "./pages/Preview";
import ChatWindow from "./pages/ChatWindow";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireLogout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/chat" element={<Chat />}>
            <Route index element={<Preview />} />
            <Route path=":id" element={<ChatWindow />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
