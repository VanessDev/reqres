import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile";
import UserDetail from "./components/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
