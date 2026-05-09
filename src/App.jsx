import { BrowserRouter, Route, Routes } from "react-router"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Home from "./components/Home"
import Connection from "./components/Connection"
import Request from "./components/Request"
import Premium from "./components/Premium"
import Chat from "./components/Chat"
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connection />} />
            <Route path="premium" element={<Premium />} />
             <Route path="requests" element={<Request />} />
             <Route path="chat/:targetId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
